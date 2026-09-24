import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, Phone, Clock, 
  Tag, ShoppingBag, Plus, Minus, Check, ArrowLeft,
  MessageCircle 
} from 'lucide-react';

export const ShopDetail: React.FC = () => {
  const { 
    selectedShopId, shops, products, categories, t, 
    calculateBulkUnitPrice, addToCart, setActivePage 
  } = useApp();

  const shop = shops.find(s => s.id === selectedShopId) || (selectedShopId ? undefined : shops[0]);
  const shopProducts = shop ? products.filter(p => p.shopId === shop.id) : [];
  const category = shop ? categories.find(c => c.id === shop.categoryId) : undefined;

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  if (!shop) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">Business Not Found</h2>
        <p className="text-xs text-slate-400">The business you are trying to view is not available or has been updated.</p>
        <button
          onClick={() => setActivePage('businesses')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-md"
        >
          Browse Verified Businesses
        </button>
      </div>
    );
  }

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const setQuantity = (productId: string, val: number) => {
    if (val < 1) return;
    setQuantities(prev => ({ ...prev, [productId]: val }));
  };

  const handleAddToCart = (product: any) => {
    const qty = getQuantity(product.id);
    addToCart(product, shop, qty);
    setAddedSuccessId(product.id);
    setTimeout(() => setAddedSuccessId(null), 2000);
  };

  const handleDirectWhatsApp = (product: any) => {
    if (!shop.whatsappNumber) return;
    const qty = getQuantity(product.id);
    const { effectivePrice } = calculateBulkUnitPrice(product, qty);
    const total = effectivePrice * qty;

    const text = `Hi ${shop.businessName}, I would like to order:\n\n*Product:* ${product.name}\n*Quantity:* ${qty} ${product.sellingType.toUpperCase()}\n*Rate:* ₹${effectivePrice}/${product.sellingType.toUpperCase()}\n*Total Amount:* ₹${total}`;
    const url = `https://wa.me/${shop.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 min-h-screen">
      
      {/* Back Button */}
      <button
        onClick={() => setActivePage('businesses')}
        className="flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Businesses Directory</span>
      </button>

      {/* Shop Profile Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-amber-300 border border-emerald-400/40 flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg shrink-0 font-serif">
              {shop.businessName.charAt(0)}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
                  {shop.businessName}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  shop.isOpen ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60' : 'bg-rose-950/90 text-rose-300 border-rose-700/60'
                }`}>
                  {shop.isOpen ? t('openNow') : t('closedNow')}
                </span>
              </div>

              <span className="inline-block text-xs font-bold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-lg border border-amber-700/50">
                {category?.name || 'Business'}
              </span>

              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {shop.description}
              </p>
            </div>
          </div>

          {/* Quick Contact & Action Card */}
          <div className="bg-slate-950/90 border border-emerald-900/40 p-4 rounded-2xl space-y-2 text-xs text-slate-300 min-w-[240px] shadow-xl">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{shop.address}, {shop.pincode}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>📞 {shop.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>🕒 {shop.openingTime} - {shop.closingTime}</span>
            </div>
            
            {shop.whatsappNumber && (
              <a
                href={`https://wa.me/${shop.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow-md shadow-emerald-950/50"
              >
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>Chat on WhatsApp</span>
              </a>
            )}
          </div>

        </div>
      </div>

      {/* Catalog Title */}
      <div className="border-b border-emerald-900/50 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight font-serif flex items-center gap-2">
            <span>{t('productsAndServices')}</span>
            <span className="text-xs font-sans text-amber-400 font-bold bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/60">
              {shopProducts.length} items
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Select items and configure quantities to unlock automatic bulk savings
          </p>
        </div>
      </div>

      {/* Product Catalog Grid */}
      {shopProducts.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <p className="text-sm font-medium">No items currently listed for this business.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shopProducts.map((product) => {
            const qty = getQuantity(product.id);
            const { effectivePrice, savingsPerUnit } = calculateBulkUnitPrice(product, qty);
            const totalPrice = effectivePrice * qty;

            return (
              <div 
                key={product.id}
                className="bg-slate-900/90 border border-emerald-900/40 hover:border-emerald-500/60 rounded-2xl p-6 shadow-2xl flex flex-col justify-between space-y-4 transition-all backdrop-blur-md"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-white text-base font-serif">{product.name}</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{product.description}</p>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                      product.stockStatus === 'in_stock' ? 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60' : 'bg-rose-950/90 text-rose-300 border-rose-700/60'
                    }`}>
                      {product.stockStatus === 'in_stock' ? t('available') : t('outOfStock')}
                    </span>
                  </div>

                  {/* Pricing Info */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-amber-400">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      / {t(`unit_${product.sellingType}`)}
                    </span>
                  </div>

                  {/* Bulk Discount Tiers Box */}
                  {product.enableBulkDiscount && product.bulkDiscounts.length > 0 && (
                    <div className="bg-emerald-950/60 border border-emerald-800/50 rounded-xl p-3 space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                        <Tag className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t('bulkPricingAvailable')}</span>
                      </div>

                      <div className="space-y-1">
                        {product.bulkDiscounts.map((tier) => (
                          <div 
                            key={tier.id}
                            className={`flex justify-between items-center px-2.5 py-1 rounded text-[11px] ${
                              qty >= tier.minQty && (tier.maxQty === null || qty <= tier.maxQty)
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold shadow-sm'
                                : 'text-slate-300 bg-slate-950/60 border border-slate-800'
                            }`}
                          >
                            <span>
                              {tier.minQty}{tier.maxQty ? ` – ${tier.maxQty}` : '+'} {t(`unit_${product.sellingType}`)}
                            </span>
                            <span>
                              {tier.discountType === 'fixed_price' 
                                ? `₹${tier.discountValue}/${t(`unit_${product.sellingType}`)}`
                                : `${tier.discountValue}% OFF`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Quantity Selector & Cart Actions */}
                <div className="pt-3 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Configure Quantity:</span>
                    
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1">
                      <button
                        onClick={() => setQuantity(product.id, qty - 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-amber-400 text-xs min-w-[30px] text-center">
                        {qty} {t(`unit_${product.sellingType}`)}
                      </span>
                      <button
                        onClick={() => setQuantity(product.id, qty + 1)}
                        className="text-slate-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Calculated Price & Savings Banner */}
                  <div className="bg-slate-950 p-3 rounded-xl flex items-center justify-between text-xs border border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Calculated Total</span>
                      <span className="text-lg font-black text-amber-400">
                        ₹{totalPrice.toFixed(0)}
                      </span>
                    </div>

                    {savingsPerUnit > 0 && (
                      <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 px-2.5 py-1 rounded-lg font-bold text-[11px]">
                        Saved ₹{(savingsPerUnit * qty).toFixed(0)}!
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stockStatus === 'out_of_stock'}
                      className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                        addedSuccessId === product.id
                          ? 'bg-emerald-600 text-white'
                          : product.stockStatus === 'out_of_stock'
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-emerald-950/60'
                      }`}
                    >
                      {addedSuccessId === product.id ? (
                        <>
                          <Check className="w-4 h-4 text-amber-300" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-amber-300" />
                          <span>{t('addToCart')}</span>
                        </>
                      )}
                    </button>

                    {shop.whatsappNumber && (
                      <button
                        onClick={() => handleDirectWhatsApp(product)}
                        className="py-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-900/80 text-amber-300 border border-amber-700/60 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>WhatsApp</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
