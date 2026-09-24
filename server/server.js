import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { User } from './models/User.js';
import { Shop } from './models/Shop.js';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexvarya';

app.use(cors());
app.use(express.json());

// 🔌 Connect to MongoDB Server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB Database at ${MONGODB_URI}`);
  })
  .catch((err) => {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
  });

// 🏥 Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uri: MONGODB_URI,
    timestamp: new Date().toISOString()
  });
});

// 👤 USERS ENDPOINTS
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
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
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🏪 SHOPS ENDPOINTS
app.get('/api/shops', async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
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
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📦 PRODUCTS ENDPOINTS
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
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
      { new: true }
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
      id: req.body.id || 'ORD-' + Math.floor(1000 + Math.random() * 9000)
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
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Nexvarya Node.js Express Server running on http://localhost:${PORT}`);
  console.log(`📦 Connected to MongoDB at: ${MONGODB_URI}`);
});
