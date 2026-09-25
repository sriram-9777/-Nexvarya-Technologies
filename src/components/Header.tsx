import React, { useState } from 'react';
import { useApp } from '../context/useApp';
import { Logo } from './Logo';
import { Globe, Search, Menu, X, ChevronDown, Sparkles, User, LogOut, Shield, Store, Sun, Moon, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const { 
    themeMode, toggleThemeMode, cart,
    language, setLanguage, t, 
    currentUser, setCurrentUser, currentRole,
    activePage, setActivePage,
    searchQuery, setSearchQuery,
    showDemoBar, toggleDemoBar
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Helper to change page OR smoothly scroll to a section on the main page
  const handleNavigation = (page: string, sectionId?: string) => {
    if (mobileMenuOpen) setMobileMenuOpen(false);

    if (sectionId) {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 120);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    // Default navigate to page and scroll to top
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigation('home');
  };

  const getDashboardPage = () => {
    if (currentUser?.role === 'shop_owner' || currentRole === 'shop_owner') return 'shop-dashboard';
    if (currentUser?.role === 'admin' || currentRole === 'admin') return 'admin-dashboard';
    return 'customer-dashboard';
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 backdrop-blur-xl border-b shadow-xs ${
      themeMode === 'dark'
        ? 'bg-slate-950/90 border-slate-800/80 text-slate-100'
        : 'bg-white/95 border-slate-200/90 text-slate-900'
    }`}>
      
      {/* Dynamic Role Status Bar */}
      {currentUser && (
        <div className={`px-4 py-1.5 text-[11px] font-bold transition-all text-white flex items-center justify-between border-b ${
          currentRole === 'shop_owner'
            ? 'theme-inverse bg-gradient-to-r from-emerald-950 via-emerald-900 to-amber-950 border-amber-500/30'
            : currentRole === 'admin'
            ? 'theme-inverse bg-gradient-to-r from-slate-950 via-amber-950 to-emerald-950 border-amber-500/30'
            : 'theme-inverse bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 border-emerald-500/20'
        }`}>
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentRole === 'shop_owner' ? (
                <>
                  <Store className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>{t("🏪 MERCHANT PORTAL: Logged in as")}<strong className="text-amber-300 font-extrabold">{currentUser.name}</strong></span>
                </>
              ) : currentRole === 'admin' ? (
                <>
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t("🛡️ PLATFORM ADMIN PANEL: Logged in as")}<strong className="text-amber-300 font-extrabold">{currentUser.name}</strong></span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t("🛍️ CUSTOMER PORTAL: Welcome")}<strong className="text-emerald-300 font-extrabold">{currentUser.name}</strong> ({currentUser.villageTownCity || 'Vijayawada'})</span>
                </>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-3 font-semibold">
              <button onClick={() => handleNavigation(getDashboardPage())} className="hover:underline text-amber-300 font-bold">{t("Go to Dashboard")}</button>
              <span className="text-slate-500">•</span>
              <button onClick={() => handleNavigation('profile')} className="hover:underline text-white/90">{t("My Account")}</button>
              <span className="text-slate-500">•</span>
              <button onClick={handleLogout} className="hover:underline text-rose-300">{t("Logout")}</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-20 py-3 gap-2 flex-wrap">
          
          {/* Logo & Brand - Click scrolls to top of Home */}
          <button 
            onClick={() => handleNavigation('home')}
            className="text-left focus:outline-none bg-transparent shrink-0 hover:opacity-90 transition-opacity"
            title="Nexvarya Technologies - Home"
          >
            <Logo size="md" showSubtitle={true} variant={themeMode === 'dark' ? 'light' : 'dark'} />
          </button>

          {/* Desktop Search Box */}
          <div className="hidden md:flex flex-1 max-w-xs mx-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNavigation('businesses');
                }}
                className={`w-full text-xs rounded-xl pl-9 pr-4 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 text-slate-100 placeholder-slate-400 border-emerald-900/60 focus:border-emerald-500'
                    : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-emerald-200/80 focus:border-emerald-600 focus:bg-white'
                }`}
              />
              <Search className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
            </div>
          </div>

          {/* Desktop Navigation Links (Dynamic per User Role) */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider">
            {!currentUser ? (
              <>
                <button
                  onClick={() => handleNavigation('home')}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    activePage === 'home' 
                      ? themeMode === 'dark'
                        ? 'text-amber-300 bg-emerald-950/80 font-black border border-amber-500/40 shadow-xs'
                        : 'text-emerald-800 bg-emerald-50 font-black border border-emerald-300 shadow-2xs' 
                      : themeMode === 'dark'
                        ? 'text-slate-300 hover:text-amber-300 hover:bg-slate-900'
                        : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  {t('home')}
                </button>

                <button
                  onClick={() => handleNavigation('businesses')}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    activePage === 'businesses'
                      ? themeMode === 'dark'
                        ? 'text-amber-300 bg-emerald-950/80 font-black border border-amber-500/40 shadow-xs'
                        : 'text-emerald-800 bg-emerald-50 font-black border border-emerald-300 shadow-2xs'
                      : themeMode === 'dark'
                        ? 'text-slate-300 hover:text-amber-300 hover:bg-slate-900'
                        : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  {t('browseShops')}
                </button>

                <button
                  onClick={() => handleNavigation('home', 'about-section')}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    themeMode === 'dark'
                      ? 'text-slate-300 hover:text-amber-300 hover:bg-slate-900'
                      : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  {t('companyAbout')}
                </button>

                <button
                  onClick={() => handleNavigation('home', 'contact-section')}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    themeMode === 'dark'
                      ? 'text-slate-300 hover:text-amber-300 hover:bg-slate-900'
                      : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-100'
                  }`}
                >
                  {t('contact')}
                </button>
              </>
            ) : currentRole === 'shop_owner' ? (
              <>
                <button
                  onClick={() => handleNavigation('shop-dashboard')}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    activePage === 'shop-dashboard'
                      ? themeMode === 'dark'
                        ? 'text-amber-300 bg-emerald-950/80 font-black border border-amber-500/40 shadow-xs'
                        : 'text-emerald-900 bg-emerald-50 font-black border border-emerald-300 shadow-2xs'
                      : themeMode === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t('merchantControl')}
                </button>
                <button
                  onClick={() => handleNavigation('profile')}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    activePage === 'profile'
                      ? themeMode === 'dark'
                        ? 'text-amber-300 bg-emerald-950/80 font-black border border-amber-500/40'
                        : 'text-emerald-800 bg-emerald-50 font-black border border-emerald-300'
                      : themeMode === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t('accountSettings')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('customer-dashboard')}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    activePage === 'customer-dashboard' || activePage === 'home'
                      ? themeMode === 'dark'
                        ? 'text-amber-300 bg-emerald-950/80 font-black border border-amber-500/40 shadow-xs'
                        : 'text-emerald-800 bg-emerald-50 font-black border border-emerald-300 shadow-2xs'
                      : themeMode === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t('customerPortal')}
                </button>
                <button
                  onClick={() => handleNavigation('businesses')}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    activePage === 'businesses'
                      ? themeMode === 'dark'
                        ? 'text-amber-300 bg-emerald-950/80 font-black border border-amber-500/40 shadow-xs'
                        : 'text-emerald-800 bg-emerald-50 font-black border border-emerald-300 shadow-2xs'
                      : themeMode === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t('browseShops')}
                </button>
                <button
                  onClick={() => handleNavigation('profile')}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    activePage === 'profile'
                      ? themeMode === 'dark'
                        ? 'text-amber-300 bg-emerald-950/80 font-black border border-amber-500/40 shadow-xs'
                        : 'text-emerald-800 bg-emerald-50 font-black border border-emerald-300 shadow-2xs'
                      : themeMode === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {t('myProfile')}
                </button>
              </>
            )}
          </nav>

          {/* Right Action Controls: Login & Sign Up + Demo + Theme + Language */}
          <div className="flex flex-wrap max-w-full items-center gap-2 sm:gap-2.5">

            <button onClick={onOpenCart} aria-label={t('yourCart')} className="relative p-2 rounded-xl border border-emerald-500/40 text-emerald-500 shrink-0">
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 rounded-full bg-emerald-700 text-white text-[10px] px-1.5">{cart.length}</span>}
            </button>
            {/* Dark / Light Theme Toggle Switch */}
            <button
              onClick={toggleThemeMode}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                themeMode === 'dark'
                  ? 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800 shadow-xs'
                  : 'bg-amber-50 text-amber-900 border-amber-300/80 hover:bg-amber-100 shadow-xs'
              }`}
              title={themeMode === 'dark' ? t('lightMode') : t('darkMode')}
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">{t('lightMode')}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-emerald-700" />
                  <span className="hidden sm:inline">{t('darkMode')}</span>
                </>
              )}
            </button>
            
            {/* Demo Switcher - Shown ONLY when no user is logged in */}
            {import.meta.env.DEV && !currentUser && (
              <button
                onClick={toggleDemoBar}
                className={`flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold transition-colors border ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 text-emerald-400 hover:bg-slate-800 border-emerald-900/60'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200/80'
                }`}
                title="Toggle Demo Mode Switcher"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{showDemoBar ? t('hideDemo') : t('demoRoleSwitcher')}</span>
              </button>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors border ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200/80'
                }`}
                title={t('language')} aria-expanded={langDropdownOpen}
              >
                <Globe className="w-4 h-4 text-emerald-500" />
                <span>{language === 'en' ? 'GB EN' : 'IN TEL'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-40 border rounded-2xl shadow-xl py-1.5 z-50 text-xs font-medium animate-in fade-in zoom-in-95 ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <button
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between ${
                      language === 'en'
                        ? 'text-emerald-400 font-bold bg-emerald-950/60'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <span>🇬🇧 English</span>
                    {language === 'en' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('te'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between ${
                      language === 'te'
                        ? 'text-emerald-400 font-bold bg-emerald-950/60'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <span>🇮🇳 తెలుగు</span>
                    {language === 'te' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </button>
                </div>
              )}
            </div>

            {/* User Login & Sign Up Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigation(getDashboardPage())}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-md shadow-emerald-600/20 transition-all"
                >
                  {currentRole === 'admin' ? (
                    <Shield className="w-4 h-4 text-amber-300" />
                  ) : currentRole === 'shop_owner' ? (
                    <Store className="w-4 h-4 text-amber-300" />
                  ) : (
                    <User className="w-4 h-4 text-amber-300" />
                  )}
                  <span className="hidden sm:inline">{currentUser.name.split(' ')[0]} ({t('dashboard')})</span>
                  <span className="sm:hidden">{t('dashboard')}</span>
                </button>

                <button
                  onClick={() => handleNavigation('profile')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs shadow-xs transition-all"
                  title={t("My Profile")}
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span className="hidden md:inline">{t("My Profile")}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title={t('logout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigation('login')}
                  className="px-3.5 py-2 text-xs font-extrabold text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => handleNavigation('signup')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black shadow-md shadow-indigo-600/20 transition-all"
                >
                  {t('signup')}
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              aria-label={t('menu')} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-2 animate-in slide-in-from-top-2">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleNavigation('businesses'); }}
                className="w-full bg-slate-100 text-slate-800 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-200"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            <button
              onClick={() => handleNavigation('home')}
              className="block w-full text-left px-3.5 py-2.5 rounded-xl text-slate-800 font-bold hover:bg-indigo-50 text-xs"
            >
              {t('home')}
            </button>
            <button
              onClick={() => handleNavigation('home', 'about-section')}
              className="block w-full text-left px-3.5 py-2.5 rounded-xl text-slate-800 font-bold hover:bg-indigo-50 text-xs"
            >{t("Company About")}</button>
            <button
              onClick={() => handleNavigation('home', 'contact-section')}
              className="block w-full text-left px-3.5 py-2.5 rounded-xl text-slate-800 font-bold hover:bg-indigo-50 text-xs"
            >
              {t('contact')}
            </button>

            {currentUser ? (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => handleNavigation(getDashboardPage())}
                  className="block w-full text-left px-3.5 py-2.5 rounded-xl text-indigo-700 font-bold bg-indigo-50 text-xs"
                >{t("Dashboard (")}{currentUser.name})
                </button>
                <button
                  onClick={() => handleNavigation('profile')}
                  className="block w-full text-left px-3.5 py-2.5 rounded-xl text-slate-800 font-bold hover:bg-indigo-50 text-xs"
                >{t("👤 My Profile & Account Settings")}</button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3.5 py-2.5 rounded-xl text-rose-600 font-bold hover:bg-rose-50 text-xs"
                >{t("🚪 Logout")}</button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => handleNavigation('login')}
                  className="w-1/2 py-2 text-center text-xs font-bold text-slate-700 bg-slate-100 rounded-xl"
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => handleNavigation('signup')}
                  className="w-1/2 py-2 text-center text-xs font-extrabold text-white bg-indigo-600 rounded-xl"
                >
                  {t('signup')}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
