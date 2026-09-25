import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  serviceInterest: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
  createdAt: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
