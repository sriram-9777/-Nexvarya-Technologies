import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  sellingType: { type: String, default: 'kg' },
  baseUnitPrice: { type: Number, required: true },
  effectiveUnitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  discountAppliedText: { type: String }
});

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  customerMobile: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerPincode: { type: String },
  shopId: { type: String, required: true },
  shopName: { type: String, required: true },
  shopPhone: { type: String },
  shopAddress: { type: String },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discountTotal: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'processing', 'ready', 'completed', 'rejected'], 
    default: 'pending' 
  },
  createdAt: { type: String, default: () => new Date().toLocaleString() },
  notes: { type: String }
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
