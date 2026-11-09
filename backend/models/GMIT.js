const mongoose = require('mongoose');

const gmitSchema = new mongoose.Schema(
  {
    portugis: { type: String, required: true, trim: true },
    belanda: { type: String, required: true, trim: true },
    jepang: { type: String, required: true, trim: true },
    pragmit: { type: String, required: true, trim: true },
    modern: { type: String, required: true, trim: true },
    // Custom sections added by admin
    customGMITSections: {
      type: Array,
      default: []
    },
    // Content map for easy access by ID
    contentGMIT: {
      type: Map,
      of: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('GMIT', gmitSchema);
