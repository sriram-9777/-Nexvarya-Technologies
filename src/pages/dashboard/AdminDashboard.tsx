import React, { useState } from 'react';
import { useApp } from '../../context/useApp';
import { Shield, Store, Users, CheckCircle, Ban, Grid, Sparkles } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    themeMode, users, shops, products, categories, updateShopStatus, 
    updateUserStatus, addCategory, t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'shops' | 'categories' | 'users'>('shops');
  
  const [catName, setCatName] = useState('');
  const [catNameTe, setCatNameTe] = useState('');
  const [catDesc, setCatDesc] = useState('');

  const pendingShopsCount = shops.filter(s => s.status === 'pending').length;

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    addCategory({
      name: catName,
      nameTe: catNameTe || catName,
      icon: 'Grid',
      status: 'active',
      description: catDesc
    });
    setCatName('');
    setCatNameTe('');
    setCatDesc('');
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-screen transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Header Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 shadow-2xl border text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md ${
        themeMode === 'dark'
          ? 'theme-inverse bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border-emerald-800/40'
          : 'bg-gradient-to-r from-emerald-800 via-slate-800 to-amber-800 border-emerald-600'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>{t("Nexvarya Platform Administration")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-heading">
            {t('adminDashboard')}
          </h1>
          <p className="text-xs text-slate-300">{t("Manage business approvals, platform categories, registered users, and system rules")}</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 border border-amber-500/40 backdrop-blur-md px-4 py-2.5 rounded-xl text-amber-300 text-xs font-bold shadow-md relative z-10">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{pendingShopsCount}{t("Pending Approvals")}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-emerald-900/40 p-4 rounded-2xl space-y-1 shadow-2xl backdrop-blur-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t('totalUsers')}</span>
          <span className="text-2xl font-black text-white font-heading">{users.length}</span>
        </div>

        <div className="bg-slate-900/90 border border-emerald-900/40 p-4 rounded-2xl space-y-1 shadow-2xl backdrop-blur-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t('totalShops')}</span>
          <span className="text-2xl font-black text-emerald-400 font-heading">{shops.length}</span>
        </div>

        <div className="bg-slate-900/90 border border-emerald-900/40 p-4 rounded-2xl space-y-1 shadow-2xl backdrop-blur-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t('totalProducts')}</span>
          <span className="text-2xl font-black text-amber-400 font-heading">{products.length}</span>
        </div>

        <div className="bg-slate-900/90 border border-emerald-900/40 p-4 rounded-2xl space-y-1 shadow-2xl backdrop-blur-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t("Categories")}</span>
          <span className="text-2xl font-black text-teal-400 font-heading">{categories.length}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-emerald-900/50 flex items-center gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('shops')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'shops'
              ? 'border-amber-400 text-amber-400 font-black'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>{t('shopApprovals')} ({shops.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'border-amber-400 text-amber-400 font-black'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>{t('manageCategories')} ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'users'
              ? 'border-amber-400 text-amber-400 font-black'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t('manageUsers')} ({users.length})</span>
        </button>
      </div>

      {/* TAB 1: Shop Approvals */}
      {activeTab === 'shops' && (
        <div className="space-y-4">
          <h2 className="text-base font-black text-white font-heading">{t("Shops Overview & Verification Queue")}</h2>
          
          <div className="space-y-3">
            {shops.map((shop) => (
              <div 
                key={shop.id}
                className="bg-slate-900/90 border border-emerald-900/40 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl backdrop-blur-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-bold text-white text-base font-heading">{shop.businessName}</h3>
                    <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold border ${
                      shop.status === 'approved'
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60'
                        : shop.status === 'pending'
                        ? 'bg-amber-950/90 text-amber-300 border-amber-700/60'
                        : 'bg-rose-950/90 text-rose-300 border-rose-700/60'
                    }`}>
                      {shop.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">📍 {shop.address}, PIN: {shop.pincode} | Phone: {shop.phone}</p>
                  <p className="text-[11px] text-slate-400">GST: {shop.gstNumber || 'N/A'} | Email: {shop.email}</p>
                </div>

                <div className="flex items-center gap-2">
                  {shop.status !== 'approved' && (
                    <button
                      onClick={() => updateShopStatus(shop.id, 'approved')}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-emerald-950/50 flex items-center gap-1.5 transition-all"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-amber-300" />
                      <span>{t("Approve Shop")}</span>
                    </button>
                  )}

                  {shop.status !== 'blocked' ? (
                    <button
                      onClick={() => updateShopStatus(shop.id, 'blocked')}
                      className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-rose-950/80 text-rose-300 text-xs font-semibold flex items-center gap-1 border border-slate-800 transition-all"
                    >
                      <Ban className="w-3.5 h-3.5 text-rose-400" />
                      <span>{t("Block")}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => updateShopStatus(shop.id, 'approved')}
                      className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-emerald-950/80 text-emerald-300 text-xs font-semibold border border-slate-800 transition-all"
                    >{t("Unblock")}</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Categories Management */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-900/90 border border-emerald-900/40 p-6 rounded-2xl space-y-4 md:col-span-1 shadow-2xl backdrop-blur-md">
            <h3 className="font-bold text-white text-sm font-heading">{t("Add New Business Category")}</h3>
            <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t("Category Name (English)")}</label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Pet Store"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t("Category Name (Telugu / తెలుగు)")}</label>
                <input
                  type="text"
                  value={catNameTe}
                  onChange={(e) => setCatNameTe(e.target.value)}
                  placeholder="e.g. పెంపుడు జంతువుల షాప్"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">{t("Description")}</label>
                <input
                  type="text"
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  placeholder="Brief description"
                  className="w-full bg-slate-950 text-white placeholder-slate-500 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-950/50 transition-all"
              >{t("+ Add Category")}</button>
            </form>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="font-bold text-white text-sm font-heading">{t("Active Categories")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((c) => (
                <div key={c.id} className="bg-slate-900/90 border border-emerald-900/40 p-4 rounded-xl space-y-1 shadow-2xl backdrop-blur-md">
                  <h4 className="font-bold text-white text-sm font-heading">{c.name} ({c.nameTe})</h4>
                  <p className="text-xs text-slate-400">{c.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: Users Management */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white font-heading">{t("Registered Users (")}{users.length})</h2>
          <div className="bg-slate-900/90 border border-emerald-900/40 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-amber-400 uppercase text-[10px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">{t("Name")}</th>
                    <th className="px-4 py-3">{t("Email & Mobile")}</th>
                    <th className="px-4 py-3">{t("Role")}</th>
                    <th className="px-4 py-3">{t("Status")}</th>
                    <th className="px-4 py-3 text-right">{t("Action")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-950/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">{u.name}</td>
                      <td className="px-4 py-3 text-slate-400">{u.email}<br/>{u.mobile}</td>
                      <td className="px-4 py-3 uppercase font-bold text-emerald-400">{u.role}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                          u.status === 'active' ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60' : 'bg-rose-950/90 text-rose-300 border-rose-700/60'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => updateUserStatus(u.id, u.status === 'active' ? 'blocked' : 'active')}
                            className="text-amber-400 hover:text-amber-300 font-bold"
                          >
                            {u.status === 'active' ? 'Block' : 'Unblock'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
