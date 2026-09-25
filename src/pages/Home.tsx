import React from 'react';
import { useApp } from '../context/useApp';
import { HeroSection } from '../components/home/HeroSection';
import { InquirySection } from '../components/home/InquirySection';
import { 
  Building2, Store, ArrowRight,
  CheckCircle2, Tag, Smartphone, Sparkles, MapPin, Phone,
  ShoppingCart, Utensils, Shirt, Tv, Pill, Wrench, Armchair, Hammer, Grid, Shield, Award, Users, Cpu
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  cat_grocery: <ShoppingCart className="w-5 h-5" />,
  cat_restaurant: <Utensils className="w-5 h-5" />,
  cat_clothing: <Shirt className="w-5 h-5" />,
  cat_electronics: <Tv className="w-5 h-5" />,
  cat_medical: <Pill className="w-5 h-5" />,
  cat_services: <Wrench className="w-5 h-5" />,
  cat_furniture: <Armchair className="w-5 h-5" />,
  cat_hardware: <Hammer className="w-5 h-5" />,
  cat_mobile: <Smartphone className="w-5 h-5" />,
  cat_other: <Grid className="w-5 h-5" />
};

export const Home: React.FC = () => {
  const { 
    themeMode, t, language, categories,
    setActivePage, setSelectedCategory
  } = useApp();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActivePage('businesses');
  };

  return (
    <div className={`space-y-16 pb-20 transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50/80 text-slate-900'
    }`}>
      
      {/* SECTION 1: HERO & CORPORATE DESK */}
      <HeroSection />

      {/* SECTION 2: WHAT BUSINESSES CAN USE NEXVARYA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-black uppercase tracking-widest text-emerald-700">{t("Platform Capability")}</h2>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t("What Businesses Can Use Nexvarya?")}</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">{t("Nexvarya supports all local business categories with custom measurement units and automated management workflows.")}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 hover:border-emerald-300 p-5 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              🛒
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">{t("Grocery")}</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{t("Manage products, stock status & kg/liter pricing.")}</p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-amber-300 p-5 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              👕
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">{t("Clothing")}</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{t("Apparel catalog, size/piece pricing & live orders.")}</p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-amber-300 p-5 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/60 text-amber-800 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              🔧
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">{t("Hardware")}</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{t("Tools, equipment inventory & bulk volume discounts.")}</p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-teal-300 p-5 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              📱
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">{t("Electronics")}</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">{t("Digital product catalog, warranties & customer orders.")}</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: NEXVARYA SERVICES GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-black uppercase tracking-widest text-amber-600">{t("Core Features")}</h2>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t("⚡ Nexvarya Platform Services")}</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">{t("Everything business owners and customers need to connect, transact, and grow locally.")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-base">
              📦
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">{t("Product Management")}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t("Add, edit, and categorize items with custom units & stock levels.")}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-base">
              💰
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">{t("Smart Bulk Pricing")}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t("Set automated volume discount tiers for 10+ or 25+ quantity orders.")}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-base">
              📊
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">{t("Sales Analytics")}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t("Filter sales performance by Today, 7 Days, 30 Days, or Monthly.")}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-base">
              📋
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">{t("Inventory Management")}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t("Automated low-stock alerts when inventory reaches thresholds.")}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-base">
              🛍️
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">{t("Online Orders Queue")}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t("Receive, accept, prepare, and complete customer orders in real-time.")}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-base">
              📱
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">{t("Digital Store & QR Poster")}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t("Printable A4 in-store posters with scannable WhatsApp order QR code.")}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-base">
              📈
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">{t("Business Reports")}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t("Track top-moving products, total discounts given & revenue.")}</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-base">
              🔔
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">{t("Order Notifications")}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{t("Instant customer status badges from pending to completed.")}</p>
          </div>

        </div>
      </section>

      {/* SECTION 2: ABOUT MY COMPANY (NEXVARYA TECHNOLOGIES) */}
      <section id="about-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white border border-emerald-100 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>{t("About Nexvarya Technologies")}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">{t("Pioneering Next-Generation Multi-Tenant Commerce Technology")}</h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t("Headquartered in Rajahmundry, Andhra Pradesh,")}<strong>Nexvarya Technologies</strong>{t("builds enterprise software platforms connecting local merchants, service providers, and regional buyers under one unified digital ecosystem.")}</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 border border-indigo-200 text-slate-900 p-6 rounded-2xl shadow-sm space-y-3 shrink-0 max-w-xs w-full">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{t("Company Credential")}</span>
              </div>
              <h3 className="font-black text-base text-slate-900">Nexvarya Technologies</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-normal">{t("Dedicated IT & software engineering partner empowering Andhra Pradesh businesses with robust web and mobile applications.")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{t("Multi-Tenant Store Directory")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t("Single digital portal empowering local shop owners—Grocery, Medical, Electronics, Restaurants, Hardware, and Services—to run online catalogs effortlessly.")}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{t("Automated Bulk Pricing Engine")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t("Advanced calculation engine offering dynamic discounts for bulk units (KG, Liter, Box, Meter, Service), delivering transparent instant wholesale pricing.")}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{t("Custom Software Development")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t("Engineering bespoke software solutions, Web applications, WhatsApp business automation, and enterprise databases tailored to your business needs.")}</p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: SERVICES WE PROVIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>{t("Comprehensive Solutions")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{t("Services We Provide")}</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t("Nexvarya Technologies delivers end-to-end digital services for consumers, small shop owners, and enterprise clients.")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Service 1 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Store className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">{t("Service #1")}</span>
              <h3 className="font-extrabold text-slate-900 text-lg">{t("Multi-Business Directory Onboarding")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t("We digitize local brick-and-mortar stores in Rajahmundry. Register your shop, upload products, set business hours, toggle store Open/Closed status, and publish online immediately.")}</p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Store profile & category listing")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Live Open/Closed status toggle")}</span>
              </li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Tag className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">{t("Service #2")}</span>
              <h3 className="font-extrabold text-slate-900 text-lg">{t("Tiered Bulk Quantity Pricing Engine")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t("Automated quantity pricing tiers for products sold in KG, Liter, Box, Service, Unit, or Meter. Customers get transparent unit discounts when purchasing in larger volumes.")}</p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Fixed price & percentage discount tiers")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Instant cart savings breakdown")}</span>
              </li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <Smartphone className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">{t("Service #3")}</span>
              <h3 className="font-extrabold text-slate-900 text-lg">{t("Direct WhatsApp Ordering & QR Posters")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t("Zero-commission direct order system delivering order details straight to WhatsApp (+91 7997679777), plus high-resolution store counter QR poster printing.")}</p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Direct WhatsApp click-to-order link")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Printable store QR counter posters")}</span>
              </li>
            </ul>
          </div>

          {/* Service 4 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
              <Cpu className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">{t("Service #4")}</span>
              <h3 className="font-extrabold text-slate-900 text-lg">{t("Custom Web & Mobile Development")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t("Full-stack web application development, Android/iOS mobile software, custom e-commerce engines, and API backend integration engineered by Nexvarya Technologies.")}</p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("React, TypeScript & Vite development")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Custom SaaS & business web tools")}</span>
              </li>
            </ul>
          </div>

          {/* Service 5 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
              <Users className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">{t("Service #5")}</span>
              <h3 className="font-extrabold text-slate-900 text-lg">{t("B2B & B2C Local Marketplace")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t("Hyperlocal connectivity bringing together buyers, wholesale purchasers, local residents, and verified business sellers in Rajahmundry & neighboring districts.")}</p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Verified business profiles")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Direct customer inquiries & contact")}</span>
              </li>
            </ul>
          </div>

          {/* Service 6 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
              <Shield className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">{t("Service #6")}</span>
              <h3 className="font-extrabold text-slate-900 text-lg">{t("Multi-Language Accessibility (EN/TE)")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t("Full dual-language translation architecture supporting English 🇬🇧 and Telugu 🇮🇳 across shop catalogs, checkout, and admin controls.")}</p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("English & Telugu interface toggle")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("Regional merchant accessibility")}</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* SECTION 4: DIRECT COMPANY CONTACT SPOTLIGHT */}
      <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-xs font-bold">
                <Phone className="w-3.5 h-3.5 text-indigo-300" />
                <span>{t("Get In Touch Directly")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">{t("Want to List Your Shop or Request Software Development?")}</h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{t("Contact")}<strong>Nexvarya Technologies</strong>{t("today. Our team is ready to assist you with store onboarding, software customization, and business growth.")}</p>

              <div className="space-y-4 pt-2">
                
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="p-3 rounded-xl bg-indigo-600 text-white font-bold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-200">{t("Mobile & WhatsApp")}</span>
                    <a href="tel:+917997679777" className="text-lg font-extrabold text-white hover:text-indigo-300 block">
                      +91 7997679777
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="p-3 rounded-xl bg-purple-600 text-white font-bold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-200">{t("Headquarters Address")}</span>
                    <p className="text-xs font-extrabold text-white">
                      Nexvarya Technologies, Rajahmundry, AP - 534313
                    </p>
                  </div>
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href="https://wa.me/917997679777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all"
                >
                  <span>WhatsApp +91 7997679777</span>
                </a>
                <button
                  onClick={() => document.getElementById('inquiry-name')?.focus()}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs border border-white/20 flex items-center gap-2 transition-all"
                >
                  <span>{t("Fill Inquiry Form")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full">
              <InquirySection />
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: EXPLORE BUSINESS CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('exploreCategories')}
            </h2>
            <p className="text-xs text-slate-500 mt-1">{t("Select a business category to browse local shops, services, and products")}</p>
          </div>
          <button
            onClick={() => { setSelectedCategory('all'); setActivePage('businesses'); }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>{t("View All Categories")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group bg-white hover:bg-indigo-50/80 border border-slate-200/90 hover:border-indigo-300 p-5 rounded-2xl text-left transition-all duration-200 hover:-translate-y-1 shadow-2xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center transition-all mb-3 shadow-2xs">
                {categoryIcons[cat.id] || <Store className="w-5 h-5" />}
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors">
                {language === 'te' ? cat.nameTe : cat.name}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                {cat.description || 'Browse items'}
              </p>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
