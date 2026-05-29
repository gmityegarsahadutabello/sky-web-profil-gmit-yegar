require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pastorsRouter = require('./routes/pastors');
const announcementsRouter = require('./routes/announcements');
const galleryRouter = require('./routes/gallery');

const app = express();
const PORT = process.env.PORT || 5000;

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

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
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

    res.status(401).json({ error: 'Username atau password salah' });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

const server = app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} sudah dipakai. Matikan server yang sedang berjalan atau ganti PORT di .env, lalu coba lagi.`);
    return process.exit(1);
  }

  console.error('❌ Server error:', err);
  process.exit(1);
});
