const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true, trim: true },
    kategori: {
      type: String,
      required: true,
      enum: ['kegiatan', 'perjamuan', 'irt', 'umum']
    },
    // Disimpan sebagai string YYYY-MM-DD untuk menghindari isu timezone
    tanggal: { type: String, required: true },
    waktu: { type: String, default: '' },
    lokasi: { type: String, default: '' },
    deskripsi: { type: String, required: true },
    // Jika true, tampil di website publik
    aktif: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', announcementSchema);
