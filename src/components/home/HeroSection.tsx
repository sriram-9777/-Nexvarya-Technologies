import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Store, Phone, Mail, Clock, MapPin, Building2, Shield, Award, Users, Cpu } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { themeMode, t, setActivePage } = useApp();

  return (
    <section className={`relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b shadow-xs transition-colors duration-300 ${
      themeMode === 'dark'
        ? 'bg-gradient-to-b from-emerald-950/40 via-amber-950/20 to-[#020617] text-slate-100 border-emerald-950/60'
        : 'bg-gradient-to-b from-emerald-900/10 via-amber-500/5 to-slate-50 text-slate-900 border-emerald-100'
    }`}>
      {/* Ambient Light Emerald & Gold Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10 text-center">
        
        {/* Top Brand Pill */}
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border shadow-sm ${
          themeMode === 'dark'
            ? 'bg-slate-900/90 border-emerald-900/60 text-slate-100'
            : 'bg-white/90 border-emerald-200/80 text-slate-900'
        }`}>
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-extrabold tracking-wide">
            Official Platform of <strong className="text-emerald-500 font-black">Nexvarya Technologies</strong>
          </span>
        </div>

        {/* Hero Main Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            LOCAL BUSINESSES.<br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              SMARTER CONNECTIONS.
            </span>
          </h1>
          <p className={`text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-bold ${
            themeMode === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            One premier platform connecting local customers with verified local businesses & merchants.
          </p>
          
          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('businesses')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>{t('exploreBusinesses')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('signup')}
              className={`px-6 py-3.5 rounded-2xl font-black text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-105 border ${
                themeMode === 'dark'
                  ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/40'
                  : 'bg-white hover:bg-amber-50 text-slate-900 border-amber-300'
              }`}
            >
              <Store className="w-4 h-4 text-emerald-500" />
              <span>{t('joinBusiness')}</span>
            </button>
          </div>
        </div>

        {/* Official Company Contact Card */}
        <div className={`max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 backdrop-blur-xl border shadow-2xl space-y-6 ${
          themeMode === 'dark'
            ? 'bg-slate-900/90 border-emerald-900/60 text-slate-100'
            : 'bg-white/95 border-emerald-200/80 text-slate-900'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-emerald-500/20">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-emerald-500" />
              <span className="font-extrabold text-sm tracking-wide">Nexvarya Technologies Corporate Desk</span>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Verified Enterprise Partner
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Phone & WhatsApp</span>
              <a href="tel:+919494300868" className="text-xs font-black flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>+91 94943 00868</span>
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Corporate Email</span>
              <a href="mailto:ramachandraphani8@gmail.com" className="text-xs font-black flex items-center gap-1.5 hover:text-emerald-400 transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">ramachandraphani8@gmail.com</span>
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Business Hours</span>
              <div className="text-xs font-black flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span>08:00 AM – 09:00 PM</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Location HQ</span>
              <div className="text-xs font-black flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>Andhra Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
