import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  mobile: { type: String, required: true },
  password: { type: String },
  address: { type: String, required: true },
  villageTownCity: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, default: 'Andhra Pradesh' },
  country: { type: String, default: 'India' },
  language: { type: String, default: 'en' },
  role: { type: String, enum: ['customer', 'shop_owner', 'admin'], default: 'customer' },
  status: { type: String, enum: ['active', 'blocked'], default: 'active' },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
