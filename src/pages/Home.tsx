import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/Logo';
import { 
  Building2, Search, Store, ArrowRight, Star, 
  CheckCircle2, Tag, Smartphone, Sparkles, MapPin, Phone, Mail, Clock,
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
    themeMode, t, language, categories, shops, products, 
    setActivePage, setSelectedShopId, setSelectedCategory,
    searchQuery, setSearchQuery 
  } = useApp();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActivePage('businesses');
  };

  return (
    <div className={`space-y-16 pb-20 transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50/80 text-slate-900'
    }`}>
      
      {/* SECTION 1: LUXURY DEEP EMERALD & WARM GOLD HERO & COMPANY CONTACT DETAILS SPOTLIGHT */}
      <section className={`relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b shadow-xs transition-colors duration-300 ${
        themeMode === 'dark'
          ? 'bg-gradient-to-b from-emerald-950/40 via-amber-950/20 to-[#020617] text-slate-100 border-emerald-950/60'
          : 'bg-gradient-to-b from-emerald-900/10 via-amber-500/5 to-slate-50 text-slate-900 border-emerald-100'
      }`}>
        {/* Ambient Light Emerald & Gold Glow Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-10 text-center">
          
          {/* Top Brand Pill */}
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border shadow-sm animate-in fade-in ${
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
                <span>Explore Businesses</span>
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
                <span>Join Nexvarya as Business</span>
              </button>
            </div>
          </div>

          {/* Company Contact Details Card (Prominent Header Section) */}
          <div className={`max-w-4xl mx-auto backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-xl text-left transition-all ${
            themeMode === 'dark'
              ? 'bg-slate-900/90 border-emerald-900/60 text-slate-100'
              : 'bg-white/95 border-emerald-200/80 text-slate-900'
          }`}>
            <div className={`flex items-center justify-between border-b pb-4 mb-6 flex-wrap gap-3 ${
              themeMode === 'dark' ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div className="flex items-center gap-3 bg-transparent">
                <Logo size="md" variant={themeMode === 'dark' ? 'light' : 'dark'} />
              </div>
              <span className={`text-xs font-black px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                themeMode === 'dark'
                  ? 'bg-emerald-950/80 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Official Company Contact Details
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Phone / WhatsApp */}
              <div className="space-y-1.5 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950">Mobile & WhatsApp</span>
                </div>
                <a 
                  href="tel:+917997679777"
                  className="text-sm font-black text-slate-900 hover:text-emerald-700 transition-colors block"
                >
                  +91 7997679777
                </a>
                <a 
                  href="https://wa.me/917997679777" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 hover:underline"
                >
                  <span>💬 Chat on WhatsApp</span>
                </a>
              </div>

              {/* Address */}
              <div className="space-y-1.5 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-2 text-emerald-800">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950">Company Address</span>
                </div>
                <p className="text-xs font-bold text-slate-800 leading-snug">
                  Nexvarya Technologies, Rajahmundry, AP - 534313
                </p>
                <span className="text-[10px] text-slate-500 font-semibold block">Andhra Pradesh, India</span>
              </div>

              {/* Email */}
              <div className="space-y-1.5 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950">Email Address</span>
                </div>
                <a 
                  href="mailto:contact@nexvarya.com"
                  className="text-xs font-black text-slate-900 hover:text-emerald-700 transition-colors block truncate"
                >
                  contact@nexvarya.com
                </a>
                <span className="text-[10px] text-slate-500 font-semibold block">Quick Response Support</span>
              </div>

              {/* Operating Hours */}
              <div className="space-y-1.5 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-colors">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950">Business Hours</span>
                </div>
                <p className="text-xs font-black text-slate-900">
                  Mon - Sat: 9:00 AM - 8:00 PM
                </p>
                <span className="text-[10px] text-slate-500 font-semibold block">24/7 Platform Availability</span>
              </div>

            </div>
          </div>

          {/* Search Box Component */}
          <div className="max-w-3xl mx-auto pt-2">
            <div className="bg-white p-2.5 rounded-2xl border border-emerald-200 shadow-xl flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search services, products, shops, or company offerings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setActivePage('businesses');
                  }}
                  className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs rounded-xl pl-10 pr-4 py-3.5 border border-slate-200 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <button
                onClick={() => setActivePage('businesses')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>Search Directory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-2 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-600" />
              <span>Verified Local Registered Businesses</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-500" />
              <span>Tiered Bulk Quantity Savings</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Verified Enterprise Security</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: WHAT BUSINESSES CAN USE NEXVARYA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-black uppercase tracking-widest text-emerald-700">
            Platform Capability
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            What Businesses Can Use Nexvarya?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Nexvarya supports all local business categories with custom measurement units and automated management workflows.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 hover:border-emerald-300 p-5 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              🛒
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">Grocery</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Manage products, stock status & kg/liter pricing.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-amber-300 p-5 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              👕
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">Clothing</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Apparel catalog, size/piece pricing & live orders.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-amber-300 p-5 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-amber-100/60 text-amber-800 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              🔧
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">Hardware</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Tools, equipment inventory & bulk volume discounts.
            </p>
          </div>

          <div className="bg-white border border-slate-200 hover:border-teal-300 p-5 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-2 group">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              📱
            </div>
            <h4 className="font-extrabold text-sm text-slate-900">Electronics</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Digital product catalog, warranties & customer orders.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: NEXVARYA SERVICES GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-black uppercase tracking-widest text-amber-600">
            Core Features
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ⚡ Nexvarya Platform Services
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            Everything business owners and customers need to connect, transact, and grow locally.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-base">
              📦
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Product Management</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Add, edit, and categorize items with custom units & stock levels.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-base">
              💰
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Smart Bulk Pricing</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Set automated volume discount tiers for 10+ or 25+ quantity orders.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-base">
              📊
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Sales Analytics</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Filter sales performance by Today, 7 Days, 30 Days, or Monthly.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-base">
              📋
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Inventory Management</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Automated low-stock alerts when inventory reaches thresholds.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-base">
              🛍️
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Online Orders Queue</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Receive, accept, prepare, and complete customer orders in real-time.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-base">
              📱
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Digital Store & QR Poster</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Printable A4 in-store posters with scannable WhatsApp order QR code.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-base">
              📈
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Business Reports</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Track top-moving products, total discounts given & revenue.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs hover:border-emerald-400 transition-all space-y-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-base">
              🔔
            </div>
            <h4 className="font-extrabold text-xs text-slate-900">Order Notifications</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Instant customer status badges from pending to completed.
            </p>
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
                <span>About Nexvarya Technologies</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Pioneering Next-Generation Multi-Tenant Commerce Technology
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Headquartered in Rajahmundry, Andhra Pradesh, <strong>Nexvarya Technologies</strong> builds enterprise software platforms connecting local merchants, service providers, and regional buyers under one unified digital ecosystem.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 border border-indigo-200 text-slate-900 p-6 rounded-2xl shadow-sm space-y-3 shrink-0 max-w-xs w-full">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Company Credential</span>
              </div>
              <h3 className="font-black text-base text-slate-900">Nexvarya Technologies</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-normal">
                Dedicated IT & software engineering partner empowering Andhra Pradesh businesses with robust web and mobile applications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Multi-Tenant Store Directory</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Single digital portal empowering local shop owners—Grocery, Medical, Electronics, Restaurants, Hardware, and Services—to run online catalogs effortlessly.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Automated Bulk Pricing Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advanced calculation engine offering dynamic discounts for bulk units (KG, Liter, Box, Meter, Service), delivering transparent instant wholesale pricing.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 hover:border-indigo-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Custom Software Development</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engineering bespoke software solutions, Web applications, WhatsApp business automation, and enterprise databases tailored to your business needs.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: SERVICES WE PROVIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Services We Provide
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Nexvarya Technologies delivers end-to-end digital services for consumers, small shop owners, and enterprise clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Service 1 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Store className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                Service #1
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">Multi-Business Directory Onboarding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We digitize local brick-and-mortar stores in Rajahmundry. Register your shop, upload products, set business hours, toggle store Open/Closed status, and publish online immediately.
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Store profile & category listing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Live Open/Closed status toggle</span>
              </li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Tag className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Service #2
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">Tiered Bulk Quantity Pricing Engine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated quantity pricing tiers for products sold in KG, Liter, Box, Service, Unit, or Meter. Customers get transparent unit discounts when purchasing in larger volumes.
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Fixed price & percentage discount tiers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant cart savings breakdown</span>
              </li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <Smartphone className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                Service #3
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">Direct WhatsApp Ordering & QR Posters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero-commission direct order system delivering order details straight to WhatsApp (+91 7997679777), plus high-resolution store counter QR poster printing.
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct WhatsApp click-to-order link</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Printable store QR counter posters</span>
              </li>
            </ul>
          </div>

          {/* Service 4 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
              <Cpu className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
                Service #4
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">Custom Web & Mobile Development</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full-stack web application development, Android/iOS mobile software, custom e-commerce engines, and API backend integration engineered by Nexvarya Technologies.
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>React, TypeScript & Vite development</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Custom SaaS & business web tools</span>
              </li>
            </ul>
          </div>

          {/* Service 5 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
              <Users className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                Service #5
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">B2B & B2C Local Marketplace</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hyperlocal connectivity bringing together buyers, wholesale purchasers, local residents, and verified business sellers in Rajahmundry & neighboring districts.
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verified business profiles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct customer inquiries & contact</span>
              </li>
            </ul>
          </div>

          {/* Service 6 */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
              <Shield className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                Service #6
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg">Multi-Language Accessibility (EN/TE)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full dual-language translation architecture supporting English 🇬🇧 and Telugu 🇮🇳 across shop catalogs, checkout, and admin controls.
              </p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>English & Telugu interface toggle</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Regional merchant accessibility</span>
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
                <span>Get In Touch Directly</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                Want to List Your Shop or Request Software Development?
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                Contact <strong>Nexvarya Technologies</strong> today. Our team is ready to assist you with store onboarding, software customization, and business growth.
              </p>

              <div className="space-y-4 pt-2">
                
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="p-3 rounded-xl bg-indigo-600 text-white font-bold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-200">Mobile & WhatsApp</span>
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
                    <span className="text-[10px] uppercase font-bold text-indigo-200">Headquarters Address</span>
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
                  <span>Fill Inquiry Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-300" />
                <span>Quick Inquiry to Nexvarya</span>
              </h3>
              <p className="text-xs text-slate-200">
                Send a direct message to our support team and we will call or WhatsApp you back within 1 business hour.
              </p>

              <div className="space-y-3 pt-2">
                <input
                  id="inquiry-name"
                  type="text"
                  placeholder="Your Name / Business Name"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-300 focus:outline-none focus:border-indigo-400"
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-300 focus:outline-none focus:border-indigo-400"
                />
                <textarea
                  rows={3}
                  placeholder="How can Nexvarya Technologies help you?"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-300 focus:outline-none focus:border-indigo-400"
                ></textarea>
                <button
                  onClick={() => alert("Thank you! Nexvarya Technologies will call/WhatsApp +91 7997679777 shortly.")}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  Send Direct Inquiry
                </button>
              </div>
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
            <p className="text-xs text-slate-500 mt-1">
              Select a business category to browse local shops, services, and products
            </p>
          </div>
          <button
            onClick={() => { setSelectedCategory('all'); setActivePage('businesses'); }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All Categories</span>
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
