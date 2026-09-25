import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { UserRole, LanguageCode } from '../types';
import { User as UserIcon, Store, ArrowRight, Loader2 } from 'lucide-react';
import { loginWithGoogleFirebase } from '../firebase';

export const Signup: React.FC = () => {
  const { themeMode, t, categories, addUser, addShop, setActivePage, users, setCurrentUser, setCurrentRole } = useApp();

  const [accountType, setAccountType] = useState<UserRole>('customer');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Customer Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city] = useState('Vijayawada');
  const [pincode, setPincode] = useState('520001');
  const [state] = useState('Andhra Pradesh');
  const [country] = useState('India');
  const [prefLang, setPrefLang] = useState<LanguageCode>('en');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Shop Info Fields
  const [shopName, setShopName] = useState('');
  const [categoryId, setCategoryId] = useState('cat_grocery');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessPincode] = useState('520001');
  const [businessState] = useState('Andhra Pradesh');
  const [shopMobile] = useState('');
  const [shopEmail] = useState('');
  const [description, setDescription] = useState('');
  const [openingTime, setOpeningTime] = useState('08:00 AM');
  const [closingTime, setClosingTime] = useState('09:00 PM');
  const [gstNumber, setGstNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    setErrorMsg('');
    try {
      const res = await loginWithGoogleFirebase();
      const googleUser = res.user;

      const email = googleUser.email || '';
      const name = googleUser.displayName || 'Google User';

      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        setCurrentUser(existingUser);
        setCurrentRole(existingUser.role);
        if (existingUser.role === 'admin') setActivePage('admin-dashboard');
        else if (existingUser.role === 'shop_owner') setActivePage('shop-dashboard');
        else setActivePage('customer-dashboard');
      } else {
        const newUser = addUser({
          name,
          email,
          mobile: googleUser.phoneNumber || mobile || '',
          address: address || 'Google Authenticated User',
          villageTownCity: city || 'Vijayawada',
          pincode: pincode || '520001',
          state: 'Andhra Pradesh',
          country: 'India',
          language: prefLang,
          role: accountType,
          status: 'active'
        });

        if (accountType === 'shop_owner') {
          addShop({
            ownerId: newUser.id,
            businessName: shopName.trim() || `${name}'s Store`,
            categoryId: categoryId || 'cat_grocery',
            address: businessAddress || address || 'Main Market Road',
            pincode: businessPincode || pincode || '520001',
            state: businessState || state || 'Andhra Pradesh',
            phone: shopMobile || mobile || googleUser.phoneNumber || '9876543210',
            email: shopEmail || email,
            description: description || `${shopName || name + "'s Store"} offering products & services.`,
            openingTime: openingTime || '08:00 AM',
            closingTime: closingTime || '09:00 PM',
            gstNumber,
            whatsappNumber: whatsappNumber || shopMobile || mobile || '',
            rating: 5.0,
            reviewCount: 1
          });
        }

        setCurrentUser(newUser);
        setCurrentRole(accountType);
        if (accountType === 'shop_owner') setActivePage('shop-dashboard');
        else setActivePage('customer-dashboard');
      }
    } catch (err: any) {
      console.error('Google Signup Error:', err);
      if (
        err?.code === 'auth/api-key-not-valid' ||
        err?.code === 'auth/invalid-api-key' ||
        err?.message?.includes('apiKey')
      ) {
        setErrorMsg('Firebase API Key not configured yet. Please update VITE_FIREBASE_API_KEY in .env or src/firebase.ts with your Firebase credentials.');
      } else if (err?.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Google login popup was closed before completing signup.');
      } else {
        setErrorMsg(err?.message || 'Google sign-up failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setErrorMsg('Please accept the Terms & Conditions');
      return;
    }

    const createdUser = addUser({
      name: fullName,
      email,
      mobile,
      address,
      villageTownCity: city,
      pincode,
      state,
      country,
      language: prefLang,
      role: accountType,
      status: 'active'
    });

    if (accountType === 'shop_owner') {
      addShop({
        ownerId: createdUser.id,
        businessName: shopName,
        categoryId,
        address: businessAddress || address,
        pincode: businessPincode || pincode,
        state: businessState || state,
        phone: shopMobile || mobile,
        email: shopEmail || email,
        description: description || `${shopName} offering products & services.`,
        openingTime,
        closingTime,
        gstNumber,
        whatsappNumber: whatsappNumber || shopMobile || mobile,
        rating: 5.0,
        reviewCount: 1
      });

      setActivePage('shop-dashboard');
    } else {
      setActivePage('customer-dashboard');
    }
  };

  return (
    <div className={`max-w-2xl mx-auto px-4 py-12 space-y-8 min-h-screen transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      <div className="text-center space-y-3 flex flex-col items-center">
        <Logo size="lg" variant={themeMode === 'dark' ? 'light' : 'dark'} />
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border shadow-sm ${
          themeMode === 'dark'
            ? 'bg-emerald-950/90 text-amber-400 border-emerald-700/50'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          Join Nexvarya Platform
        </span>
        <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${
          themeMode === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          {t('createAccount')}
        </h1>
        <p className={`text-xs max-w-md mx-auto ${
          themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Register as a Customer to shop or as a Shop Owner to digitize your local business
        </p>
      </div>

      {/* Account Type Selector Tabs */}
      <div className={`p-2 rounded-2xl grid grid-cols-2 gap-2 shadow-xl backdrop-blur-md border ${
        themeMode === 'dark'
          ? 'bg-slate-900/90 border-emerald-900/40'
          : 'bg-white border-slate-200'
      }`}>
        <button
          type="button"
          onClick={() => setAccountType('customer')}
          className={`p-4 rounded-xl text-left transition-all flex items-start gap-3 border ${
            accountType === 'customer'
              ? 'bg-emerald-950/80 border-emerald-500/60 text-white shadow-md shadow-emerald-950/50'
              : themeMode === 'dark'
                ? 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <div className={`p-2.5 rounded-lg ${accountType === 'customer' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400'}`}>
            <UserIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`font-bold text-sm ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('customerAccount')}</h3>
            <p className={`text-[11px] leading-tight mt-0.5 ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t('customerDesc')}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setAccountType('shop_owner')}
          className={`p-4 rounded-xl text-left transition-all flex items-start gap-3 border ${
            accountType === 'shop_owner'
              ? 'bg-amber-950/80 border-amber-500/60 text-white shadow-md shadow-amber-950/50'
              : 'bg-slate-950/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <div className={`p-2.5 rounded-lg ${accountType === 'shop_owner' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-400'}`}>
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">{t('shopOwnerAccount')}</h3>
            <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{t('shopOwnerDesc')}</p>
          </div>
        </button>
      </div>

      {/* Quick Google Sign Up Card */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-3 backdrop-blur-md">
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={isGoogleLoading}
          className="w-full py-3.5 px-4 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-900 text-slate-200 font-bold text-xs shadow-md flex items-center justify-center gap-3 transition-all hover:border-emerald-500/50 disabled:opacity-50"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
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
          <span>Sign up with Google (Gmail)</span>
        </button>
        <p className="text-[11px] text-slate-400 text-center">
          Fast 1-click registration using your Gmail account
        </p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900/90 border border-emerald-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 backdrop-blur-md">
        
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Section 1: Basic Personal User Information */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-emerald-900/50 pb-2 flex items-center justify-between">
            <span>1. Personal Details</span>
            <span className="text-[10px] text-slate-400 normal-case font-normal">Step 1 of {accountType === 'shop_owner' ? '2' : '1'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t('fullName')} *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sriram Kumar"
                className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t('mobileNumber')} *</label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter Mobile Number"
                className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t('emailId')} *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t('preferredLanguage')}</label>
              <select
                value={prefLang}
                onChange={(e) => setPrefLang(e.target.value as LanguageCode)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="en">🇬🇧 English</option>
                <option value="te">🇮🇳 తెలుగు (Telugu)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t('password')} *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t('confirmPassword')} *</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">{t('homeAddress')} *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Door No, Street Name, Landmark"
                className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t('pincode')} *</label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="520001"
                className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Shop / Business Information */}
        {accountType === 'shop_owner' && (
          <div className="space-y-4 pt-4 border-t border-slate-800 animate-in fade-in">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-emerald-900/50 pb-2 flex items-center justify-between">
              <span>2. {t('shopDetails')}</span>
              <span className="text-[10px] text-amber-400/80 font-normal">Business Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t('shopName')} *</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. Sri Lakshmi Groceries"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t('businessType')} *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.nameTe})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">{t('businessAddress')} *</label>
                <input
                  type="text"
                  required
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  placeholder="Shop Door No, Main Road, Market Area"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t('openingTime')}</label>
                <input
                  type="text"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  placeholder="08:00 AM"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t('closingTime')}</label>
                <input
                  type="text"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  placeholder="09:00 PM"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t('whatsappNumber')}</label>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="For receiving direct WhatsApp orders"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t('gstNumber')}</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="37AAAAA0000A1Z5"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">{t('description')}</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief overview of products, brands, or services offered..."
                  rows={2}
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Terms Checkbox */}
        <div className="pt-2">
          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0 w-4 h-4 accent-emerald-600"
            />
            <span>{t('acceptTerms')}</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <span>{t('createAccount')}</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </button>

        <div className="pt-2 text-center text-xs text-slate-400">
          <span>{t('alreadyHaveAccount')} </span>
          <button
            type="button"
            onClick={() => setActivePage('login')}
            className="text-amber-400 font-bold hover:text-amber-300 hover:underline transition-colors"
          >
            {t('login')}
          </button>
        </div>

      </form>

    </div>
  );
};
