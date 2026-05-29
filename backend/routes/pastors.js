const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/auth');
const {
  getAllPastors,
  getPastorById,
  createPastor,
  updatePastor,
  deletePastor,
  uploadImage,
  reorderPastors
} = require('../controllers/pastorController');

// Public routes
router.get('/', getAllPastors);
router.get('/:id', getPastorById);

// Admin-only routes (require authentication)
router.post('/', authMiddleware, createPastor);
router.put('/:id', authMiddleware, updatePastor);
router.delete('/:id', authMiddleware, deletePastor);
router.post('/reorder', authMiddleware, reorderPastors);

// Upload image to S3
router.post('/upload', authMiddleware, upload.single('image'), uploadImage);

module.exports = router;
