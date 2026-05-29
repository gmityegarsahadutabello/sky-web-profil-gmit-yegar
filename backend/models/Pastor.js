const mongoose = require('mongoose');

const PastorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    type: String,
    default: ''
  },
  image_url: {
    type: String,
    default: ''
  },
  s3_key: {
    type: String,
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp setiap kali dokumen diubah
PastorSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Middleware untuk update
PastorSchema.pre('findByIdAndUpdate', function(next) {
  this.set({ updated_at: Date.now() });
  next();
});

module.exports = mongoose.model('Pastor', PastorSchema);
