const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: ['activities', 'building']
    },
    image_url: { type: String, required: true },
    caption: { type: String, default: '' },
    order: { type: Number, default: 0 },
    s3_key: { type: String, default: '' }
  },
  { timestamps: true }
);

galleryItemSchema.index({ section: 1, order: 1 });

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
