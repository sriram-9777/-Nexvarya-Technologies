import React from 'react';
import { useApp } from '../../context/useApp';
import { User, MapPin, ShoppingBag, Search } from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { themeMode, currentUser, orders, categories, t, language, setActivePage, setSelectedCategory } = useApp();

  const myOrders = orders.filter(o => o.customerId === currentUser?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60';
      case 'processing': return 'bg-amber-950/90 text-amber-300 border-amber-700/60';
      case 'ready': return 'bg-teal-950/90 text-teal-300 border-teal-700/60';
      case 'completed': return 'bg-blue-950/90 text-blue-300 border-blue-700/60';
      case 'rejected': return 'bg-rose-950/90 text-rose-300 border-rose-700/60';
      default: return 'bg-amber-950/90 text-amber-300 border-amber-700/60';
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-screen transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Welcome & Location Header */}
      <div className={`rounded-3xl p-6 sm:p-8 shadow-2xl border text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md ${
        themeMode === 'dark'
          ? 'theme-inverse bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border-emerald-800/40'
          : 'theme-inverse bg-gradient-to-r from-emerald-700 via-teal-800 to-amber-800 border-emerald-600'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <User className="w-4 h-4 text-emerald-400" />
            <span>{t('customerDashboard')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-heading">
            {t('welcomeUser')}, {currentUser?.name || 'Customer'} 👋
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{t("📍 Your Location:")} {currentUser?.villageTownCity || currentUser?.address || 'Address not provided'}{currentUser?.pincode ? `, PIN: ${currentUser.pincode}` : ''}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setActivePage('profile')}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950/80 hover:bg-slate-900 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <User className="w-4 h-4 text-amber-400" />
            <span>{t("Edit Profile")}</span>
          </button>
          <button
            onClick={() => setActivePage('businesses')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 flex items-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Search className="w-4 h-4 text-amber-300" />
            <span>{t("Browse Businesses")}</span>
          </button>
        </div>
      </div>

      {/* Business Categories Quick Grid */}
      <div className="space-y-4">
        <h2 className={`text-lg font-black tracking-tight font-heading ${
          themeMode === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>{t("Business Categories")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setActivePage('businesses'); }}
              className={`p-3.5 rounded-2xl text-left transition-all border shadow-md backdrop-blur-md group ${
                themeMode === 'dark'
                  ? 'bg-slate-900/90 hover:bg-slate-800/90 border-emerald-900/40 hover:border-emerald-500/60 text-white'
                  : 'bg-white hover:bg-emerald-50/80 border-slate-200 hover:border-emerald-300 text-slate-900'
              }`}
            >
              <h3 className={`font-bold text-xs group-hover:text-amber-500 transition-colors font-heading ${
                themeMode === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {language === 'te' ? cat.nameTe : cat.name}
              </h3>
              <p className={`text-[10px] line-clamp-1 mt-0.5 ${
                themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>{cat.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* My Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-black tracking-tight font-heading ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>{t('myOrders')}</h2>
          <span className="text-xs text-amber-400 font-bold bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/60">
            {myOrders.length}{t("orders total")}</span>
        </div>

        {myOrders.length === 0 ? (
          <div className={`border rounded-2xl p-10 text-center space-y-2 shadow-xl ${
            themeMode === 'dark' ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}>
            <ShoppingBag className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{t("You haven't placed any orders yet.")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myOrders.map((order) => (
              <div 
                key={order.id}
                className={`border rounded-2xl p-5 shadow-2xl space-y-4 backdrop-blur-md ${
                  themeMode === 'dark' ? 'bg-slate-900/90 border-emerald-900/40 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 text-xs ${
                  themeMode === 'dark' ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  <div>
                    <span className="font-extrabold text-amber-500 font-mono">{order.id}</span>
                    <span className={`ml-2 ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>• {order.createdAt}</span>
                    <h3 className={`font-bold text-sm mt-0.5 font-heading ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{order.shopName}</h3>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border self-start sm:self-auto ${getStatusColor(order.status)}`}>{t("Status:")}{order.status.toUpperCase()}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center text-xs p-2.5 rounded-xl border ${
                      themeMode === 'dark' ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`}>
                      <div>
                        <span className={`font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.productName}</span>
                        <span className={`text-[11px] block ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          {item.quantity} {t(`unit_${item.sellingType}`)} @ ₹{item.effectiveUnitPrice}/{t(`unit_${item.sellingType}`)}
                        </span>
                      </div>
                      <span className="font-extrabold text-amber-500">₹{item.totalPrice.toFixed(0)}</span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className={`flex justify-between items-center pt-2 border-t text-xs ${
                  themeMode === 'dark' ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  <span className={`font-medium ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t("Total Paid Amount:")}</span>
                  <span className="text-lg font-black text-amber-500">₹{order.totalAmount.toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
