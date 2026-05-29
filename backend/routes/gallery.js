const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getPublicGallery,
  getAdminGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  reorderGalleryItems,
  uploadGalleryImage
} = require('../controllers/galleryController');

// Public
router.get('/public', getPublicGallery);

// Admin
router.get('/', authMiddleware, getAdminGallery);
router.post('/', authMiddleware, createGalleryItem);
router.put('/:id', authMiddleware, updateGalleryItem);
router.delete('/:id', authMiddleware, deleteGalleryItem);
router.post('/reorder', authMiddleware, reorderGalleryItems);
router.post('/upload', authMiddleware, upload.single('image'), uploadGalleryImage);

module.exports = router;
