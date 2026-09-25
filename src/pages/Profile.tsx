import React, { useState } from 'react';
import { useApp } from '../context/useApp';
import { LanguageCode } from '../types';
import { User, Mail, Phone, MapPin, Store, CheckCircle, Save, Globe, Shield, Clock } from 'lucide-react';

export const Profile: React.FC = () => {
  const { currentUser, updateUser, myShop, updateShop, categories, language, setLanguage, t, setActivePage } = useApp();

  // Form states for Personal Info
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [mobile, setMobile] = useState(currentUser?.mobile || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [villageTownCity, setVillageTownCity] = useState(currentUser?.villageTownCity || '');
  const [pincode, setPincode] = useState(currentUser?.pincode || '');
  const [state, setState] = useState(currentUser?.state || 'Andhra Pradesh');
  const [country, setCountry] = useState(currentUser?.country || 'India');
  const [prefLang, setPrefLang] = useState<LanguageCode>(currentUser?.language || 'en');

  // Form states for Shop Info (if shop owner)
  const [shopName, setShopName] = useState(myShop?.businessName || '');
  const [categoryId, setCategoryId] = useState(myShop?.categoryId || 'cat_grocery');
  const [shopAddress, setShopAddress] = useState(myShop?.address || '');
  const [openingTime, setOpeningTime] = useState(myShop?.openingTime || '08:00 AM');
  const [closingTime, setClosingTime] = useState(myShop?.closingTime || '09:00 PM');
  const [whatsappNumber, setWhatsappNumber] = useState(myShop?.whatsappNumber || '');
  const [gstNumber, setGstNumber] = useState(myShop?.gstNumber || '');
  const [description, setDescription] = useState(myShop?.description || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 text-center p-8 bg-white rounded-3xl shadow-xl border border-slate-200">
        <User className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">{t("Please Sign In")}</h2>
        <p className="text-xs text-slate-500 mb-4">{t("You need to log in to view and edit your profile.")}</p>
        <button
          onClick={() => setActivePage('login')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
        >{t("Go to Login")}</button>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Update User Profile
    updateUser(currentUser.id, {
      name,
      email,
      mobile,
      address,
      villageTownCity,
      pincode,
      state,
      country,
      language: prefLang
    });

    if (prefLang !== language) {
      setLanguage(prefLang);
    }

    // 2. Update Shop Profile if Shop Owner
    if (currentUser.role === 'shop_owner' && myShop) {
      updateShop(myShop.id, {
        businessName: shopName,
        categoryId,
        address: shopAddress || address,
        openingTime,
        closingTime,
        whatsappNumber: whatsappNumber || mobile,
        gstNumber,
        description
      });
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const getRoleBadge = () => {
    switch (currentUser.role) {
      case 'admin':
        return <span className="px-3.5 py-1 rounded-full bg-purple-950/90 text-purple-300 text-xs font-bold border border-purple-700/60 flex items-center gap-1.5 shadow-sm"><Shield className="w-3.5 h-3.5 text-purple-400" />{t("Administrator")}</span>;
      case 'shop_owner':
        return <span className="px-3.5 py-1 rounded-full bg-amber-950/90 text-amber-300 text-xs font-bold border border-amber-700/60 flex items-center gap-1.5 shadow-sm"><Store className="w-3.5 h-3.5 text-amber-400" />{t("Shop Owner")}</span>;
      default:
        return <span className="px-3.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-xs font-bold border border-emerald-700/60 flex items-center gap-1.5 shadow-sm"><User className="w-3.5 h-3.5 text-emerald-400" />{t("Customer")}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 min-h-screen">
      
      {/* Header Banner */}
      <div className="theme-inverse bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-emerald-800/40 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 border border-emerald-400/40 flex items-center justify-center text-2xl font-black text-amber-300 uppercase shadow-lg shrink-0 font-heading">
          {currentUser.name ? currentUser.name.slice(0, 2) : 'US'}
        </div>
        <div className="text-center sm:text-left space-y-2 flex-1 relative z-10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-heading">{currentUser.name}</h1>
            {getRoleBadge()}
          </div>
          <p className="text-xs text-slate-300 flex flex-wrap justify-center sm:justify-start items-center gap-4 font-mono">
            <span className="flex items-center gap-1.5 text-slate-300"><Mail className="w-3.5 h-3.5 text-amber-400" /> {currentUser.email}</span>
            <span className="flex items-center gap-1.5 text-slate-300"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {currentUser.mobile}</span>
          </p>
          <p className="text-[11px] text-amber-400/90 font-medium">
            📍 {currentUser.villageTownCity}, {currentUser.state} - PIN: {currentUser.pincode}
          </p>
        </div>
      </div>

      {/* Success Notification Banner */}
      {savedSuccess && (
        <div className="bg-emerald-950/90 border border-emerald-500/50 p-4 rounded-2xl text-emerald-200 text-xs font-bold flex items-center gap-3 animate-in fade-in shadow-xl backdrop-blur-md">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{t("Your profile details have been saved and updated successfully!")}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Personal Profile Details */}
        <div className="bg-slate-900/90 border border-emerald-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 backdrop-blur-md">
          <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-emerald-900/50 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            <span>{t("1. Personal & Contact Information")}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("Full Name *")}</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("Mobile Number *")}</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("Email Address *")}</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("Preferred Platform Language")}</label>
              <div className="relative">
                <select
                  value={prefLang}
                  onChange={(e) => setPrefLang(e.target.value as LanguageCode)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="en">🇬🇧 English</option>
                  <option value="te">🇮🇳 తెలుగు (Telugu)</option>
                </select>
                <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300">{t("Door No / Street Address *")}</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Door No, Street Name, Landmark"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("Village / Town / City *")}</label>
              <input
                type="text"
                required
                value={villageTownCity}
                onChange={(e) => setVillageTownCity(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("Postal Pincode *")}</label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("State")}</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">{t("Country")}</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Business & Shop Details (For Shop Owners) */}
        {currentUser.role === 'shop_owner' && (
          <div className="bg-slate-900/90 border border-emerald-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 backdrop-blur-md">
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-emerald-900/50 pb-3 flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-400" />
              <span>{t("2. Shop & Business Details")}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("Shop Business Name *")}</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("Business Category *")}</label>
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
                <label className="text-xs font-semibold text-slate-300">{t("Shop Business Address *")}</label>
                <input
                  type="text"
                  required
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("Opening Time")}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={openingTime}
                    onChange={(e) => setOpeningTime(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("Closing Time")}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={closingTime}
                    onChange={(e) => setClosingTime(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("Direct WhatsApp Order Number")}</label>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">{t("GST Number")}</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="37AAAAA0000A1Z5"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">{t("Shop Description")}</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 text-white text-xs rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActivePage(currentUser.role === 'admin' ? 'admin-dashboard' : currentUser.role === 'shop_owner' ? 'shop-dashboard' : 'customer-dashboard')}
            className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs shadow-sm transition-all"
          >{t("Cancel")}</button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 flex items-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>{t("Save Profile Changes")}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
