const Struktur = require('../models/Struktur');

const defaultStruktur = {
  periode: '2024-2027',
  ketua: 'Pdt. Selvy J.K. Asfes - Zina, S.Th.',
  wakilKetua: 'Pnt. Ir. Adelfitje Meyok- Maka Ndolu',
  sekretaris: 'Pgjr. Lidya Camelia Kase, S.Pd',
  wakilSekretaris: 'Pnt. Angelina Wabang-Maro, S.Pd',
  bendahara: 'Pnt. Elsi Natbais-Nobel, S.Pd',
  wakilBendahara: 'Pnt. Melky E.K. Bana',
  penatua: `Johanis Watrimny, S.Si
Agustinus Bria
Engelina Wabang – Maro, S.Pd
Ir. Adelfintje Meyok – Makandolu
Hanani Melangwala Laumalay, SKM, M.Sc
Mesak Meliyaki Natbais, S.Pd.Gr.
Marselina Halla – Nomleni
Elsi Natbais – Nobel, S.Pd
Norlince Jeni Penu – Tiran
Yunus Talan
Letries Bria – Plaikol
Grace Marion Nelwan, S.E
Terfosa Selan – Landak
Yakub Penu
Disyan Azarya Azmawet Taopan – Tanesab, A.Md.Keb
Norlina Ester Abdonia Penu – Hauteas, S.Pd
Praksedis Rassi – Naben
Jeni Angriani Nenohai – Biaf
Sulestiany Selan – Bistolen, A.Md.Keb.
Jelmi Bien – Penuam
Melky Elmaden Kornelis Bana
Jublina Pandie – Nomleni
Sebedius Selan
Yosina Manu – Ome
Jerison Benu
Paskaria Ati – Nomleni
Ribka Liu – Silla
Ferdinan Tefnai
Grancia Caroline Bria
Lidya Camelia Kase, S.Pd
Susan Sabrina Selan, A.Md.T
Melani Lebriana Selan`,
  diaken: `Jublina Pandie – Nomleni
Sebedius Selan
Yosina Manu – Ome
Jerison Benu
Paskaria Ati – Nomleni
Ribka Liu – Silla
Ferdinan Tefnai`,
  pengajar: `Grancia Caroline Bria
Lidya Camelia Kase, S.Pd
Susan Sabrina Selan, A.Md.T
Melani Lebriana Selan`
};

// GET struktur data (admin)
const getStruktur = async (req, res) => {
  try {
    let struktur = await Struktur.findOne();
    if (!struktur) {
      struktur = await Struktur.create(defaultStruktur).catch(() => defaultStruktur);
    }
    res.json(struktur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET struktur data publik
const getPublicStruktur = async (req, res) => {
  try {
    let struktur = await Struktur.findOne();
    if (!struktur) {
      struktur = await Struktur.create(defaultStruktur).catch(() => defaultStruktur);
    }
    res.json({
      periode: struktur.periode,
      ketua: struktur.ketua,
      wakilKetua: struktur.wakilKetua,
      sekretaris: struktur.sekretaris,
      wakilSekretaris: struktur.wakilSekretaris,
      bendahara: struktur.bendahara,
      wakilBendahara: struktur.wakilBendahara,
      penatua: struktur.penatua,
      diaken: struktur.diaken,
      pengajar: struktur.pengajar
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE/UPDATE struktur data (admin)
const saveStruktur = async (req, res) => {
  try {
    const {
      periode, ketua, wakilKetua, sekretaris, wakilSekretaris,
      bendahara, wakilBendahara, penatua, diaken, pengajar
    } = req.body;

    let struktur = await Struktur.findOne();

    if (struktur) {
      // Update existing
      struktur.periode = periode;
      struktur.ketua = ketua;
      struktur.wakilKetua = wakilKetua;
      struktur.sekretaris = sekretaris;
      struktur.wakilSekretaris = wakilSekretaris;
      struktur.bendahara = bendahara;
      struktur.wakilBendahara = wakilBendahara;
      struktur.penatua = penatua;
      struktur.diaken = diaken;
      struktur.pengajar = pengajar;
      await struktur.save();
    } else {
      // Create new
      struktur = new Struktur({
        periode,
        ketua,
        wakilKetua,
        sekretaris,
        wakilSekretaris,
        bendahara,
        wakilBendahara,
        penatua,
        diaken,
        pengajar
      });
      await struktur.save();
    }

    res.json({ message: 'Data struktur berhasil disimpan', struktur });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE custom struktur section (admin) - not implemented for now, using direct textarea edit
module.exports = {
  getStruktur,
  getPublicStruktur,
  saveStruktur
};
