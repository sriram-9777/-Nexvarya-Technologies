export type UserRole = 'customer' | 'shop_owner' | 'admin';

export type LanguageCode = 'en' | 'te';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
  address: string;
  villageTownCity: string;
  pincode: string;
  state: string;
  country: string;
  language: LanguageCode;
  role: UserRole;
  status: 'active' | 'blocked';
  createdAt: string;
}

export type SellingType = 
  | 'unit' 
  | 'kg' 
  | 'gram' 
  | 'liter' 
  | 'ml' 
  | 'meter' 
  | 'box' 
  | 'pack' 
  | 'dozen' 
  | 'piece' 
  | 'service' 
  | 'other';

export type BulkDiscountType = 'fixed_price' | 'percentage';

export interface BulkDiscountTier {
  id: string;
  minQty: number;
  maxQty: number | null; // null means "and above" (e.g., 50+)
  discountType: BulkDiscountType;
  discountValue: number; // if fixed_price, this is ₹ per unit; if percentage, this is % off
}

export interface Category {
  id: string;
  name: string;
  nameTe: string;
  icon: string;
  status: 'active' | 'inactive';
  description?: string;
}

export interface Shop {
  id: string;
  ownerId: string;
  businessName: string;
  categoryId: string;
  address: string;
  pincode: string;
  state: string;
  phone: string;
  email: string;
  description: string;
  openingTime: string;
  closingTime: string;
  logo?: string;
  images?: string[];
  status: 'pending' | 'approved' | 'blocked';
  gstNumber?: string;
  website?: string;
  whatsappNumber?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
  };
  isOpen: boolean;
  rating?: number;
  reviewCount?: number;
}

export type ProductStatus = 'active' | 'out_of_stock' | 'disabled';

export type SalesFilterPeriod = 
  | 'today' 
  | 'yesterday' 
  | '7days' 
  | '30days' 
  | 'this_month' 
  | 'last_month';

export interface Product {
  id: string;
  shopId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  sellingType: SellingType;
  image?: string;
  stockQuantity?: number;
  lowStockThreshold?: number;
  minOrderQuantity?: number;
  productStatus?: ProductStatus;
  stockStatus: 'in_stock' | 'out_of_stock' | 'limited';
  isAvailable: boolean;
  enableBulkDiscount: boolean;
  bulkDiscounts: BulkDiscountTier[];
  vegType?: 'veg' | 'non_veg' | 'na';
  prescriptionRequired?: boolean;
}

export interface CartItem {
  product: Product;
  shop: Shop;
  quantity: number;
  effectiveUnitPrice: number;
  savingsPerUnit: number;
  totalPrice: number;
}

export type OrderStatus = 'pending' | 'accepted' | 'processing' | 'ready' | 'completed' | 'rejected';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  sellingType: SellingType;
  baseUnitPrice: number;
  effectiveUnitPrice: number;
  totalPrice: number;
  discountAppliedText?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerMobile: string;
  customerAddress: string;
  customerPincode: string;
  shopId: string;
  shopName: string;
  shopPhone: string;
  shopAddress: string;
  items: OrderItem[];
  subtotal: number;
  discountTotal: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}
