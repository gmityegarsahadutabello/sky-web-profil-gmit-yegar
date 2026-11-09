const mongoose = require('mongoose');

const strukturSchema = new mongoose.Schema(
  {
    periode: { type: String, required: true, trim: true },
    ketua: { type: String, required: true, trim: true },
    wakilKetua: { type: String, required: true, trim: true },
    sekretaris: { type: String, required: true, trim: true },
    wakilSekretaris: { type: String, required: true, trim: true },
    bendahara: { type: String, required: true, trim: true },
    wakilBendahara: { type: String, required: true, trim: true },
    penatua: { type: String, required: true, trim: true },
    diaken: { type: String, required: true, trim: true },
    pengajar: { type: String, required: true, trim: true },
    // Custom periods added by admin
    customGMITSections: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Struktur', strukturSchema);
