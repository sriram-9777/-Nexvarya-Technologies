import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LanguageCode, User, UserRole, Shop, Product, Category, 
  CartItem, Order, OrderStatus, BulkDiscountTier 
} from '../types';
import { 
  initialCategories, initialUsers, initialShops, 
  initialProducts, initialOrders 
} from '../data/mockData';
import { translations } from '../data/translations';

export type ThemeMode = 'dark' | 'light';

interface AppContextType {
  themeMode: ThemeMode;
  setThemeMode: (theme: ThemeMode) => void;
  toggleThemeMode: () => void;

  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => User;
  updateUser: (userId: string, userData: Partial<User>) => void;
  updateUserStatus: (userId: string, status: 'active' | 'blocked') => void;

  shops: Shop[];
  addShop: (shopData: Omit<Shop, 'id' | 'status' | 'isOpen'>) => Shop;
  updateShop: (shopId: string, shopData: Partial<Shop>) => void;
  updateShopStatus: (shopId: string, status: 'pending' | 'approved' | 'blocked') => void;
  toggleShopOpenStatus: (shopId: string) => void;
  myShop: Shop | undefined;

  products: Product[];
  addProduct: (productData: Omit<Product, 'id'>) => void;
  updateProduct: (productId: string, productData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;

  categories: Category[];
  addCategory: (categoryData: Omit<Category, 'id'>) => void;

  cart: CartItem[];
  addToCart: (product: Product, shop: Shop, qty?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  calculateBulkUnitPrice: (product: Product, quantity: number) => { effectivePrice: number; savingsPerUnit: number; discountText?: string };

  orders: Order[];
  placeOrder: (notes?: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  activePage: string;
  setActivePage: (page: string) => void;
  selectedShopId: string | null;
  setSelectedShopId: (id: string | null) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showDemoBar: boolean;
  setShowDemoBar: (show: boolean) => void;
  toggleDemoBar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0. Theme Mode State (Dark / Light)
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('nexvarya_theme');
    return (saved as ThemeMode) || 'dark';
  });

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('nexvarya_theme', mode);
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
    return (localStorage.getItem('nexvarya_lang') as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('nexvarya_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const DEMO_SHOP_IDS = ['shop_1', 'shop_2', 'shop_3', 'shop_4', 'shop_5', 'shop_6', 'shop_7'];
  const DEMO_USER_IDS = ['user_cust_1', 'user_owner_1', 'user_admin_1'];

  // 2. User & Role state
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('nexvarya_users');
    const parsed: User[] = saved ? JSON.parse(saved) : initialUsers;
    return parsed.filter(u => !DEMO_USER_IDS.includes(u.id));
  });

  const [currentUser, setCurrentUserState] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexvarya_current_user');
    if (saved) {
      try {
        const parsed: User = JSON.parse(saved);
        if (!DEMO_USER_IDS.includes(parsed.id)) return parsed;
      } catch (e) {
        // ignore parse error
      }
    }
    return null;
  });

  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    return currentUser ? currentUser.role : 'customer';
  });

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      setCurrentRoleState(user.role);
      localStorage.setItem('nexvarya_current_user', JSON.stringify(user));
    } else {
      setCurrentRoleState('customer');
      localStorage.removeItem('nexvarya_current_user');
    }
  };

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (currentUser) {
      const updated = { ...currentUser, role };
      setCurrentUserState(updated);
      setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
      localStorage.setItem('nexvarya_current_user', JSON.stringify(updated));
    }
  };

  useEffect(() => {
    localStorage.setItem('nexvarya_users', JSON.stringify(users));
  }, [users]);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser: User = {
      ...userData,
      id: 'user_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setCurrentRoleState(newUser.role);
    localStorage.setItem('nexvarya_current_user', JSON.stringify(newUser));
    return newUser;
  };

  const updateUser = (userId: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, ...userData };
        if (currentUser?.id === userId) {
          setCurrentUser(updated);
          localStorage.setItem('nexvarya_current_user', JSON.stringify(updated));
        }
        return updated;
      }
      return u;
    }));
  };

  const updateUserStatus = (userId: string, status: 'active' | 'blocked') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
  };

  // 3. Shop State
  const [shops, setShops] = useState<Shop[]>(() => {
    const saved = localStorage.getItem('nexvarya_shops');
    if (saved) {
      try {
        const parsed: Shop[] = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return initialShops;
  });

  useEffect(() => {
    localStorage.setItem('nexvarya_shops', JSON.stringify(shops));
  }, [shops]);

  const addShop = (shopData: Omit<Shop, 'id' | 'status' | 'isOpen'>): Shop => {
    const newShop: Shop = {
      ...shopData,
      id: 'shop_' + Date.now(),
      status: 'approved',
      isOpen: true,
      rating: 5.0,
      reviewCount: 1
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
    setShops(prev => prev.map(s => s.id === shopId ? { ...s, isOpen: !s.isOpen } : s));
  };

  const myShop = currentUser?.role === 'shop_owner' 
    ? shops.find(s => s.ownerId === currentUser.id)
    : undefined;

  // 4. Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nexvarya_products');
    const parsed: Product[] = saved ? JSON.parse(saved) : initialProducts;
    return parsed.filter(p => !DEMO_SHOP_IDS.includes(p.shopId));
  });

  useEffect(() => {
    localStorage.setItem('nexvarya_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod_' + Date.now()
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
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('nexvarya_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...categoryData,
      id: 'cat_' + Date.now()
    };
    setCategories(prev => [...prev, newCat]);
  };

  // 6. Bulk Discount Logic Engine
  const calculateBulkUnitPrice = (product: Product, quantity: number) => {
    if (!product.enableBulkDiscount || !product.bulkDiscounts || product.bulkDiscounts.length === 0) {
      return { effectivePrice: product.price, savingsPerUnit: 0 };
    }

    // Find applicable tier based on quantity
    let matchedTier: BulkDiscountTier | null = null;

    for (const tier of product.bulkDiscounts) {
      if (quantity >= tier.minQty) {
        if (tier.maxQty === null || quantity <= tier.maxQty) {
          matchedTier = tier;
          break;
        }
      }
    }

    if (!matchedTier) {
      return { effectivePrice: product.price, savingsPerUnit: 0 };
    }

    let effectivePrice = product.price;
    if (matchedTier.discountType === 'fixed_price') {
      effectivePrice = matchedTier.discountValue;
    } else if (matchedTier.discountType === 'percentage') {
      const discountAmount = (product.price * matchedTier.discountValue) / 100;
      effectivePrice = product.price - discountAmount;
    }

    const savingsPerUnit = Math.max(0, product.price - effectivePrice);
    const discountText = matchedTier.discountType === 'fixed_price'
      ? `₹${effectivePrice}/${product.sellingType.toUpperCase()}`
      : `${matchedTier.discountValue}% OFF`;

    return { effectivePrice, savingsPerUnit, discountText };
  };

  // 7. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nexvarya_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexvarya_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, shop: Shop, qtyToAdd: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      let newQty = qtyToAdd;
      if (existingIndex > -1) {
        newQty += prev[existingIndex].quantity;
      }

      const { effectivePrice, savingsPerUnit } = calculateBulkUnitPrice(product, newQty);
      const newItem: CartItem = {
        product,
        shop,
        quantity: newQty,
        effectiveUnitPrice: effectivePrice,
        savingsPerUnit: savingsPerUnit,
        totalPrice: effectivePrice * newQty
      };

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = newItem;
        return updated;
      } else {
        return [...prev, newItem];
      }
    });
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const { effectivePrice, savingsPerUnit } = calculateBulkUnitPrice(item.product, newQuantity);
        return {
          ...item,
          quantity: newQuantity,
          effectiveUnitPrice: effectivePrice,
          savingsPerUnit: savingsPerUnit,
          totalPrice: effectivePrice * newQuantity
        };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // 8. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nexvarya_orders');
    const parsed: Order[] = saved ? JSON.parse(saved) : initialOrders;
    return parsed.filter(o => !DEMO_SHOP_IDS.includes(o.shopId) && o.id !== 'ORD-9841');
  });

  useEffect(() => {
    localStorage.setItem('nexvarya_orders', JSON.stringify(orders));
  }, [orders]);

  // Helper: Collision-Resistant Order ID Generator
  const generateOrderId = (): string => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ORD-${timestamp}-${randomHex}`;
  };

  const placeOrder = (notes?: string): Order | null => {
    if (cart.length === 0 || !currentUser) return null;

    // Multi-Shop Cart Splitting (Audit Item #7)
    const shopGroups: Record<string, CartItem[]> = {};
    cart.forEach(item => {
      const shopId = item.shop.id;
      if (!shopGroups[shopId]) shopGroups[shopId] = [];
      shopGroups[shopId].push(item);
    });

    const createdOrders: Order[] = [];

    Object.keys(shopGroups).forEach(shopId => {
      const shopItems = shopGroups[shopId];
      const targetShop = shopItems[0].shop;

      const subtotal = shopItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const totalAmount = shopItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const discountTotal = subtotal - totalAmount;

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
        createdAt: new Date().toLocaleString('en-US', { hour12: false }),
        notes
      };

      createdOrders.push(newOrder);
    });

    setOrders(prev => [...createdOrders, ...prev]);
    clearCart();
    return createdOrders[0] || null;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // Navigation & Search State
  const [selectedShopId, setSelectedShopId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('shop');
    }
    return null;
  });

  const [activePage, setActivePage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('shop')) return 'shop-detail';
    }
    return 'home';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handlePopState = () => {
        const params = new URLSearchParams(window.location.search);
        const shopParam = params.get('shop');
        if (shopParam) {
          setSelectedShopId(shopParam);
          setActivePage('shop-detail');
        }
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

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
