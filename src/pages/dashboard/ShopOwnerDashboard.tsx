import React, { useState } from 'react';
import { useApp } from '../../context/useApp';
import { stockState } from '../../utils/commerce';
import { filterSalesOrders } from '../../utils/reporting';
import { Product, SellingType, BulkDiscountTier, ProductStatus, SalesFilterPeriod } from '../../types';
import { QrPosterModal } from '../../components/QrPosterModal';
import { 
  Store, Plus, Edit, Trash2, QrCode, X,
  ShoppingBag, ToggleLeft, ToggleRight, TrendingUp,
  PackageCheck, AlertTriangle, CheckCircle, Filter, BarChart3, FileText, Settings
} from 'lucide-react';

export const ShopOwnerDashboard: React.FC = () => {
  const { 
    themeMode, myShop, products, addProduct, updateProduct, deleteProduct, 
    orders, updateOrderStatus, toggleShopOpenStatus, t, setActivePage,
    categories, addShop, currentUser, language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inventory' | 'orders' | 'reports'>('overview');
  const [showQrModal, setShowQrModal] = useState(false);
  const [salesPeriod, setSalesPeriod] = useState<SalesFilterPeriod>('today');

  // Quick Shop Creation States
  const [newBizName, setNewBizName] = useState('');
  const [newCatId, setNewCatId] = useState('cat_grocery');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // Product Modal Form States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState<number>(100);
  const [prodImage, setProdImage] = useState('');
  const [sellingType, setSellingType] = useState<SellingType>('kg');
  const [stockQty, setStockQty] = useState<number | undefined>(50);
  const [lowStockLimit, setLowStockLimit] = useState<number>(10);
  const [prodStatus, setProdStatus] = useState<ProductStatus>('active');
  const [enableBulk, setEnableBulk] = useState(true);
  const [bulkTiers, setBulkTiers] = useState<BulkDiscountTier[]>([
    { id: 't1', minQty: 10, maxQty: 24, discountType: 'fixed_price', discountValue: 95 }
  ]);

  const handleQuickCreateShop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName.trim() || !currentUser) return;
    addShop({
      ownerId: currentUser.id,
      businessName: newBizName,
      categoryId: newCatId,
      address: newAddress || 'Main Market Road',
      pincode: '520001',
      state: 'Andhra Pradesh',
      phone: newPhone || currentUser.mobile || '9876543210',
      email: currentUser.email,
      description: `${newBizName} offering quality products on Nexvarya.`,
      openingTime: '08:00 AM',
      closingTime: '09:00 PM',
      rating: 5.0,
      reviewCount: 1
    });
  };

  if (!myShop) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 space-y-6 min-h-screen">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-800 border border-emerald-400/40 rounded-2xl flex items-center justify-center text-amber-300 mx-auto shadow-lg">
            <Store className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-heading">{t("Set Up Your Business Profile")}</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">{t("You are logged in as a Shop Owner. Enter your business details below to open your store on Nexvarya.")}</p>
        </div>

        <form onSubmit={handleQuickCreateShop} className="bg-slate-900/90 border border-emerald-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4 backdrop-blur-md">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">{t("Business / Shop Name *")}</label>
            <input
              type="text"
              required
              placeholder="e.g. Sri Venkateswara Supermarket"
              value={newBizName}
              onChange={(e) => setNewBizName(e.target.value)}
              className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">{t("Category *")}</label>
            <select
              value={newCatId}
              onChange={(e) => setNewCatId(e.target.value)}
              className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              {(categories || []).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">{t("Shop Address")}</label>
            <input
              type="text"
              placeholder="Door No, Street, Landmark"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">{t("Contact Phone Number")}</label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition-all mt-2"
          >{t("Create & Open My Shop")}</button>
        </form>
      </div>
    );
  }

  const shopProducts = products.filter(p => p.shopId === myShop.id);
  const shopOrders = orders.filter(o => o.shopId === myShop.id);

  // Compute Metrics & Analytics
  const reportOrders = filterSalesOrders(shopOrders, salesPeriod);
  const completedOrders = reportOrders.filter(o => o.status === 'completed');
  const totalSales = reportOrders.reduce((sum, o) => sum + (o.status === 'completed' ? o.totalAmount : 0), 0);
  const totalOrdersCount = reportOrders.length;
  const pendingOrdersCount = shopOrders.filter(o => o.status === 'pending').length;
  const activeOrdersCount = shopOrders.filter(o => ['pending', 'accepted', 'processing', 'ready'].includes(o.status)).length;
  const lowStockCount = shopProducts.filter(p => p.stockQuantity !== undefined && p.stockQuantity <= (p.lowStockThreshold ?? 10)).length;

  const openAddModal = () => {
    setEditingProductId(null);
    setProdName('');
    setProdDesc('');
    setProdPrice(100);
    setProdImage('');
    setSellingType('kg');
    setStockQty(50);
    setLowStockLimit(10);
    setProdStatus('active');
    setEnableBulk(true);
    setBulkTiers([
      { id: 't1', minQty: 10, maxQty: 24, discountType: 'fixed_price', discountValue: 95 }
    ]);
    setShowProductModal(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdDesc(p.description);
    setProdPrice(p.price);
    setProdImage(p.image || '');
    setSellingType(p.sellingType);
    setStockQty(p.stockQuantity);
    setLowStockLimit(p.lowStockThreshold ?? 10);
    setProdStatus(p.productStatus || 'active');
    setEnableBulk(p.enableBulkDiscount);
    setBulkTiers(p.bulkDiscounts || []);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !Number.isFinite(prodPrice) || prodPrice < 0 || (stockQty !== undefined && (!Number.isFinite(stockQty) || stockQty < 0)) || lowStockLimit < 0) return;
    if (enableBulk && bulkTiers.some(t => !Number.isFinite(t.minQty) || t.minQty <= 0 ||
      (t.maxQty !== null && t.maxQty < t.minQty) || !Number.isFinite(t.discountValue) || t.discountValue < 0 ||
      (t.discountType === 'percentage' ? t.discountValue > 100 : t.discountValue > prodPrice))) {
      window.alert(t('invalidDiscount')); return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: prodName,
        description: prodDesc,
        price: prodPrice,
        image: prodImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80',
        sellingType,
        stockQuantity: stockQty,
        lowStockThreshold: lowStockLimit,
        productStatus: prodStatus,
        isAvailable: prodStatus === 'active',
        stockStatus: stockQty === undefined ? 'in_stock' : stockQty <= 0 ? 'out_of_stock' : stockQty <= lowStockLimit ? 'limited' : 'in_stock',
        enableBulkDiscount: enableBulk,
        bulkDiscounts: enableBulk ? bulkTiers : []
      });
    } else {
      addProduct({
        shopId: myShop.id,
        categoryId: myShop.categoryId,
        name: prodName,
        description: prodDesc,
        price: prodPrice,
        image: prodImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80',
        sellingType,
        stockQuantity: stockQty,
        lowStockThreshold: lowStockLimit,
        productStatus: prodStatus,
        isAvailable: prodStatus === 'active',
        stockStatus: stockQty === undefined ? 'in_stock' : stockQty <= 0 ? 'out_of_stock' : stockQty <= lowStockLimit ? 'limited' : 'in_stock',
        enableBulkDiscount: enableBulk,
        bulkDiscounts: enableBulk ? bulkTiers : []
      });
    }

    setShowProductModal(false);
  };

  const addTierRow = () => {
    const newTier: BulkDiscountTier = {
      id: 'tier_' + Date.now(),
      minQty: 10,
      maxQty: null,
      discountType: 'fixed_price',
      discountValue: Math.max(1, prodPrice - 5)
    };
    setBulkTiers(prev => [...prev, newTier]);
  };

  const updateTier = (index: number, key: keyof BulkDiscountTier, val: any) => {
    setBulkTiers(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: val };
      return copy;
    });
  };

  const removeTier = (index: number) => {
    setBulkTiers(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* SAAS SIDEBAR NAVIGATION */}
      <aside className={`w-full md:w-64 border-r p-4 space-y-6 shrink-0 transition-colors duration-300 ${
        themeMode === 'dark' ? 'bg-slate-900 border-emerald-900/40' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-amber-300 border border-emerald-400/40 flex items-center justify-center font-black text-xl shadow-lg font-heading">
            {myShop.businessName.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h2 className={`font-extrabold text-sm truncate font-heading ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{myShop.businessName}</h2>
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">{t("Merchant SaaS")}</span>
          </div>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              activeTab === 'overview' 
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md' 
                : themeMode === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>{t("Business Dashboard")}</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              activeTab === 'products' ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-950/60' : 'text-slate-400 hover:text-white hover:bg-slate-950'
            }`}
          >
            <Store className="w-4 h-4 text-emerald-400" />
            <span>{t("Product Catalog (")}{shopProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              activeTab === 'inventory' ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-950/60' : 'text-slate-400 hover:text-white hover:bg-slate-950'
            }`}
          >
            <PackageCheck className="w-4 h-4 text-amber-400" />
            <span>{t("Inventory Stock")}</span>
            {lowStockCount > 0 && (
              <span className="ml-auto bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                {lowStockCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              activeTab === 'orders' ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-950/60' : 'text-slate-400 hover:text-white hover:bg-slate-950'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>{t("Live Order Desk")}</span>
            {pendingOrdersCount > 0 && (
              <span className="ml-auto bg-rose-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
              activeTab === 'reports' ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md shadow-emerald-950/60' : 'text-slate-400 hover:text-white hover:bg-slate-950'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{t("Sales Reports")}</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-2 border border-slate-800 transition-colors"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>{t("Print WhatsApp Poster")}</span>
          </button>

          <button
            onClick={() => setActivePage('profile')}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-2 border border-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>{t("Shop Settings")}</span>
          </button>
        </div>
      </aside>

      {/* MAIN MERCHANT CONTENT WORKSPACE */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 bg-slate-950 overflow-y-auto">
        
        {/* TOP STATUS & SHOP CONTROL BAR */}
        <div className="bg-slate-900/90 border border-emerald-900/40 rounded-3xl p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className={`w-3.5 h-3.5 rounded-full ${myShop.isOpen ? 'bg-emerald-500 animate-pulse shadow-md shadow-emerald-500/50' : 'bg-rose-500'}`} />
            <div>
              <h1 className="text-lg font-black text-white font-heading">{myShop.businessName}</h1>
              <p className="text-xs text-slate-400">📍 {myShop.address} • 📞 {myShop.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={myShop.status !== 'approved'}
              title={t(myShop.status)}
              onClick={() => toggleShopOpenStatus(myShop.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-md ${
                myShop.isOpen ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              {myShop.isOpen ? <ToggleRight className="w-5 h-5 text-amber-300" /> : <ToggleLeft className="w-5 h-5" />}
              <span>{myShop.status !== 'approved' ? t(myShop.status === 'pending' ? 'pendingApproval' : 'blocked') : myShop.isOpen ? t('openNow') : t('closedNow')}</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & DASHBOARD CARDS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* Sales Period Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-emerald-900/40 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Filter className="w-4 h-4 text-emerald-400" />
                <span>{t("Sales Filter Period:")}</span>
              </div>
              <select
                value={salesPeriod}
                onChange={(e) => setSalesPeriod(e.target.value as SalesFilterPeriod)}
                className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-4 py-2 focus:outline-none focus:border-emerald-500 font-bold"
              >
                <option value="today">{t("Today")}</option>
                <option value="yesterday">{t("Yesterday")}</option>
                <option value="7days">{t("Last 7 Days")}</option>
                <option value="30days">{t("Last 30 Days")}</option>
                <option value="this_month">{t("This Month")}</option>
                <option value="last_month">{t("Last Month")}</option>
              </select>
            </div>

            {/* Business Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/90 border border-emerald-900/40 p-5 rounded-3xl space-y-2 shadow-2xl backdrop-blur-md">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("Total Sales")}</span>
                <div className="text-2xl font-black text-amber-400 font-heading">₹{totalSales.toFixed(2)}</div>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-amber-400" />{t("Completed Orders Revenue")}</span>
              </div>

              <div className="bg-slate-900/90 border border-emerald-900/40 p-5 rounded-3xl space-y-2 shadow-2xl backdrop-blur-md">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("Total Orders")}</span>
                <div className="text-2xl font-black text-emerald-400 font-heading">{totalOrdersCount}</div>
                <span className="text-[10px] text-emerald-300 font-semibold">{activeOrdersCount}{t("Active In-Progress")}</span>
              </div>

              <div className="bg-slate-900/90 border border-emerald-900/40 p-5 rounded-3xl space-y-2 shadow-2xl backdrop-blur-md">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("Total Products")}</span>
                <div className="text-2xl font-black text-teal-400 font-heading">{shopProducts.length}</div>
                <span className="text-[10px] text-teal-300 font-semibold">{t("In Catalog")}</span>
              </div>

              <div className="bg-slate-900/90 border border-emerald-900/40 p-5 rounded-3xl space-y-2 shadow-2xl backdrop-blur-md">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("Low Stock Warning")}</span>
                <div className="text-2xl font-black text-amber-400 font-heading">{lowStockCount}</div>
                <span className="text-[10px] text-amber-300 font-semibold">{t("Items Need Restock")}</span>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="theme-inverse bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-emerald-800/40 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
              <div>
                <h3 className="text-base font-black text-white font-heading">{t("Expand Your Merchant Catalog")}</h3>
                <p className="text-xs text-slate-300">{t("Add new items with custom measurement units (KG, Liter, Piece, Box, Pack) and automated volume discount tiers.")}</p>
              </div>
              <button
                onClick={openAddModal}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs shadow-lg shadow-emerald-950/60 flex items-center gap-2 shrink-0 transition-all hover:scale-[1.01]"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>{t("Add New Product")}</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white font-heading">{t("Product Catalog Management")}</h2>
                <p className="text-xs text-slate-400">{t("Manage prices, measurement units, and volume discount rules.")}</p>
              </div>
              <button
                onClick={openAddModal}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/60 flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>{t("Add Product")}</span>
              </button>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shopProducts.map((p) => (
                <div key={p.id} className="bg-slate-900/90 border border-emerald-900/40 hover:border-emerald-500/60 rounded-3xl p-5 space-y-4 shadow-2xl transition-all backdrop-blur-md">
                  <div className="flex items-start gap-4">
                    <img
                      src={p.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80'}
                      alt={p.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-800 shrink-0"
                    />
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                          {p.sellingType.toUpperCase()}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          p.productStatus === 'disabled'
                            ? 'bg-slate-950 text-slate-400 border-slate-800'
                            : stockState(p) === 'out_of_stock'
                            ? 'bg-rose-950/90 text-rose-300 border-rose-700/60'
                            : 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60'
                        }`}>
                          {t(stockState(p))}
                        </span>
                      </div>
                      <h3 className="font-black text-sm text-white truncate font-heading">{p.name}</h3>
                      <div className="text-sm font-black text-amber-400">₹{p.price} / {t(`unit_${p.sellingType}`)}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">{t("Stock:")}{p.stockQuantity ?? t('untrackedStock')} {t(`unit_${p.sellingType}`)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 rounded-xl bg-slate-950 hover:bg-rose-950 text-rose-400 border border-slate-800 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INVENTORY STOCK CONTROL */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-lg font-black text-white">{t("Inventory Stock Control")}</h2>
              <p className="text-xs text-slate-400">{t("Track current stock levels and automated low stock thresholds.")}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-black border-b border-slate-800">
                  <tr>
                    <th className="p-4">{t("Product")}</th>
                    <th className="p-4">{t("Category")}</th>
                    <th className="p-4">{t("Unit")}</th>
                    <th className="p-4">{t("Current Stock")}</th>
                    <th className="p-4">{t("Status")}</th>
                    <th className="p-4 text-right">{t("Action")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {shopProducts.map((p) => {
                    const isLow = stockState(p) === 'limited';
                    return (
                      <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-4 font-extrabold text-white flex items-center gap-3">
                          <img src={p.image} className="w-8 h-8 rounded-lg object-cover" />
                          <span>{p.name}</span>
                        </td>
                        <td className="p-4 capitalize">{categories.find(c => c.id === p.categoryId)?.[language === 'te' ? 'nameTe' : 'name'] || p.categoryId}</td>
                        <td className="p-4 uppercase text-[10px] font-bold text-indigo-400">{t(`unit_${p.sellingType}`)}</td>
                        <td className="p-4 font-black text-white">{p.stockQuantity ?? t('untrackedStock')}</td>
                        <td className="p-4">
                          {isLow ? (
                            <span className="inline-flex items-center gap-1.5 text-amber-400 font-black text-[10px] bg-amber-950/60 border border-amber-800 px-2.5 py-1 rounded-full">
                              <AlertTriangle className="w-3 h-3" />{t("Low Stock")}</span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-black text-[10px] bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" />{t("In Stock")}</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => openEditModal(p)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
                          >{t("Update Stock")}</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LIVE ORDERS DESK */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-lg font-black text-white">{t("Live Customer Orders Desk")}</h2>
              <p className="text-xs text-slate-400">{t("Accept, prepare, and complete live incoming orders.")}</p>
            </div>

            {shopOrders.length === 0 ? (
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
                <p className="text-xs font-bold">{t("No orders received yet.")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {shopOrders.map((order) => (
                  <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-4">
                      <div>
                        <span className="text-xs font-black text-emerald-400">{order.id}</span>
                        <h3 className="font-extrabold text-white text-sm">{order.customerName} (📞 {order.customerMobile})</h3>
                        <p className="text-xs text-slate-400">📍 {order.customerAddress}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'accepted')}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black"
                            >{t("Accept Order")}</button>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'rejected')}
                              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black"
                            >{t("Reject")}</button>
                          </>
                        )}
                        {order.status === 'accepted' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black"
                          >{t("Start Preparing")}</button>
                        )}
                        {order.status === 'processing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black"
                          >{t("Mark Ready")}</button>
                        )}
                        {order.status === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black"
                          >{t("Mark Completed")}</button>
                        )}
                        {order.status === 'completed' && (
                          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-black">{t("✓ COMPLETED")}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs text-slate-300 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                          <div>
                            <span className="font-bold text-white">{item.productName}</span>
                            <span className="text-[11px] text-slate-400 block">{item.quantity} {item.sellingType} @ ₹{item.effectiveUnitPrice}</span>
                          </div>
                          <span className="font-black text-emerald-400">₹{item.totalPrice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: BUSINESS REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-lg font-black text-white">{t("Business Performance Reports")}</h2>
              <p className="text-xs text-slate-400">{t("Analyze revenue growth and customer order insights.")}</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-xs font-black uppercase text-emerald-400 tracking-wider">{t("Revenue Breakdown")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">{t("Total Gross Revenue")}</span>
                  <span className="text-xl font-black text-white">₹{totalSales.toFixed(2)}</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">{t("Total Orders Processed")}</span>
                  <span className="text-xl font-black text-white">{totalOrdersCount}</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">{t("Average Order Value")}</span>
                  <span className="text-xl font-black text-emerald-400">
                    ₹{completedOrders.length > 0 ? (totalSales / completedOrders.length).toFixed(2) : '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ADD / EDIT PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-black text-base text-white">
                {editingProductId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">{t("Product Name *")}</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. Sona Masoori Raw Rice 25KG"
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">{t("Selling Price (₹) *")}</label>
                  <input
                    type="number" min="0" step="any"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">{t("Measurement Unit *")}</label>
                  <select
                    value={sellingType}
                    onChange={(e) => setSellingType(e.target.value as SellingType)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 uppercase font-bold"
                  >
                    <option value="unit">{t("Unit")}</option>
                    <option value="kg">KG</option>
                    <option value="liter">{t("Liter")}</option>
                    <option value="piece">{t("Piece")}</option>
                    <option value="box">{t("Box")}</option>
                    <option value="pack">{t("Pack")}</option>
                    {(['gram', 'ml', 'meter', 'dozen', 'service', 'other'] as SellingType[]).map(unit => <option key={unit} value={unit}>{t(`unit_${unit}`)}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">{t("Available Stock Quantity")}</label>
                  <input
                    type="number" min="0" step="any"
                    value={stockQty ?? ''}
                    onChange={(e) => setStockQty(e.target.value === '' ? undefined : Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">{t("Low Stock Alert Level")}</label>
                  <input
                    type="number" min="0" step="any"
                    value={lowStockLimit}
                    onChange={(e) => setLowStockLimit(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">{t("Image URL")}</label>
                <input
                  type="text"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">{t("Description")}</label>
                <textarea
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Bulk Pricing Section */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableBulk}
                    onChange={(e) => setEnableBulk(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-emerald-600 focus:ring-0"
                  />
                  <span>{t("Enable Volume Bulk Tier Pricing")}</span>
                </label>

                {enableBulk && (
                  <div className="space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    {bulkTiers.map((tier, idx) => (
                      <div key={tier.id} className="flex items-center gap-2">
                        <input
                          type="number" min="0" step="any"
                          value={tier.minQty}
                          onChange={(e) => updateTier(idx, 'minQty', Number(e.target.value))}
                          placeholder="Min Qty"
                          className="w-20 bg-slate-900 border border-slate-800 text-white p-2 rounded-xl text-center"
                        />
                        <span className="text-slate-500">to</span>
                        <input
                          type="number" min="0" step="any"
                          value={tier.maxQty || ''}
                          onChange={(e) => updateTier(idx, 'maxQty', e.target.value ? Number(e.target.value) : null)}
                          placeholder="Max (+)"
                          className="w-20 bg-slate-900 border border-slate-800 text-white p-2 rounded-xl text-center"
                        />
                        <span className="text-slate-500">= ₹</span>
                        <input
                          type="number" min="0" step="any"
                          value={tier.discountValue}
                          onChange={(e) => updateTier(idx, 'discountValue', Number(e.target.value))}
                          placeholder="Rate ₹"
                          className="w-24 bg-slate-900 border border-slate-800 text-emerald-400 p-2 rounded-xl text-center font-bold"
                        />
                        <button
                          type="button"
                          onClick={() => removeTier(idx)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addTierRow}
                      className="text-xs font-bold text-emerald-400 hover:underline pt-1 block"
                    >{t("+ Add Discount Tier")}</button>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold"
                >{t("Cancel")}</button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md"
                >{t("Save Product")}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WHATSAPP QR POSTER MODAL */}
      {showQrModal && (
        <QrPosterModal shop={myShop} onClose={() => setShowQrModal(false)} />
      )}

    </div>
  );
};
