import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Tag, ShoppingBag, Store, ArrowRight, Check } from 'lucide-react';

export const ServicesProducts: React.FC = () => {
  const { 
    products, shops, categories, t, language,
    selectedCategory, setSelectedCategory,
    searchQuery, setSearchQuery,
    addToCart, setSelectedShopId, setActivePage 
  } = useApp();

  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  const filteredProducts = products.filter(product => {
    const shop = shops.find(s => s.id === product.shopId);
    if (!shop || shop.status !== 'approved') return false;

    if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchShop = shop.businessName.toLowerCase().includes(q);
      return matchName || matchDesc || matchShop;
    }

    return true;
  });

  const handleAddToCart = (product: any) => {
    const shop = shops.find(s => s.id === product.shopId);
    if (shop) {
      addToCart(product, shop, 1);
      setAddedSuccessId(product.id);
      setTimeout(() => setAddedSuccessId(null), 2000);
    }
  };

  const handleGoToShop = (shopId: string) => {
    setSelectedShopId(shopId);
    setActivePage('shop-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-screen">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/50 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            {t('servicesProducts')}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse items, products, and services listed across all local businesses
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={t('searchProducts')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xl"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-950/60 font-bold'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          {t('allCategories')} ({products.length})
        </button>

        {categories.map((cat) => {
          const count = products.filter(p => p.categoryId === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-950/60 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{language === 'te' ? cat.nameTe : cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                selectedCategory === cat.id ? 'bg-emerald-950 text-amber-300' : 'bg-slate-950 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 shadow-xl">
          <Tag className="w-12 h-12 text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-300">No items found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const shop = shops.find(s => s.id === product.shopId);

            return (
              <div
                key={product.id}
                className="bg-slate-900/90 border border-emerald-900/40 hover:border-emerald-500/60 rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4 transition-all group backdrop-blur-md"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors font-serif">
                        {product.name}
                      </h3>
                      {shop && (
                        <button
                          onClick={() => handleGoToShop(shop.id)}
                          className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 mt-0.5"
                        >
                          <Store className="w-3 h-3 text-amber-400" />
                          <span>{shop.businessName}</span>
                        </button>
                      )}
                    </div>

                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-950 text-slate-300 border border-slate-800">
                      {t(`unit_${product.sellingType}`)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-xl font-black text-amber-400">₹{product.price}</span>
                    <span className="text-xs text-slate-400">/ {t(`unit_${product.sellingType}`)}</span>
                  </div>

                  {product.enableBulkDiscount && (
                    <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span>Bulk Order Discounts Available</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  {shop && (
                    <button
                      onClick={() => handleGoToShop(shop.id)}
                      className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>View Shop</span>
                      <ArrowRight className="w-3 h-3 text-amber-400" />
                    </button>
                  )}

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                      addedSuccessId === product.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-emerald-950/60'
                    }`}
                  >
                    {addedSuccessId === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-amber-300" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                        <span>{t('addToCart')}</span>
                      </>
                    )}
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
