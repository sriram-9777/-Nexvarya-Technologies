import React, { useState, lazy, Suspense } from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RoleSwitcher } from './components/RoleSwitcher';
import { CartModal } from './components/CartModal';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Businesses } from './pages/Businesses';
import { ShopDetail } from './pages/ShopDetail';
import { ServicesProducts } from './pages/ServicesProducts';
import { Login } from './pages/Login';
const Signup = lazy(() => import('./pages/Signup').then(module => ({ default: module.Signup })));
import { Contact } from './pages/Contact';
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));

import { CustomerDashboard } from './pages/dashboard/CustomerDashboard';
const ShopOwnerDashboard = lazy(() => import('./pages/dashboard/ShopOwnerDashboard').then(module => ({ default: module.ShopOwnerDashboard })));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard').then(module => ({ default: module.AdminDashboard })));

const MainLayout: React.FC = () => {
  const { activePage, currentUser, showDemoBar, themeMode, t } = useApp();
  const [cartOpen, setCartOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'businesses':
        return <Businesses />;
      case 'shop-detail':
        return <ShopDetail />;
      case 'services-products':
        return <ServicesProducts />;
      case 'login':
        return <Login />;
      case 'signup':
        return <Signup />;
      case 'contact':
        return <Contact />;
      case 'profile':
        return <Profile />;
      case 'customer-dashboard':
        return currentUser ? <CustomerDashboard /> : <Login />;
      case 'shop-dashboard':
        return currentUser?.role === 'shop_owner' ? <ShopOwnerDashboard /> : <Login />;
      case 'admin-dashboard':
        return currentUser?.role === 'admin' ? <AdminDashboard /> : <Login />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Demo Switcher - shown ONLY when no user is logged in */}
      {import.meta.env.DEV && showDemoBar && !currentUser && <RoleSwitcher />}

      {/* Main Header */}
      <Header onOpenCart={() => setCartOpen(true)} />

      <p role="status" className="px-4 py-2 text-center text-xs text-slate-400 border-b border-slate-800">{t('localDataNotice')}</p>
      {/* Dynamic Page Content */}
      <main className="flex-1">
        <Suspense fallback={<p role="status" className="p-8 text-center">{t('loading')}</p>}>{renderPage()}</Suspense>
      </main>

      {/* Cart Drawer */}
      {cartOpen && (
        <CartModal onClose={() => setCartOpen(false)} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
