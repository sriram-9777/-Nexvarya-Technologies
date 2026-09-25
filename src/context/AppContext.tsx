import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  LanguageCode, User, UserRole, Shop, Product, Category, 
  CartItem, Order, OrderStatus
} from '../types';
import { 
  initialCategories, initialUsers, initialShops, 
  initialProducts, initialOrders 
} from '../data/mockData';
import { readRoute, pages } from '../utils/navigation';
import { translations } from '../data/translations';
import { calculateBulkUnitPrice, makeCartItem, reconcileCart, money } from '../utils/commerce';
import { readStored, saveStored, readPreference, savePreference } from '../utils/storage';
import { apiProducts, apiShops } from '../api';

import { AppContext } from './useApp';
import type { ThemeMode } from './useApp';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0. Theme Mode State (Dark / Light)
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = readPreference('nexvarya_theme', 'dark');
    return saved === 'light' ? 'light' : 'dark';
  });

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    savePreference('nexvarya_theme', mode);
  };

  const toggleThemeMode = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  // 1. Language state
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return readPreference('nexvarya_lang', 'en') === 'te' ? 'te' : 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    savePreference('nexvarya_lang', lang);
  };

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };


  // 2. User & Role state
  const [users, setUsers] = useState<User[]>(() => readStored('nexvarya_users', initialUsers));

  const [currentUser, setCurrentUserState] = useState<User | null>(() => {
    const saved = readStored<User | null>('nexvarya_current_user', null);
    return users.find(u => u.id === saved?.id && u.status === 'active') || null;
  });

  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    return currentUser ? currentUser.role : 'customer';
  });

  const setCurrentUser = (user: User | null) => {
    if (user?.status === 'blocked') return;
    setCurrentUserState(user);
    if (user?.language) setLanguage(user.language);
    if (user) {
      setCurrentRoleState(user.role);
      const { password: _password, ...session } = user;
      saveStored('nexvarya_current_user', session);
    } else {
      setCurrentRoleState('customer');
      saveStored('nexvarya_current_user', null);
    }
  };

  const setCurrentRole = (role: UserRole) => {
    // A display preference must never mutate an account's permissions.
    setCurrentRoleState(currentUser?.role || role);
  };

  useEffect(() => {
    saveStored('nexvarya_users', users);
  }, [users]);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser: User = {
      ...userData,
      id: 'user_' + crypto.randomUUID(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setCurrentRoleState(newUser.role);
    return newUser;
  };

  const updateUser = (userId: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...userData, id: u.id } : u));
    if (currentUser?.id === userId) setCurrentUser({ ...currentUser, ...userData, id: userId });
  };

  const updateUserStatus = (userId: string, status: 'active' | 'blocked') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    if (currentUser?.id === userId && status === 'blocked') setCurrentUser(null);
  };

  // 3. Shop State
  const [shops, setShops] = useState<Shop[]>(() => readStored('nexvarya_shops', initialShops));

  // Prefer approved cloud data when the backend is available, while retaining
  // the local catalogue as an offline fallback.
  useEffect(() => {
    let cancelled = false;
    Promise.all([apiShops.getAll(), apiProducts.getAll()])
      .then(([remoteShops, remoteProducts]) => {
        if (cancelled) return;
        if (Array.isArray(remoteShops) && remoteShops.length) setShops(remoteShops);
        if (Array.isArray(remoteProducts) && remoteProducts.length) setProducts(remoteProducts);
      })
      .catch(() => {
        // Keep the local cached catalogue when the API is unavailable.
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    saveStored('nexvarya_shops', shops);
  }, [shops]);

  const addShop = (shopData: Omit<Shop, 'id' | 'status' | 'isOpen'>): Shop => {
    const newShop: Shop = {
      ...shopData,
      id: 'shop_' + crypto.randomUUID(),
      status: 'pending',
      isOpen: false,
      rating: 0,
      reviewCount: 0
    };
    setShops(prev => [newShop, ...prev]);
    return newShop;
  };

  const updateShop = (shopId: string, shopData: Partial<Shop>) => {
    setShops(prev => prev.map(s => s.id === shopId ? { ...s, ...shopData } : s));
  };

  const updateShopStatus = (shopId: string, status: 'pending' | 'approved' | 'blocked') => {
    setShops(prev => prev.map(s => s.id === shopId ? { ...s, status } : s));
  };

  const toggleShopOpenStatus = (shopId: string) => {
    setShops(prev => prev.map(s => s.id === shopId && s.status === 'approved' ? { ...s, isOpen: !s.isOpen } : s));
  };

  const myShop = currentUser?.role === 'shop_owner' 
    ? shops.find(s => s.ownerId === currentUser.id)
    : undefined;

  // 4. Products State
  const [products, setProducts] = useState<Product[]>(() => readStored('nexvarya_products', initialProducts));

  useEffect(() => {
    saveStored('nexvarya_products', products);
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod_' + crypto.randomUUID()
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (productId: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...productData } : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // 5. Categories State
  const [categories, setCategories] = useState<Category[]>(() => readStored('nexvarya_categories', initialCategories));

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...categoryData,
      id: 'cat_' + crypto.randomUUID()
    };
    setCategories(prev => [...prev, newCat]);
  };

  useEffect(() => { saveStored('nexvarya_categories', categories); }, [categories]);

  // 7. Cart State
  const [storedCart, setCart] = useState<CartItem[]>(() => reconcileCart(readStored('nexvarya_cart', []), products, shops));

  const cart = useMemo(() => reconcileCart(storedCart, products, shops), [storedCart, products, shops]);

  useEffect(() => {
    saveStored('nexvarya_cart', cart);
  }, [cart]);



  const addToCart = (product: Product, shop: Shop, qtyToAdd = 1) => {
    if (!Number.isFinite(qtyToAdd) || qtyToAdd <= 0) return;
    setCart(prev => {
      const latest = products.find(p => p.id === product.id);
      const currentShop = shops.find(s => s.id === shop.id);
      if (!latest || !currentShop) return prev;
      const existing = prev.find(item => item.product.id === product.id);
      const item = makeCartItem(latest, currentShop, (existing?.quantity || 0) + qtyToAdd);
      return item ? [...prev.filter(i => i.product.id !== product.id), item] : prev;
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (!Number.isFinite(quantity)) return;
    setCart(prev => reconcileCart(prev.map(item => item.product.id === productId ? { ...item, quantity } : item), products, shops));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // 8. Orders State
  const [orders, setOrders] = useState<Order[]>(() => readStored('nexvarya_orders', initialOrders));

  useEffect(() => {
    saveStored('nexvarya_orders', orders);
  }, [orders]);

  // Directory, account and order changes are persisted in this browser.
  // A remote data adapter must support reads AND writes before replacing this store.

  // Helper: Collision-Resistant Order ID Generator
  const generateOrderId = (): string => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${timestamp}-${randomHex}`;
  };

  const placeOrder = (notes?: string): Order | null => {
    if (cart.length === 0 || !currentUser || currentUser.status !== 'active') return null;
    const checkedCart = reconcileCart(cart, products, shops);
    if (checkedCart.length !== cart.length) { setCart(checkedCart); return null; }

    // Multi-Shop Cart Splitting (Audit Item #7)
    const shopGroups: Record<string, CartItem[]> = {};
    checkedCart.forEach(item => {
      const shopId = item.shop.id;
      if (!shopGroups[shopId]) shopGroups[shopId] = [];
      shopGroups[shopId].push(item);
    });

    const createdOrders: Order[] = [];

    Object.keys(shopGroups).forEach(shopId => {
      const shopItems = shopGroups[shopId];
      const targetShop = shopItems[0].shop;

      const subtotal = money(shopItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0));
      const totalAmount = money(shopItems.reduce((sum, item) => sum + item.totalPrice, 0));
      const discountTotal = money(subtotal - totalAmount);

      const newOrder: Order = {
        id: generateOrderId(), // Collision-Resistant ID (Audit Item #6)
        customerId: currentUser.id,
        customerName: currentUser.name,
        customerMobile: currentUser.mobile,
        customerAddress: `${currentUser.address}, ${currentUser.villageTownCity || ''}`,
        customerPincode: currentUser.pincode,
        shopId: targetShop.id,
        shopName: targetShop.businessName,
        shopPhone: targetShop.phone,
        shopAddress: targetShop.address,
        items: shopItems.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          sellingType: item.product.sellingType,
          baseUnitPrice: item.product.price,
          effectiveUnitPrice: item.effectiveUnitPrice,
          totalPrice: item.totalPrice,
          discountAppliedText: item.savingsPerUnit > 0 ? `Saved ₹${item.savingsPerUnit * item.quantity}` : undefined
        })),
        subtotal,
        discountTotal,
        totalAmount,
        status: 'pending',
        createdAt: new Date().toISOString(),
        notes
      };

      createdOrders.push(newOrder);
    });

    setOrders(prev => [...createdOrders, ...prev]);
    setProducts(prev => prev.map(product => {
      const item = checkedCart.find(i => i.product.id === product.id);
      if (!item || product.stockQuantity === undefined) return product;
      const stockQuantity = Math.max(0, product.stockQuantity - item.quantity);
      return { ...product, stockQuantity, stockStatus: stockQuantity === 0 ? 'out_of_stock' : product.stockStatus };
    }));
    clearCart();
    return createdOrders[0] || null;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || (currentUser?.role !== 'admin' && !shops.some(s => s.id === order.shopId && s.ownerId === currentUser?.id))) return;
    const transitions: Record<OrderStatus, OrderStatus[]> = { pending: ['accepted','rejected'], accepted: ['processing','rejected'], processing: ['ready','rejected'], ready: ['completed'], completed: [], rejected: [] };
    if (!transitions[order.status].includes(status)) return;
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (status === 'rejected') setProducts(prev => prev.map(product => {
      const item = order.items.find(i => i.productId === product.id);
      if (!item || product.stockQuantity === undefined) return product;
      return { ...product, stockQuantity: product.stockQuantity + item.quantity, stockStatus: 'in_stock' };
    }));
  };

  // Navigation & Search State
  const [selectedShopId, setSelectedShopIdState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('shop');
    }
    return null;
  });

  const [activePage, setActivePageState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return readRoute(params.toString()).page;
    }
    return 'home';
  });

  const shopIdRef = useRef(selectedShopId);
  const setSelectedShopId = (id: string | null) => { shopIdRef.current = id; setSelectedShopIdState(id); };
  const setActivePage = (page: string) => {
    const next = pages.includes(page) ? page : 'home';
    const url = new URL(window.location.href);
    url.searchParams.delete('shop');
    url.searchParams.delete('page');
    if (next === 'shop-detail' && shopIdRef.current) url.searchParams.set('shop', shopIdRef.current);
    else if (next !== 'home') url.searchParams.set('page', next);
    if (url.href !== window.location.href) window.history.pushState({}, '', url);
    setActivePageState(next);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handlePopState = () => {
        const route = readRoute(window.location.search);
        setSelectedShopId(route.shop);
        setActivePageState(route.page);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDemoBar, setShowDemoBar] = useState<boolean>(false);

  const toggleDemoBar = () => setShowDemoBar(prev => !prev);

  return (
    <AppContext.Provider value={{
      themeMode, setThemeMode, toggleThemeMode,
      language, setLanguage, t,
      currentUser, setCurrentUser, currentRole, setCurrentRole,
      users, addUser, updateUser, updateUserStatus,
      shops, addShop, updateShop, updateShopStatus, toggleShopOpenStatus, myShop,
      products, addProduct, updateProduct, deleteProduct,
      categories, addCategory,
      cart, addToCart, updateCartQuantity, removeFromCart, clearCart, calculateBulkUnitPrice,
      orders, placeOrder, updateOrderStatus,
      activePage, setActivePage,
      selectedShopId, setSelectedShopId,
      selectedCategory, setSelectedCategory,
      searchQuery, setSearchQuery,
      showDemoBar, setShowDemoBar, toggleDemoBar
    }}>
      {children}
    </AppContext.Provider>
  );
};
