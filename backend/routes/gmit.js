const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getGMIT,
  getPublicGMIT,
  saveGMIT,
  deleteCustomGMITSection
} = require('../controllers/gmitController');

// Public route for website
router.get('/public', getPublicGMIT);

// Admin-only routes (require authentication)
router.get('/', authMiddleware, getGMIT);
router.post('/', authMiddleware, saveGMIT);
router.delete('/custom/:sectionId', authMiddleware, deleteCustomGMITSection);

module.exports = router;
