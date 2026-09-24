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

export const initialUsers: User[] = [];

export const initialShops: Shop[] = [];

export const initialProducts: Product[] = [];

export const initialOrders: Order[] = [];

