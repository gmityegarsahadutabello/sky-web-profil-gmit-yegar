require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pastorsRouter = require('./routes/pastors');
const announcementsRouter = require('./routes/announcements');
const galleryRouter = require('./routes/gallery');

const app = express();
let connectionPromise;

const connectToMongo = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB connected');
      return mongoose.connection;
    })
    .catch((err) => {
      connectionPromise = null;
      throw err;
    });

  return connectionPromise;
};

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server berjalan', timestamp: new Date() });
});

// Ensure DB connection for API routes
app.use(async (req, res, next) => {
  try {
    await connectToMongo();
    return next();
  } catch (err) {
    return next(err);
  }
});

// Routes
app.use('/api/pastors', pastorsRouter);
app.use('/api/announcements', announcementsRouter);
app.use('/api/gallery', galleryRouter);

// Auth endpoint (simple login)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        { username, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({ token, message: 'Login berhasil' });
    }

    return res.status(401).json({ error: 'Username atau password salah' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

module.exports = { app, connectToMongo };
