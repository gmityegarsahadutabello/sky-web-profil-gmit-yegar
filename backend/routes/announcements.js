const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getPublicAnnouncements,
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
} = require('../controllers/announcementController');

// Public route
router.get('/public', getPublicAnnouncements);

// Admin-only routes (require authentication)
router.get('/', authMiddleware, getAllAnnouncements);
router.get('/:id', authMiddleware, getAnnouncementById);
router.post('/', authMiddleware, createAnnouncement);
router.put('/:id', authMiddleware, updateAnnouncement);
router.delete('/:id', authMiddleware, deleteAnnouncement);

module.exports = router;
