import { createContext, useContext } from 'react';
import type { LanguageCode, User, UserRole, Shop, Product, Category, CartItem, Order, OrderStatus } from '../types';

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

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
