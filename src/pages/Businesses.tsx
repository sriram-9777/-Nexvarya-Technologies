import React from 'react';
import { useApp } from '../context/useApp';
import { Store, Search, MapPin, Star, ArrowRight } from 'lucide-react';

export const Businesses: React.FC = () => {
  const { 
    themeMode, shops, categories, products, t, language,
    selectedCategory, setSelectedCategory,
    searchQuery, setSearchQuery,
    setSelectedShopId, setActivePage 
  } = useApp();

  const handleShopClick = (shopId: string) => {
    setSelectedShopId(shopId);
    setActivePage('shop-detail');
  };

  const filteredShops = shops.filter(shop => {
    if (shop.status !== 'approved') return false;

    if (selectedCategory !== 'all' && shop.categoryId !== selectedCategory && !products.some(p => p.shopId === shop.id && p.categoryId === selectedCategory && p.isAvailable && p.productStatus !== 'disabled')) {
      return false;
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      const matchName = shop.businessName.toLowerCase().includes(q);
      const matchAddress = shop.address.toLowerCase().includes(q);
      const matchPincode = shop.pincode.includes(q);
      const matchDesc = shop.description.toLowerCase().includes(q);
      const matchProduct = products.some(p => p.shopId === shop.id && p.isAvailable && p.productStatus !== 'disabled' && `${p.name} ${p.description}`.toLowerCase().includes(q));
      return matchName || matchAddress || matchPincode || matchDesc || matchProduct;
    }

    return true;
  });

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Page Title & Search Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
        themeMode === 'dark' ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {t('businesses')}
          </h1>
          <p className={`text-xs mt-1 ${
            themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>{t("Discover verified local shops, stores, and services in your town or area")}</p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full text-xs rounded-xl pl-9 pr-4 py-2.5 border transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
              themeMode === 'dark'
                ? 'bg-slate-900 text-slate-100 placeholder-slate-400 border-emerald-900/60 focus:border-emerald-500'
                : 'bg-white text-slate-900 placeholder-slate-400 border-emerald-200 focus:border-emerald-600 shadow-xs'
            }`}
          />
          <Search className="w-4 h-4 text-emerald-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs font-bold'
              : themeMode === 'dark'
                ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
          }`}
        >
          {t('allCategories')} ({shops.filter(s => s.status === 'approved').length})
        </button>

        {categories.map((cat) => {
          const count = shops.filter(s => s.status === 'approved' && (s.categoryId === cat.id || products.some(p => p.shopId === s.id && p.categoryId === cat.id && p.isAvailable && p.productStatus !== 'disabled'))).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs font-bold'
                  : themeMode === 'dark'
                    ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              <span>{language === 'te' ? cat.nameTe : cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                themeMode === 'dark' ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-100 text-emerald-800'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Shops Grid */}
      {filteredShops.length === 0 ? (
        <div className={`border rounded-2xl p-12 text-center space-y-3 shadow-xs ${
          themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <Store className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className={`text-base font-bold ${themeMode === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>{t("No businesses found")}</h3>
          <p className="text-xs max-w-sm mx-auto">{t("Try adjusting your search terms or clearing category filters to explore more local shops.")}</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border ${
              themeMode === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-emerald-900/60'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
            }`}
          >{t("Reset Filters")}</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => {
            const cat = categories.find(c => c.id === shop.categoryId);
            const itemsCount = products.filter(p => p.shopId === shop.id).length;

            return (
              <div
                key={shop.id}
                className={`border rounded-2xl overflow-hidden shadow-xs hover:shadow-lg flex flex-col group transition-all ${
                  themeMode === 'dark'
                    ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/60 text-slate-100'
                    : 'bg-white border-slate-200 hover:border-emerald-400 text-slate-900'
                }`}
              >
                <div className="p-5 pb-4 flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white font-black text-xl flex items-center justify-center shadow-sm">
                        {shop.businessName.charAt(0)}
                      </div>
                      <div>
                        <h3 className={`font-bold text-base transition-colors ${
                          themeMode === 'dark' ? 'text-slate-100 group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-700'
                        }`}>
                          {shop.businessName}
                        </h3>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                          themeMode === 'dark'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-900/60'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {cat ? (language === 'te' ? cat.nameTe : cat.name) : 'Business'}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      shop.isOpen 
                        ? themeMode === 'dark' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : themeMode === 'dark' ? 'bg-rose-950 text-rose-400 border-rose-800' : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {shop.isOpen ? t('openNow') : t('closedNow')}
                    </span>
                  </div>

                  <p className={`text-xs line-clamp-2 leading-relaxed ${
                    themeMode === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {shop.description}
                  </p>

                  <div className={`pt-2 border-t space-y-1.5 text-xs ${
                    themeMode === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="line-clamp-1">{shop.address}, PIN: {shop.pincode}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span>📞 {shop.phone}</span>
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{shop.rating || 5.0} ({shop.reviewCount || 10})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 border-t flex items-center justify-between ${
                  themeMode === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-100'
                }`}>
                  <span className={`text-xs font-medium ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{itemsCount}{t("Products/Services")}</span>
                  <button
                    onClick={() => handleShopClick(shop.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>{t('viewShop')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
