import mongoose from 'mongoose';

const bulkDiscountTierSchema = new mongoose.Schema({
  id: { type: String },
  minQty: { type: Number, required: true },
  maxQty: { type: Number, default: null },
  discountType: { type: String, enum: ['fixed_price', 'percentage'], default: 'fixed_price' },
  discountValue: { type: Number, required: true }
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  shopId: { type: String, required: true },
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  sellingType: { type: String, default: 'kg' },
  image: { type: String },
  stockQuantity: { type: Number, default: 50 },
  lowStockThreshold: { type: Number, default: 10 },
  productStatus: { type: String, enum: ['active', 'out_of_stock', 'disabled'], default: 'active' },
  stockStatus: { type: String, enum: ['in_stock', 'out_of_stock', 'limited'], default: 'in_stock' },
  isAvailable: { type: Boolean, default: true },
  enableBulkDiscount: { type: Boolean, default: true },
  bulkDiscounts: [bulkDiscountTierSchema]
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
