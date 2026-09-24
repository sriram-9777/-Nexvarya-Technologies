import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
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
import { Signup } from './pages/Signup';
import { Contact } from './pages/Contact';
import { Profile } from './pages/Profile';

import { CustomerDashboard } from './pages/dashboard/CustomerDashboard';
import { ShopOwnerDashboard } from './pages/dashboard/ShopOwnerDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';

const MainLayout: React.FC = () => {
  const { activePage, currentUser, showDemoBar, themeMode } = useApp();
  const [cartOpen, setCartOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        if (currentUser) {
          if (currentUser.role === 'admin') return <AdminDashboard />;
          if (currentUser.role === 'shop_owner') return <ShopOwnerDashboard />;
          return <CustomerDashboard />;
        }
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
        return <CustomerDashboard />;
      case 'shop-dashboard':
        return <ShopOwnerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 ${
      themeMode === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Demo Switcher - shown ONLY when no user is logged in */}
      {showDemoBar && !currentUser && <RoleSwitcher />}

      {/* Main Header */}
      <Header onOpenCart={() => setCartOpen(true)} />

      {/* Dynamic Page Content */}
      <main className="flex-1">
        {renderPage()}
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
