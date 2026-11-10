const mongoose = require('mongoose');

const sahadutaSchema = new mongoose.Schema(
  {
    gambaran: { type: String, required: true, trim: true },
    pertumbuhan: { type: String, required: true, trim: true },
    pelayanan: { type: String, required: true, trim: true },
    statKK: { type: Number, default: 82 },
    statJiwa: { type: Number, default: 322 },
    statBaptis: { type: Number, default: 241 },
    // Warta & donasi settings shown on beranda
    wartaUrl: {
      type: String,
      trim: true,
      default: 'https://drive.google.com/drive/folders/1Zwq8xjesek8QyeOV2H7JzOSBzLYR-DG5?usp=sharing'
    },
    bankNama: { type: String, trim: true, default: '' },
    bankRekening: { type: String, trim: true, default: '' },
    bankAtasNama: { type: String, trim: true, default: '' },
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
