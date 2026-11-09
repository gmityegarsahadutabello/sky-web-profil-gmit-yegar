const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getStruktur,
  getPublicStruktur,
  saveStruktur
} = require('../controllers/strukturController');

// Public route for website
router.get('/public', getPublicStruktur);

// Admin-only routes (require authentication)
router.get('/', authMiddleware, getStruktur);
router.post('/', authMiddleware, saveStruktur);

module.exports = router;
