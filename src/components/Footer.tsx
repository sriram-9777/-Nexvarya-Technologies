import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { Globe, Sparkles, Phone, MapPin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setLanguage, language, setActivePage, activePage, themeMode } = useApp();

  const handleNav = (page: string, sectionId?: string) => {
    if (sectionId) {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`transition-colors duration-300 border-t pt-16 pb-8 ${
      themeMode === 'dark'
        ? 'bg-[#01040e] text-slate-400 border-emerald-950/80'
        : 'bg-slate-900 text-slate-300 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <button onClick={() => handleNav('home')} className="text-left bg-transparent">
              <Logo size="md" variant="light" showSubtitle={true} />
            </button>
            <p className="text-xs leading-relaxed text-slate-400">
              A comprehensive multi-business directory and enterprise digital platform developed by <strong className="text-white font-extrabold">Nexvarya Technologies</strong>.
            </p>
            
            <div className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-900 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rajahmundry, AP - 534313</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+917997679777" className="text-amber-300 font-extrabold hover:text-amber-200 transition-colors">
                  +91 7997679777
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">contact@nexvarya.com</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-extrabold pt-1">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{t('poweredBy')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-amber-400 text-xs font-black uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-emerald-400 transition-colors">
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home', 'about-section')} className="hover:text-emerald-400 transition-colors">
                  Company About
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services-products')} className="hover:text-emerald-400 transition-colors">
                  Services We Provide
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('businesses')} className="hover:text-emerald-400 transition-colors">
                  Browse Businesses
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('home', 'contact-section')} className="hover:text-emerald-400 transition-colors">
                  {t('contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h4 className="text-amber-400 text-xs font-black uppercase tracking-wider mb-4">For Shop Owners</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => setActivePage('signup')} className="hover:text-emerald-400 transition-colors">
                  Register Your Business
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('login')} className="hover:text-emerald-400 transition-colors">
                  Shop Owner Login
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-amber-300 transition-colors">
                  Business Support (+91 7997679777)
                </button>
              </li>
            </ul>
          </div>

          {/* Language & Regional */}
          <div>
            <h4 className="text-amber-400 text-xs font-black uppercase tracking-wider mb-4">Platform Language</h4>
            <p className="text-xs text-slate-400 mb-3">
              Regional Language Support:
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setLanguage('en')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs text-left font-bold transition-all ${
                  language === 'en'
                    ? 'border-amber-500/60 bg-emerald-950/80 text-amber-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>🇬🇧 English</span>
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs text-left font-bold transition-all ${
                  language === 'te'
                    ? 'border-amber-500/60 bg-emerald-950/80 text-amber-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>🇮🇳 తెలుగు (Telugu)</span>
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© 2026 Nexvarya Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-emerald-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-emerald-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-emerald-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
