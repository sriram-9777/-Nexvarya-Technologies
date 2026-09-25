import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiAccess } from './access.js';

import { User } from './models/User.js';
import { Shop } from './models/Shop.js';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
import { Enquiry } from './models/Enquiry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexvarya';

app.use(cors());
app.use(express.json());

// 🔌 Connect to MongoDB Server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB Database`);
  })
  .catch((err) => {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
  });

// 🔒 Helper: Collision-Resistant Order ID Generator
const generateCollisionResistantOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${randomHex}`;
};

// Never accept a public user ID as an authentication credential.
app.use(apiAccess(process.env.API_MANAGEMENT_KEY));

// 🏥 Health Check Endpoint (Secured: No DB URI Exposure)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// 👤 USERS ENDPOINTS
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
      id: req.body.id || 'user_' + Date.now()
    });
    await newUser.save();
    const { password: _password, ...publicUser } = newUser.toObject();
    res.status(201).json(publicUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { id: req.params.id },
      { $set: Object.fromEntries(Object.entries(req.body).filter(([key]) => !['id', '_id', '__v'].includes(key))) },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Record not found.' });
    const record = updated.toObject();
    delete record.password;
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🏪 SHOPS ENDPOINTS
app.get('/api/shops', async (req, res) => {
  try {
    const shops = await Shop.find(req.isManagement ? {} : { status: 'approved' }).sort({ createdAt: -1 });
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/shops', async (req, res) => {
  try {
    const newShop = new Shop({
      ...req.body,
      id: req.body.id || 'shop_' + Date.now()
    });
    await newShop.save();
    res.status(201).json(newShop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/shops/:id', async (req, res) => {
  try {
    const updated = await Shop.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📦 PRODUCTS ENDPOINTS
app.get('/api/products', async (req, res) => {
  try {
    const approvedShops = await Shop.find({ status: 'approved' }).select('id');
    const products = await Product.find(req.isManagement ? {} : { shopId: { $in: approvedShops.map(shop => shop.id) }, isAvailable: true, productStatus: { $ne: 'disabled' } }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      id: req.body.id || 'prod_' + Date.now()
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🛒 ORDERS ENDPOINTS
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      id: req.body.id || generateCollisionResistantOrderId()
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const updated = await Order.findOneAndUpdate(
      { id: req.params.id },
      { $set: { status: req.body.status } },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📩 ENQUIRIES ENDPOINTS
app.get('/api/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/enquiries', async (req, res) => {
  try {
    const newEnquiry = new Enquiry({
      ...req.body,
      id: req.body.id || 'enq_' + Date.now()
    });
    await newEnquiry.save();
    res.status(201).json(newEnquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Nexvarya Express Server running on port ${PORT}`);
});
