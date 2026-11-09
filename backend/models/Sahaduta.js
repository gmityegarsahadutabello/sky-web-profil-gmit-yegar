const mongoose = require('mongoose');

const sahadutaSchema = new mongoose.Schema(
  {
    gambaran: { type: String, required: true, trim: true },
    pertumbuhan: { type: String, required: true, trim: true },
    pelayanan: { type: String, required: true, trim: true },
    statKK: { type: Number, default: 82 },
    statJiwa: { type: Number, default: 322 },
    statBaptis: { type: Number, default: 241 },
    // Custom sections added by admin
    customSahadutaSections: {
      type: Array,
      default: []
    },
    // Content map for easy access by ID
    contentSahaduta: {
      type: Map,
      of: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sahaduta', sahadutaSchema);
