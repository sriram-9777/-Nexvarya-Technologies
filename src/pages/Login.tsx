import React, { useState } from 'react';
import { verifyPassword, hashPassword } from '../utils/passwords';
import { useApp } from '../context/useApp';
import { Logo } from '../components/Logo';
import { Lock, Mail, ArrowRight, Loader2, User as UserIcon, Store, Shield } from 'lucide-react';

import { UserRole } from '../types';

const ADMIN_EMAIL = 'sriram.pinnamaneni9@gmail.com';

export const Login: React.FC = () => {
  const { themeMode, t, users, setCurrentUser, setCurrentRole, setActivePage, addUser, updateUser } = useApp();
  const [loginRole, setLoginRole] = useState<UserRole>('customer');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrMobile.trim()) {
      setErrorMsg('Please enter your Email or Mobile Number');
      return;
    }

    const matchedUser = users.find(
      u => u.email.toLowerCase() === emailOrMobile.trim().toLowerCase() || u.mobile === emailOrMobile.trim()
    );

    if (matchedUser) {
      if (matchedUser.status === 'blocked' || !(await verifyPassword(password, matchedUser.password))) {
        setErrorMsg(t('invalidCredentials')); return;
      }
      const targetRole = matchedUser.role;
      const userToLogin = { ...matchedUser, password: matchedUser.password?.startsWith('pbkdf2:') ? matchedUser.password : await hashPassword(password) };
      updateUser(matchedUser.id, { password: userToLogin.password });
      setCurrentUser(userToLogin);
      if (targetRole === 'admin') setActivePage('admin-dashboard');
      else if (targetRole === 'shop_owner') setActivePage('shop-dashboard');
      else setActivePage('customer-dashboard');
    } else {
      setErrorMsg('Account not found. Please check your credentials or sign up.');
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setErrorMsg('');
    try {
      const { loginWithGoogleFirebase } = await import('../firebase');
      const res = await loginWithGoogleFirebase();
      const googleUser = res.user;

      const email = googleUser.email || '';
      const name = googleUser.displayName || 'Google User';
      const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL;

      if (loginRole === 'admin' && (!isAdminEmail || !googleUser.emailVerified)) {
        setErrorMsg('Use the verified admin Google email to continue. Admin accounts cannot be created from signup.');
        return;
      }

      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        if (existingUser.status === 'blocked') { setErrorMsg(t('accountBlocked')); return; }
        const isVerifiedAdmin = email.toLowerCase() === ADMIN_EMAIL && googleUser.emailVerified;
        if (email.toLowerCase() === ADMIN_EMAIL && !googleUser.emailVerified) {
          setErrorMsg('Admin access requires a verified email address. Verify your email in Google, then sign in again.');
          return;
        }
        const targetRole = isVerifiedAdmin ? 'admin' : existingUser.role;
        const userToLogin = isVerifiedAdmin ? { ...existingUser, role: 'admin' as const } : existingUser;
        setCurrentUser(userToLogin);
        if (targetRole === 'admin') setActivePage('admin-dashboard');
        else if (targetRole === 'shop_owner') setActivePage('shop-dashboard');
        else setActivePage('customer-dashboard');
      } else {
        if (email.toLowerCase() === ADMIN_EMAIL && !googleUser.emailVerified) {
          setErrorMsg('Admin access requires a verified email address. Verify your email in Google, then sign in again.');
          return;
        }
        const accountRole = email.toLowerCase() === ADMIN_EMAIL ? 'admin' : loginRole;
        const newUser = addUser({
          name,
          email,
          mobile: googleUser.phoneNumber || '',
          address: '',
          villageTownCity: '',
          pincode: '',
          state: 'Andhra Pradesh',
          country: 'India',
          language: 'en',
          role: accountRole,
          status: 'active'
        });


        setCurrentUser(newUser);
        setCurrentRole(accountRole);
        if (accountRole === 'admin') setActivePage('admin-dashboard');
        else if (accountRole === 'shop_owner') setActivePage('shop-dashboard');
        else setActivePage('customer-dashboard');
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (
        err?.code === 'auth/api-key-not-valid' ||
        err?.code === 'auth/invalid-api-key' ||
        err?.message?.includes('apiKey')
      ) {
        setErrorMsg('Firebase API Key not configured yet. Please update VITE_FIREBASE_API_KEY in .env or src/firebase.ts with your Firebase credentials.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        setErrorMsg(`This deployment domain is not authorized in Firebase. Add "${window.location.hostname}" under Firebase Console → Authentication → Settings → Authorized Domains.`);
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Google login popup was closed before completing sign in.');
      } else {
        setErrorMsg(err?.message || 'Google sign-in failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto px-4 py-16 space-y-8 transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      <div className="text-center space-y-3 flex flex-col items-center">
        <Logo size="lg" variant={themeMode === 'dark' ? 'light' : 'dark'} />
        <h1 className={`text-2xl font-extrabold tracking-tight pt-2 ${themeMode === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{t('login')}</h1>
        <p className={`text-xs ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t("Access your Nexvarya Customer or Shop Owner Dashboard")}</p>
      </div>

      <div className={`border p-6 sm:p-8 rounded-3xl shadow-xl space-y-4 transition-colors duration-300 ${
        themeMode === 'dark' ? 'bg-slate-900/90 border-emerald-900/60 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Role Selector Toggle */}
        <div className={`grid grid-cols-3 gap-2 p-1 rounded-2xl border ${
          themeMode === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100/80 border-emerald-100'
        }`}>
          <button
            type="button"
            onClick={() => setLoginRole('customer')}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              loginRole === 'customer'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : themeMode === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>{t("Customer")}</span>
          </button>
          <button
            type="button"
            onClick={() => setLoginRole('admin')}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              loginRole === 'admin'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : themeMode === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </button>
          <button
            type="button"
            onClick={() => setLoginRole('shop_owner')}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              loginRole === 'shop_owner'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-extrabold'
                : themeMode === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>{t("Shop Owner")}</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className={`w-full py-3 px-4 rounded-xl border font-bold text-xs shadow-sm flex items-center justify-center gap-3 transition-all disabled:opacity-50 ${
            themeMode === 'dark'
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700 hover:border-emerald-500'
              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-emerald-400'
          }`}
        >
          {isGoogleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{t("Continue with Google as")}{loginRole === 'shop_owner' ? 'Shop Owner' : 'Customer'}</span>
        </button>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] text-slate-400 font-medium uppercase tracking-wider">{t("or email")}</span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">{t("Email ID / Mobile Number")}</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Enter Email ID or Mobile Number"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-3 border border-slate-300 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
              />
              <Mail className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">{t('password')}</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-3 border border-slate-300 focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
              />
              <Lock className="w-4 h-4 text-emerald-600 absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">

            <button type="button" onClick={() => setErrorMsg(t('passwordHelp'))} className="text-emerald-700 hover:underline font-bold">{t("Forgot Password?")}</button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all mt-2"
          >
            <span>{t('login')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>{t('dontHaveAccount')} </span>
          <button
            type="button"
            onClick={() => setActivePage('signup')}
            className="text-emerald-700 font-bold hover:underline"
          >
            {t('signup')}
          </button>
        </div>
      </div>

    </div>
  );
};
