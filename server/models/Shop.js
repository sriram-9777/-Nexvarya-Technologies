import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  ownerId: { type: String, required: true },
  businessName: { type: String, required: true },
  categoryId: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, default: 'Andhra Pradesh' },
  phone: { type: String, required: true },
  email: { type: String },
  description: { type: String },
  openingTime: { type: String, default: '08:00 AM' },
  closingTime: { type: String, default: '09:00 PM' },
  gstNumber: { type: String },
  whatsappNumber: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'blocked'], default: 'approved' },
  isOpen: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  reviewCount: { type: Number, default: 1 }
}, { timestamps: true });

export const Shop = mongoose.models.Shop || mongoose.model('Shop', shopSchema);
