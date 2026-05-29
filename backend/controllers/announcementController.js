const Announcement = require('../models/Announcement');

const sortNewestFirst = { tanggal: -1, createdAt: -1 };

// GET pengumuman publik (hanya yang aktif)
const getPublicAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ aktif: true }).sort(sortNewestFirst);
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET semua pengumuman (admin)
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort(sortNewestFirst);
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET pengumuman by ID (admin)
const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ error: 'Pengumuman tidak ditemukan' });
    }
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE pengumuman baru (admin)
const createAnnouncement = async (req, res) => {
  try {
    const { judul, kategori, tanggal, waktu, lokasi, deskripsi, aktif } = req.body;

    if (!judul || !kategori || !tanggal || !deskripsi) {
      return res.status(400).json({ error: 'judul, kategori, tanggal, dan deskripsi wajib diisi' });
    }

    const announcement = new Announcement({
      judul,
      kategori,
      tanggal,
      waktu: waktu || '',
      lokasi: lokasi || '',
      deskripsi,
      aktif: aktif !== undefined ? !!aktif : true
    });

    await announcement.save();
    res.status(201).json({ message: 'Pengumuman berhasil ditambahkan', announcement });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE pengumuman (admin)
const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, kategori, tanggal, waktu, lokasi, deskripsi, aktif } = req.body;

    const updateData = {};
    if (judul !== undefined) updateData.judul = judul;
    if (kategori !== undefined) updateData.kategori = kategori;
    if (tanggal !== undefined) updateData.tanggal = tanggal;
    if (waktu !== undefined) updateData.waktu = waktu;
    if (lokasi !== undefined) updateData.lokasi = lokasi;
    if (deskripsi !== undefined) updateData.deskripsi = deskripsi;
    if (aktif !== undefined) updateData.aktif = !!aktif;

    const announcement = await Announcement.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!announcement) {
      return res.status(404).json({ error: 'Pengumuman tidak ditemukan' });
    }

    res.json({ message: 'Pengumuman berhasil diperbarui', announcement });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE pengumuman (admin)
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({ error: 'Pengumuman tidak ditemukan' });
    }

    res.json({ message: 'Pengumuman berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPublicAnnouncements,
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};
