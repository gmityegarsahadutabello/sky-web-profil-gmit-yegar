const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getSahaduta,
  getPublicSahaduta,
  saveSahaduta,
  deleteCustomSahadutaSection
} = require('../controllers/sahadutaController');

// Public route for website
router.get('/public', getPublicSahaduta);

// Admin-only routes (require authentication)
router.get('/', authMiddleware, getSahaduta);
router.post('/', authMiddleware, saveSahaduta);
router.delete('/custom/:sectionId', authMiddleware, deleteCustomSahadutaSection);

module.exports = router;
