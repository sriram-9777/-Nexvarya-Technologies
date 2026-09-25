import { Category, Shop, Product, User, Order } from '../types';

export const initialCategories: Category[] = [
  { id: 'cat_grocery', name: 'Grocery', nameTe: 'కిరాణా', icon: 'ShoppingCart', status: 'active', description: 'Rice, oil, pulses, vegetables, snacks' },
  { id: 'cat_restaurant', name: 'Restaurant', nameTe: 'రెస్టారెంట్', icon: 'Utensils', status: 'active', description: 'Biryani, tiffins, meals, fast food' },
  { id: 'cat_clothing', name: 'Clothing', nameTe: 'దుస్తులు', icon: 'Shirt', status: 'active', description: 'Men, women, kids wear & fabrics' },
  { id: 'cat_electronics', name: 'Electronics', nameTe: 'ఎలక్ట్రానిక్స్', icon: 'Tv', status: 'active', description: 'TVs, home appliances, speakers' },
  { id: 'cat_medical', name: 'Medical Shop', nameTe: 'మెడికల్ షాప్', icon: 'Pill', status: 'active', description: 'Medicines, healthcare, wellness' },
  { id: 'cat_services', name: 'Services', nameTe: 'సేవలు', icon: 'Wrench', status: 'active', description: 'AC repair, plumbing, electrician, salon' },
  { id: 'cat_furniture', name: 'Furniture', nameTe: 'ఫర్నిచర్', icon: 'Armchair', status: 'active', description: 'Sofas, beds, chairs, office tables' },
  { id: 'cat_hardware', name: 'Hardware', nameTe: 'హార్డ్‌వేర్', icon: 'Hammer', status: 'active', description: 'Cement, pipes, tools, paints' },
  { id: 'cat_mobile', name: 'Mobile Shop', nameTe: 'మొబైల్ షాప్', icon: 'Smartphone', status: 'active', description: 'Smartphones, accessories, covers' },
  { id: 'cat_other', name: 'Other', nameTe: 'ఇతర', icon: 'Grid', status: 'active', description: 'Stationery, gifts, general stores' }
];

export const initialUsers: User[] = [
  {
    id: 'user_admin',
    name: 'Nexvarya Executive Admin',
    email: 'admin@nexvarya.com',
    mobile: '9876543210',
    address: 'Nexvarya Tech Hub, MG Road',
    villageTownCity: 'Vijayawada',
    pincode: '520002',
    state: 'Andhra Pradesh',
    country: 'India',
    language: 'en',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-01'
  },
  {
    id: 'user_shop_1',
    name: 'Sri Lakshmi Store Manager',
    email: 'srilakshmi@nexvarya.com',
    mobile: '7997679777',
    address: 'Beside SBI Bank',
    villageTownCity: 'Vijayawada',
    pincode: '520002',
    state: 'Andhra Pradesh',
    country: 'India',
    language: 'en',
    role: 'shop_owner',
    status: 'active',
    createdAt: '2026-01-02'
  },
  {
    id: 'user_customer_1',
    name: 'Ramesh Kumar',
    email: 'ramesh@gmail.com',
    mobile: '9123456789',
    address: 'Plot 42, Governorpet',
    villageTownCity: 'Vijayawada',
    pincode: '520002',
    state: 'Andhra Pradesh',
    country: 'India',
    language: 'en',
    role: 'customer',
    status: 'active',
    createdAt: '2026-01-03'
  }
];

export const initialShops: Shop[] = [
  {
    id: 'shop_1',
    ownerId: 'user_shop_1',
    businessName: 'Sri Lakshmi Supermarket',
    categoryId: 'cat_grocery',
    phone: '7997679777',
    whatsappNumber: '917997679777',
    email: 'srilakshmi@nexvarya.com',
    address: 'MG Road, Beside SBI Bank',
    pincode: '520002',
    state: 'Andhra Pradesh',
    openingTime: '08:00 AM',
    closingTime: '09:30 PM',
    status: 'approved',
    isOpen: true,
    rating: 4.8,
    reviewCount: 124,
    description: 'Premium rice, edible oils, spices, & daily essentials at wholesale and retail rates.'
  },
  {
    id: 'shop_2',
    ownerId: 'user_shop_2',
    businessName: 'Sri Balaji Electronics',
    categoryId: 'cat_electronics',
    phone: '9848022334',
    whatsappNumber: '919848022334',
    email: 'balajielectronics@nexvarya.com',
    address: 'Besant Road',
    pincode: '520002',
    state: 'Andhra Pradesh',
    openingTime: '09:00 AM',
    closingTime: '09:00 PM',
    status: 'approved',
    isOpen: true,
    rating: 4.9,
    reviewCount: 89,
    description: 'Authorized dealer for Smart TVs, Refrigerators, ACs & Washing Machines.'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod_101',
    shopId: 'shop_1',
    categoryId: 'cat_grocery',
    name: 'Premium Sona Masoori Rice',
    description: 'Aged premium quality Sona Masoori Rice directly from Krishna river belt farms.',
    price: 65,
    sellingType: 'kg',
    stockStatus: 'in_stock',
    isAvailable: true,
    enableBulkDiscount: true,
    bulkDiscounts: [
      { id: 'b1', minQty: 10, maxQty: 24, discountType: 'fixed_price', discountValue: 63 },
      { id: 'b2', minQty: 25, maxQty: 49, discountType: 'fixed_price', discountValue: 61 },
      { id: 'b3', minQty: 50, maxQty: null, discountType: 'fixed_price', discountValue: 59 }
    ]
  },
  {
    id: 'prod_102',
    shopId: 'shop_1',
    categoryId: 'cat_grocery',
    name: 'Freedom Refined Sunflower Oil',
    description: 'Healthy refined sunflower oil enriched with Vitamins A & D.',
    price: 150,
    sellingType: 'liter',
    stockStatus: 'in_stock',
    isAvailable: true,
    enableBulkDiscount: true,
    bulkDiscounts: [
      { id: 'b4', minQty: 5, maxQty: 11, discountType: 'percentage', discountValue: 5 },
      { id: 'b5', minQty: 12, maxQty: null, discountType: 'percentage', discountValue: 8 }
    ]
  },
  {
    id: 'prod_103',
    shopId: 'shop_1',
    categoryId: 'cat_grocery',
    name: 'Toor Dal Premium',
    description: 'Unpolished protein-rich Toor Dal.',
    price: 160,
    sellingType: 'kg',
    stockStatus: 'in_stock',
    isAvailable: true,
    enableBulkDiscount: false,
    bulkDiscounts: []
  },
  {
    id: 'prod_104',
    shopId: 'shop_2',
    categoryId: 'cat_electronics',
    name: '55-inch 4K Ultra HD Smart TV',
    description: 'Dolby Vision & Atmos certified 4K Smart TV with 3 Years Warranty.',
    price: 25000,
    sellingType: 'unit',
    stockStatus: 'in_stock',
    isAvailable: true,
    enableBulkDiscount: false,
    bulkDiscounts: []
  },
  {
    id: 'prod_105',
    shopId: 'shop_1',
    categoryId: 'cat_services',
    name: 'Split AC Deep Cleaning Service',
    description: 'Complete jet pressure washing, filter cleaning & gas checkup.',
    price: 600,
    sellingType: 'service',
    stockStatus: 'in_stock',
    isAvailable: true,
    enableBulkDiscount: false,
    bulkDiscounts: []
  },
  {
    id: 'prod_106',
    shopId: 'shop_1',
    categoryId: 'cat_clothing',
    name: 'Men Cotton Formal Shirt',
    description: 'Pure 100% breathable cotton formal shirt.',
    price: 899,
    sellingType: 'piece',
    stockStatus: 'in_stock',
    isAvailable: true,
    enableBulkDiscount: false,
    bulkDiscounts: []
  }
];

export const initialOrders: Order[] = [];
