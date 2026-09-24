import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { User, Store, Sparkles } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole, t, setActivePage } = useApp();

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'admin') setActivePage('admin-dashboard');
    else if (role === 'shop_owner') setActivePage('shop-dashboard');
    else setActivePage('customer-dashboard');
  };

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-amber-950 text-slate-200 text-xs py-1.5 px-4 border-b border-emerald-900/50 flex flex-wrap items-center justify-between gap-2 shadow-md">
      <div className="flex items-center gap-2 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span className="text-amber-400 font-bold font-serif">{t('demoRoleSwitcher')}</span>
        <span className="hidden sm:inline text-slate-400">| Nexvarya Platform Preview</span>
      </div>

      <div className="flex items-center gap-1.5 bg-slate-900/90 p-0.5 rounded-lg border border-emerald-900/40 shadow-sm backdrop-blur-md">
        <button
          onClick={() => handleRoleChange('customer')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-semibold ${
            currentRole === 'customer'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <User className="w-3.5 h-3.5 text-amber-300" />
          <span>{t('viewAsCustomer')}</span>
        </button>

        <button
          onClick={() => handleRoleChange('shop_owner')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-semibold ${
            currentRole === 'shop_owner'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Store className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('viewAsShopOwner')}</span>
        </button>
      </div>
    </div>
  );
};
