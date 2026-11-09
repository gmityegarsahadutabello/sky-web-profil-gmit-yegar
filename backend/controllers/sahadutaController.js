const Sahaduta = require('../models/Sahaduta');

const defaultSahaduta = {
  gambaran: `Jemaat GMIT Yegar Sahaduta Bello bermula dari sebuah Pos Pelayanan yang lahir sebagai wujud ucapan syukur kepada Tuhan atas jawaban doa dari beberapa keluarga di wilayah Kelurahan Bello, Kota Kupang sekitar tahun 2010. Gagasan ini mendapat dukungan warga setempat. Dengan semangat kebersamaan dan gotong royong, pembangunan fisik gedung gereja dimulai Mei 2012 dan selesai Juni 2013. Ibadah pertama diadakan 15 Juli 2013 dan Pos Pelayanan secara resmi dibuka dalam kebaktian perdana 22 September 2013.

Setelah melalui proses pembinaan dan dukungan Majelis Klasis Kupang Barat, Pos Pelayanan ini ditetapkan menjadi jemaat mandiri oleh Majelis Sinode GMIT pada 22 September 2019.`,
  pertumbuhan: `Pada masa awal (2013) tercatat 17 KK dengan 35 jiwa. Saat pemandirian (2019) jumlah meningkat menjadi 55 KK. Perkembangan berlanjut menjadi 62 KK hingga 2022. Jumlah baptis, sidi dan statistik lainnya mengalami kenaikan hingga tercatat 82 KK dan sensus sementara 322 jiwa (Mei 2025).`,
  pelayanan: `Jemaat aktif menyelenggarakan ibadah Minggu, persekutuan doa, dan kegiatan pelayanan sosial/diakonia. Informasi jadwal dan pengumuman tersedia di halaman Informasi serta melalui kontak majelis jemaat.`,
  statKK: 82,
  statJiwa: 322,
  statBaptis: 241,
  customSahadutaSections: [],
  contentSahaduta: {}
};

// GET sahaduta data (admin)
const getSahaduta = async (req, res) => {
  try {
    let sahaduta = await Sahaduta.findOne();
    if (!sahaduta) {
      sahaduta = await Sahaduta.create(defaultSahaduta).catch(() => defaultSahaduta);
    }
    res.json(sahaduta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET sahaduta data publik (hanya yang aktif/tersimpan)
const getPublicSahaduta = async (req, res) => {
  try {
    let sahaduta = await Sahaduta.findOne();
    if (!sahaduta) {
      sahaduta = await Sahaduta.create(defaultSahaduta).catch(() => defaultSahaduta);
    }
    // Return only public content
    const publicData = {
      gambaran: sahaduta.gambaran,
      pertumbuhan: sahaduta.pertumbuhan,
      pelayanan: sahaduta.pelayanan,
      statKK: sahaduta.statKK,
      statJiwa: sahaduta.statJiwa,
      statBaptis: sahaduta.statBaptis,
      customSahadutaSections: sahaduta.customSahadutaSections || [],
      contentSahaduta: sahaduta.contentSahaduta || {}
    };
    res.json(publicData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE/UPDATE sahaduta data (admin)
const saveSahaduta = async (req, res) => {
  try {
    const {
      gambaran, pertumbuhan, pelayanan,
      statKK, statJiwa, statBaptis,
      customSahadutaSections, contentSahaduta
    } = req.body;

    let sahaduta = await Sahaduta.findOne();

    if (sahaduta) {
      // Update existing
      sahaduta.gambaran = gambaran;
      sahaduta.pertumbuhan = pertumbuhan;
      sahaduta.pelayanan = pelayanan;
      sahaduta.statKK = statKK;
      sahaduta.statJiwa = statJiwa;
      sahaduta.statBaptis = statBaptis;
      sahaduta.customSahadutaSections = customSahadutaSections || [];
      sahaduta.contentSahaduta = contentSahaduta || {};
      await sahaduta.save();
    } else {
      // Create new
      sahaduta = new Sahaduta({
        gambaran,
        pertumbuhan,
        pelayanan,
        statKK,
        statJiwa,
        statBaptis,
        customSahadutaSections: customSahadutaSections || [],
        contentSahaduta: contentSahaduta || {}
      });
      await sahaduta.save();
    }

    res.json({ message: 'Data sahaduta berhasil disimpan', sahaduta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE custom sahaduta section (admin)
const deleteCustomSahadutaSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const sahaduta = await Sahaduta.findOne();
    if (!sahaduta) {
      return res.status(404).json({ error: 'Data sahaduta tidak ditemukan' });
    }

    // Remove from custom sections array
    sahaduta.customSahadutaSections = sahaduta.customSahadutaSections.filter(
      s => s.id !== sectionId
    );

    // Remove from content map
    if (sahaduta.contentSahaduta && sahaduta.contentSahaduta[sectionId]) {
      delete sahaduta.contentSahaduta[sectionId];
    }

    await sahaduta.save();

    res.json({ message: 'Section berhasil dihapus', sahaduta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getSahaduta,
  getPublicSahaduta,
  saveSahaduta,
  deleteCustomSahadutaSection
};
