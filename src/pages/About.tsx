import React from 'react';
import { useApp } from '../context/useApp';
import { Logo } from '../components/Logo';
import { Sparkles, Store, Users, Cpu, Award, Phone, MapPin, Mail, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  const { t, setActivePage } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14 min-h-screen">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-700/50 text-amber-400 text-xs font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{t("Enterprise Platform Identity")}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-heading">{t("About Nexvarya Technologies")}</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">{t("Empowering merchants, service providers, wholesale buyers, and local customers across Rajahmundry and Andhra Pradesh through robust multi-tenant software architecture.")}</p>
      </div>

      {/* Main Company Story Card */}
      <div className="bg-slate-900/90 border border-emerald-900/40 rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center backdrop-blur-md">
        <div className="space-y-6">
          <Logo size="lg" />
          <h2 className="text-2xl font-black text-white tracking-tight font-heading">{t("Building Digital Infrastructure for Local Commerce")}</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-amber-400">Nexvarya Technologies</strong>{t("was established to bridge the gap between neighborhood offline businesses and modern digital commerce. Our scalable directory platform enables local shop owners to manage products, offer quantity-based bulk discounts, print store counter QR posters, and take direct orders on WhatsApp without steep commissions.")}</p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => setActivePage('services-products')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 flex items-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>{t("Our Full Services")}</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 text-xs font-bold border border-slate-800 transition-all"
            >
              <span>{t("Contact Team")}</span>
            </button>
          </div>
        </div>

        {/* Company Details Box */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 text-white p-8 rounded-3xl space-y-6 shadow-2xl border border-emerald-800/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-lg font-black flex items-center gap-2 text-amber-400 font-heading">
            <Award className="w-5 h-5 text-amber-400" />
            <span>{t("Company Headquarters")}</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 shrink-0 border border-slate-800">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white">{t("Registered Address")}</strong>
                <span className="text-slate-300">Nexvarya Technologies, Rajahmundry, Andhra Pradesh - 534313</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-950 text-amber-400 shrink-0 border border-slate-800">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white">{t("Mobile / WhatsApp Support")}</strong>
                <a href="tel:+917997679777" className="text-amber-400 font-extrabold hover:underline">
                  +91 7997679777
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 shrink-0 border border-slate-800">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-white">{t("Official Email")}</strong>
                <span className="text-slate-300">contact@nexvarya.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Technology Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-slate-900/90 border border-emerald-900/40 hover:border-emerald-500/60 p-7 rounded-3xl space-y-3 shadow-2xl transition-all backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 flex items-center justify-center font-bold">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-white text-base font-heading">{t("Multi-Tenancy for Businesses")}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{t("One platform hosting hundreds of local shop owners—from Grocery, Restaurants, Medical Stores, to Electronics and Handyman services.")}</p>
        </div>

        <div className="bg-slate-900/90 border border-emerald-900/40 hover:border-emerald-500/60 p-7 rounded-3xl space-y-3 shadow-2xl transition-all backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-amber-950/80 text-amber-400 border border-amber-800/50 flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-white text-base font-heading">{t("Bulk Pricing Discount Engine")}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{t("Automated pricing calculations supporting units (KG, Liter, Unit, Meter, Box, Service) with tier-based fixed or percentage discounts.")}</p>
        </div>

        <div className="bg-slate-900/90 border border-emerald-900/40 hover:border-emerald-500/60 p-7 rounded-3xl space-y-3 shadow-2xl transition-all backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-teal-950/80 text-teal-400 border border-teal-800/50 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-white text-base font-heading">{t("Native Multi-Language Support")}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{t("Built from the ground up with a flexible translation framework supporting English 🇬🇧 and Telugu 🇮🇳 seamlessly.")}</p>
        </div>

      </div>

    </div>
  );
};
