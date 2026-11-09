// Global Storage (menggunakan API untuk data utama, fallback ke localStorage untuk demo)
let contentData = {
  sahaduta: {},
  gmit: {},
  pengumuman: [],
  struktur: {}
};

// Helper untuk mendapatkan API client dari api-client.js
function getApiClient() {
  if (typeof window !== 'undefined' && window.api) return window.api;
  if (typeof api !== 'undefined') return api;
  return null;
}

// Ensure window.api points to api instance
if (typeof window.api === 'undefined' && typeof api !== 'undefined') {
  window.api = api;
}

// ========== DEFAULT DATA TEMPLATES ==========
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

const defaultGMIT = {
  portugis: `Kedatangan bangsa-bangsa barat, khususnya Portugis dan Belanda di Indonesia didorong oleh berbagai motif. Motif yang mendorong bangsa Portugis ke Timor ialah kekristenan dan rempah-rempah. Sedangkan bangsa Belanda memiliki motif tambahan yakni faktor politis dan sosial. Agama Kristen dibawa ke NTT oleh orang Portugis. Mula-mula di Pulau Solor dan kemudian ke seluruh Pulau Flores dan Pulau Timor, bagian yang berdekatan dengan Pulau Solor, yaitu Lifao dan Dili. Jadi agama Kristen yang bercorak Roma katolik dibawa oleh para missionaris Portugis. Daerah-daerah dimana agama katolik merupakan jumlah terbesar masyarakat NTT kini ialah yang digarap lebih dulu oleh Portugis., yaitu di Pulau Flores dan dua kabupaten di Pulau Timor yakni Timor Tengah Utara dan Belu.

Tiga ordo memikul tugas misi di asia yaitu Ordo Fransiscan, Ordo Jesuit dan Ordo Dominikan. Yang bertugas di Pulau Solor, Flore dan Timor adalah Ordo Dominikan, tetapi segala usaha pengkristenan di Timor tidak jauh berbeda dengan di Maluku yang telah digariskan oleh Fransiskus Xaverius dari Ordo Jesuit yang tiba di Maluku pada tahun 1546.

Missionaris yang pertama tiba di Pulau Timor adalah Antonia de Taveiro pada tahun 1556. Pada tahun 1562 dikirim lagi para bruder. Setiap orang yang akan dibaptiskan hanya diharuskan mempelajari Credo, Pengakuan Dosa, Doa Bapa Kami, Salam Maria dan 10 perintah. Sistem pengkristenan pertama kali lebih ditekankan pada kuantitas dibanding kualitas. Akibatnya adalah banyaknya orang yang bersedia dibaptis namun selang beberapa waktu setelah dibaptis, mereka kembali ke dalam kekafirannya. Pengluasan penyebaran Injil oleh Portugis di NTT ini mulai menghadapi tantangan pada abad yang XVII dengan datangnya Belanda yang mendirikan bentengnya di Kupang, yang dinamainya "Fort Concordia" pada tahun 1613.`,
  belanda: `GEREJA PROTESTAN SELAMA PEMERINTAHAN BELANDA

1. Masa Oud Hollandse Zending (1614–1814)

Masa ini adalah masa yang paling panjang dari sejarah pekabaran Injil di Timor dan pulau-pulaunya. Sayangnya data-data mengenai masa ini sangat sedikit. Menurut sumber-sumber resmi, gereja di Indonesia termasuk Timor, dianggap sebagai bagian atau cabang dari gereja Belanda.

Sebagai pemerintah, VOC mempunyai tanggung jawab pemeliharaan dan penyebaran iman Kristen di Indonesia. Gereja di Indonesia harus merupakan copian yang persis sama dengan gereja di Nederland. Terus-menerus gereja di Indonesia diingatkan untuk mengikuti segala sesuatu yang dipraktekkan dalam gereja Belanda dan hidup menurut peraturan yang berlaku di sana. Pendeta Belanda yang pertama kali tiba di Kupang ialah Drs. Matheus Van der Broek pada tahun 1514. Corak gereja ialah Protestan (Hervormd). Sejalan dengan yang umum berlaku diutamakan pemeliharaan rohani pegawai VOC dalam Benteng Corcondia. Pekabaran Injil keluar benteng belum dilaksanakan secara sistematis dan serius kecuali bila ada waktu luang.

Pendeta Van der Broek harus cepat pulang. Kemudian pulau dan jemaatnya dilupakan untuk lebih kurang 50 tahun. Pada tahun 1670 ditempatkan Ds. Key Sero Kind di Kupang. Belum lama ia diganti oleh Ds. A. Corpius tahun 1687 yang setahun kemudian wafat. Terhitung dari tahun 1688 sampai tahun 1730 hanya terdapat 8 kali perkunjungan oleh pendeta dari Batavia (Jakarta). Sekolah yang pertama kali didirikan di Timor ialah di Kupang tahun 1701. Jumlah muridnya sebanyak 22 orang. Sekolah itu diawasi oleh Majelis Gereja Kupang.

Statistik jemaat Kupang:
- Tahun 1702 jumlah anggota 54 orang
- Tahun 1719 jumlah anggota 84 orang
- Tahun 1729 jumlah anggota 460 orang
- Tahun 1753 jumlah anggota 1300 orang

Agama krieten kemudian menuju pulau Rote pada tahun 1739 yang dimulai oleh raja Thi. Mulanya ia ke Batavia untuk suatu urusan tetapi di sana ia berjumpa dengan agama Kristen. Sekembalinya ke Rote, ia dan rakyatnya meminta masuk Kristen. Kemudian disusul oleh raja Lole. Pada tahun 1760 jumlah orang Kristen di Rote sudah mencapai 5870 dengan 1445 murid sekolah.

Di pulau Sabu, agama Kristen masuk pada tahun 1758. Pada tahun 1766 sudah terdapat 5 jemaat yaitu Timu, Seba, Liae, dan Menia. Seringkali jemaat-jemaat di NTT tidak bergembala atau setidaknya tidak layani seperti seharusnya, tetapi Tuhan terus bertindak dan mereka dapat bertahan sampai abad ini.

2. Masa Nederlandse Zendeling Genootschap (1814–1860)

Pada abad XVII di Eropa barat muncul segolongan orang yang mementingkan saleh, sederhana, beribadat, mempelajari kitab suci serta giat mengajarkan pekabaran Injil. Aliran baru ini terkenal dengan nama Pietisme. Salah satu dari persekutuan PI di Indonesia dan di Timor adalah Nederlandse Zendeling Gennotschap (NZG) yang didirikan tanggal 19 desember 1799, tahun dimana VOC dibubarkan. NZG itu memainkan peranan yang sangat penting di pulau Timor sehingga perlu dibicarakan tersendiri.

Zendeling pertama yang tiba di Timor ialah R. Le Bruijn tahun 1819. Ia bekerja di Kupang sampai wafatnya pada tahun 1829. Pada saat kedatangannya di Kupang keadaan jemaat sangat menyedihkan. Gedung gereja telah roboh dalam tahun 1813 dan kebaktian-kebaktian diadakan di bawah pohon-pohon atau rumah darurat. Ia menghadapi perlawanan dari pegawai-pegawai pemerintah tetapi ia tidak mundur. Dalam waktu 10 tahun ia mencapai hasil-hasil yang memuaskan:
1. Membina kembali jemaat Kupang yang terlantar
2. Menghidupkan kembali kebaktian-kebaktian
3. Mengembangkan perkunjungan rumah tangga
4. Menghimpun dana untuk membangun gedung gereja baru
5. Membaptis banyak orang baik dewasa maupun anak-anak
6. Membagi waktu untuk mengunjungi jemaat-jemaat di Rote dan Kisar, yang dilayani dari Kupang juga
7. Ia juga mengabarkan Injil dikalangan budak yang banyak memberi hasil dan kadang-kadang melalui budak-budak ini tuan-tuannya dapat ditarik kepada Kristus
8. Ia membuka lagi sekolah-sekolah yang sudah ditutup di Kupang dan Rote
9. Dengan bantuan Residen Hessert dapat dibangun satu rumah piatu

Pendeta-pendeta selanjutnya yang dikirim dari Belanda meneruskan pekerjaan NZG. Ada yang berhasil, ada yang tidak, ada yang harus cepat pulang karena sakit, dan ada yang meninggal dunia. Guru-guru sekolah, ada yang merangkap sebagai guru jemaat dan dididik di Kwekschool di Ambon. Oleh karena itu, "pola Ambon" sangat mempengaruhi jemaat-jemaat dan kehidupan di Timor. Sama seperti di Ambon dan Minahasa, juga di Timor bahasa Melayu dianggap dan dipakai sebagai bahasa gereja dan bahasa sekolah resmi.

3. Masa Indische Kerk (1860–1941)

Indische Kerk yang merupakan gereja negara yang dibentuk di Indonesia pada tahun 1817. Gereja dijadikan suatu lembaga administrasi negara yang mengurus soal-soal rohani. Gereja bergantung pada negara dalam segala hal. Pengurus Indische Kerk dilantik oleh gurbenur jenderal. Pengurus itu yang disebut Kerk Bestuur berkedudukan di Batavia. Pengangkatan pendeta diusul oleh pengurus itu. Tiap-tiap pendeta, syamas dan jemaat harus disyahkan oleh gubernur jendral. Indische Kerk tidak mau mempropagandakan ajaran-ajaran tertentu. Indische Kerk tidak menjadi gereja Gereformeerd atau Hervormd tetapi Protestan. Prinsip-prinsip dari Indische Kerk ialah Protestantisme.

Tujuan utama dari Kerk Bestuur ialah memperhatikan kepentingan, baik dari agama Kristen pada umumnya maupun dari gereja Protestan. Khususnya memperkembangkan pengetahuan agamiah, memajukan adat kebiasaan Kristen, menjaga keamanan dan kerukunan, menanamkan rasa cinta terhadap pemerintah dan tanah air. Dalam tujuan itu hampir-hampir tidak terdapat unsur kerygama Perjanjian Baru. Kerygama itu dirubah dan disesuaikan dengan situasi baru. Maksud ajaran Indische Kerk yakni memperlengkapi anggota-anggotanya dengan nilai-nilai religius dan ethis.

Tokoh-tokoh gereja pada akhir XIX ialah Donselaar dan J.J Niks. Donselaar bekerja sejak NZG berdiri, dan tetap bekerja di Timor sampai wafatnya pada tahun 1883. J.J Niks ditempatkan di Babau dan bekerja disana antara tahun 1874 dan tahun 1894.

Pada tahun 1890 di Rote ditempatkan Ds. J.J Le Grand. Pada tahun 1895 Le Grand menerbitkan kitab Injil Lukas dalam bahasa Rote dan untuk pertama kali khotbah dibuat dalam bahasa Rote. Le Grand juga mendidik siswa untuk menjadi Indlands Leraar (guru pribumi). Atas usahanya dibuka di Rote tahun 1902 sebuah sekolah guru Injil yang disebut STOVIL (School Tot Opeleiding Voor Inslands Leraar).

Pada tahun 1910 di Kupang ditempatkan seorang predikant Voorzitter yang memimpin gereja di seluruh keresidenan Timor, yaitu Ds. William Black. Ia mengusahakan PI di pulau Alor pada tahun 1911. Ds. Groothius berkedudukan di Babau. Ia berusaha menterjemahkan Injil ke dalam bahasa Timor dan berkhotbah dalam bahasa Timor. Pada tahun 1916 Injil baru mulai masuk ke pedalaman Timor. Di pulau Timor pada tahun 1922 tiba Ds. P. Middelkoop yang khususnya mengadakan penelitian mengenai bahasa Timor serta buku-buku nyanyian gereja.

Pada tahun 1922 Stovil dipindahkan ke Kupang dalam tahun 1931 Stovil ditutup oleh gereja sebab timbulnya sesuatu gerakan (yang ditanggapi oleh pimpinan sebagai nasionalisme). Kemudian dibuka lagi sebagai suatu sekolah Theologia di Soe tahun 1936 dan berlangsung sampai perang dunia kedua. Jumlah anggota Kristen di TTS pada tahun 1920 hanya 200 orang saja. Sesudah perang dunia II jumlah meningkat menjadi 80.000 orang.

Di Alor Ds. Binkhuisen memberi banyak perhatian pada bidang pendidikan. Penggantinya Ds. Van Daalen telah membaptiskan ribuan orang antara 1923-1924. Hanya dua orang, yaitu Boeken Kruger dan Mollema tinggal lebih dua atau tiga tahun di Alor. Banyak tenaga jatuh sakit sebab keadaan kesehatan di Alor amat berat bagi orang barat. Tetapi atas usaha orang-orang ini hampir setiap tempat di Alor ada gereja, sekolah dan pesanggrahan, dan kadang-kadang di tempatkan seorang Island Leraar yang bertugas sebagai pendeta dan pengawas sekolah.

Di Pulau Flores juga terdapat beberapa jemaat, khususnya di kota-kota yang dikunjungi dua kali setahun dari Kupang. Begitu juga di beberapa kota sumbawa timur.`,
  jepang: `GEREJA PADA MASA PENDUDUKAN JEPANG (1942–1945)

Pendaratan pasukan Jepang di Kupang (awal 1942) mengakhiri administrasi Hindia Belanda di NTT. Banyak tenaga Belanda ditahan sehingga pelayanan resmi terganggu. Para pelayan gereja kemudian bergantung pada dukungan jemaat setempat dan sering harus mencari nafkah tambahan (bertani, berkebun).

Untuk mengatur urusan gerejawi dibentuk Badan Gereja Timor Selatan dengan susunan pengurus sebagai berikut:
- Ketua: Bapak N. Nisnoni (Raja Kupang)
- Wakil Ketua: Bapak Arnoldus (Kota Kupang)
- Sekretaris: Pdt. E. Tokoh
- Bendahara: Bapak Habel (Oeba)
- Anggota: Penantua Kafin (Oeba) dan tokoh-tokoh lokal lain

Badan ini juga mengatur penggajian lokal (contoh: pendeta Rp.50/bulan), pengangkatan pelayan, pengawasan sekolah, serta pengelolaan sumbangan. Meski masa ini penuh kesulitan dan beberapa pelayan menjadi korban, gereja berhasil bertahan hingga akhir perang.`,
  pragmit: `SITUASI MENJELANG PEMBENTUKAN GMIT (1945–1947)

Setelah Perang Dunia II timbul tuntutan agar gereja-gereja di kepulauan memperoleh status otonom. Komisi-komisi persiapan dan tokoh-tokoh lokal bekerja menyiapkan konstitusi gereja setempat.

Pada 31 Oktober 1947, hasil persiapan tersebut mewujud menjadi gereja yang berdiri sendiri bernama Gereja Masehi Injili di Timor (GMIT). Sinode pertama GMIT terdiri dari enam klasis dan beberapa jemaat mandiri.

Klasis dan jemaat awal:
1. Klasis Kupang (Kupang & Amarasi)
2. Klasis Camplong (Fatuleu & Amfoang)
3. Klasis Soe (Amanuban, Amanatun, Mollo, TTU & Belu)
4. Klasis Alor/Pantar
5. Klasis Rote
6. Klasis Sabu

Selain itu terdapat beberapa jemaat berdiri sendiri seperti Jemaat Kota Kupang, Jemaat Ende (Flores), dan Jemaat Sumbawa.`,
  modern: `MASA GEREJA MASEHI INJILI DI TIMOR (1947–KINI)

Periode awal (1947–1950) difokuskan pada konsolidasi struktur kepemimpinan, administrasi, dan tanggung jawab keuangan. GMIT kemudian mengembangkan tata gereja, pendidikan teologi, liturgi, serta pelayanan yang lebih kontekstual.

Ringkasan fase perkembangan:
- 1947–1950 — Konsolidasi dan penyesuaian tata gereja serta pemisahan finansial gereja dan negara
- 1950–1975 — Perluasan lembaga pendidikan, pengembangan liturgi, dan penguatan struktur sinode
- 1960–1970 — Periode dengan tantangan sosial-politik namun juga gerakan rohani lokal
- 1970–1975 — Peremajaan kepemimpinan dan dinamika pelayanan yang lebih intensif

GMIT terus beradaptasi dan mengembangkan pelayanan di berbagai wilayah Timor hingga saat ini, dengan peningkatan jumlah jemaat, kegiatan pendidikan, dan pelayanan sosial.`,
  customGMITSections: [],
  contentGMIT: {}
};

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

// Navigation
function navigateToSection(sectionId) {
  // Remove active class from all nav items and sections
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });

  // Add active class to clicked nav item and section
  const navItem = document.querySelector(`[data-section="${sectionId}"]`);
  const section = document.getElementById(sectionId);
  
  if (navItem && section) {
    navItem.classList.add('active');
    section.classList.add('active');
    
    // Update section title
    const titles = {
      'dashboard': 'Dashboard',
      'content-sahaduta': 'Content GMIT Yegar Sahaduta Bello',
      'content-gmit': 'Content Tentang GMIT',
      'pengumuman': 'Kelola Pengumuman',
      'struktur': 'Struktur Kepengurusan'
    };
    const titleEl = document.getElementById('section-title');
    if (titleEl) {
      titleEl.textContent = titles[sectionId] || 'Admin Panel';
    }
  }
}

// Event listeners for navigation & initialization
document.addEventListener('DOMContentLoaded', function() {
  // Navigation
  document.querySelectorAll('.nav-item:not(.logout)').forEach(item => {
    item.addEventListener('click', function(e) {
      const section = this.getAttribute('data-section');
      if (section) {
        e.preventDefault();
        navigateToSection(section);
      }
    });
  });

  // Logout
  const logoutBtn = document.querySelector('.nav-item.logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Anda yakin ingin logout?')) {
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        const client = getApiClient();
        if (client && typeof client.clearToken === 'function') {
          client.clearToken();
        }
        window.location.href = 'login.html';
      }
    });
  }

  // Load all data from API / localStorage
  loadAllData();
  
  // Load pengumuman list
  loadPengumumanList();
  
  // Update counters for textarea
  updateTextareaCounters();

  // Load custom sections when navigating to respective tabs
  const sahadutaLink = document.querySelector('[data-section="content-sahaduta"]');
  if (sahadutaLink) {
    sahadutaLink.addEventListener('click', function() {
      setTimeout(() => loadAdditionalSahadutaSections(), 200);
    });
  }

  const gmitLink = document.querySelector('[data-section="content-gmit"]');
  if (gmitLink) {
    gmitLink.addEventListener('click', function() {
      setTimeout(() => loadAdditionalGMITSections(), 200);
    });
  }
});

// Load all data from API with fallback to localStorage
async function loadAllData() {
  const client = getApiClient();

  if (client) {
    try {
      if (typeof client.getSahaduta === 'function') {
        const sahadutaData = await client.getSahaduta();
        if (sahadutaData && typeof sahadutaData === 'object' && Object.keys(sahadutaData).length > 0) {
          contentData.sahaduta = sahadutaData;
        }
      }
    } catch (e) {
      if (e.message && e.message.includes('tidak ditemukan')) {
        console.info('Data Sahaduta belum ada di API, menggunakan data default');
      } else {
        console.warn('Gagal memuat Sahaduta dari API:', e.message);
      }
    }

    try {
      if (typeof client.getGMIT === 'function') {
        const gmitData = await client.getGMIT();
        if (gmitData && typeof gmitData === 'object' && Object.keys(gmitData).length > 0) {
          contentData.gmit = gmitData;
        }
      }
    } catch (e) {
      if (e.message && e.message.includes('tidak ditemukan')) {
        console.info('Data GMIT belum ada di API, menggunakan data default');
      } else {
        console.warn('Gagal memuat GMIT dari API:', e.message);
      }
    }

    try {
      if (typeof client.getStruktur === 'function') {
        const strukturData = await client.getStruktur();
        if (strukturData && typeof strukturData === 'object' && Object.keys(strukturData).length > 0) {
          contentData.struktur = strukturData;
        }
      }
    } catch (e) {
      if (e.message && e.message.includes('tidak ditemukan')) {
        console.info('Data Struktur belum ada di API, menggunakan data default');
      } else {
        console.warn('Gagal memuat Struktur dari API:', e.message);
      }
    }
  }

  // Fallback to localStorage if API data missing or empty
  const savedData = localStorage.getItem('gmitAdminData');
  if (savedData) {
    try {
      const local = JSON.parse(savedData);
      if (!contentData.sahaduta || Object.keys(contentData.sahaduta).length === 0) {
        contentData.sahaduta = local.sahaduta || {};
      }
      if (!contentData.gmit || Object.keys(contentData.gmit).length === 0) {
        contentData.gmit = local.gmit || {};
      }
      if (!contentData.struktur || Object.keys(contentData.struktur).length === 0) {
        contentData.struktur = local.struktur || {};
      }
      if (local.customSahadutaSections && (!contentData.sahaduta.customSahadutaSections || contentData.sahaduta.customSahadutaSections.length === 0)) {
        contentData.sahaduta.customSahadutaSections = local.customSahadutaSections;
      }
      if (local.customGMITSections && (!contentData.gmit.customGMITSections || contentData.gmit.customGMITSections.length === 0)) {
        contentData.gmit.customGMITSections = local.customGMITSections;
      }
      if (local.contentSahaduta && !contentData.sahaduta.contentSahaduta) {
        contentData.sahaduta.contentSahaduta = local.contentSahaduta;
      }
      if (local.contentGMIT && !contentData.gmit.contentGMIT) {
        contentData.gmit.contentGMIT = local.contentGMIT;
      }
    } catch (err) {
      console.error('Error parsing localStorage:', err);
    }
  }

  // Default values if both API and localStorage are empty
  if (!contentData.sahaduta || Object.keys(contentData.sahaduta).length === 0) {
    contentData.sahaduta = JSON.parse(JSON.stringify(defaultSahaduta));
  }

  if (!contentData.gmit || Object.keys(contentData.gmit).length === 0) {
    contentData.gmit = JSON.parse(JSON.stringify(defaultGMIT));
  }

  if (!contentData.struktur || Object.keys(contentData.struktur).length === 0) {
    contentData.struktur = JSON.parse(JSON.stringify(defaultStruktur));
  }

  // Apply data to form fields
  applySahadutaData();
  applyGMITData();
  applyStrukturData();

  // Update dashboard
  updateDashboard();
}

// Apply sahaduta data to form fields
function applySahadutaData() {
  if (contentData.sahaduta) {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };
    setVal('sahaduta-gambaran', contentData.sahaduta.gambaran || '');
    setVal('sahaduta-pertumbuhan', contentData.sahaduta.pertumbuhan || '');
    setVal('sahaduta-pelayanan', contentData.sahaduta.pelayanan || '');
    setVal('stat-kk', contentData.sahaduta.statKK !== undefined ? contentData.sahaduta.statKK : 82);
    setVal('stat-jiwa', contentData.sahaduta.statJiwa !== undefined ? contentData.sahaduta.statJiwa : 322);
    setVal('stat-baptis', contentData.sahaduta.statBaptis !== undefined ? contentData.sahaduta.statBaptis : 241);
    
    // Load custom sections
    loadAdditionalSahadutaSections();
  }
}

// Apply gmit data to form fields
function applyGMITData() {
  if (contentData.gmit) {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };
    setVal('gmit-portugis', contentData.gmit.portugis || '');
    setVal('gmit-belanda', contentData.gmit.belanda || '');
    setVal('gmit-jepang', contentData.gmit.jepang || '');
    setVal('gmit-pragmit', contentData.gmit.pragmit || '');
    setVal('gmit-modern', contentData.gmit.modern || '');
    
    // Load custom sections
    loadAdditionalGMITSections();
  }
}

// Apply struktur data to form fields
function applyStrukturData() {
  if (contentData.struktur) {
    const s = contentData.struktur;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };
    setVal('struktur-periode', s.periode || '2024-2027');
    setVal('ketua', s.ketua || '');
    setVal('wakil-ketua', s.wakilKetua || '');
    setVal('sekretaris', s.sekretaris || '');
    setVal('wakil-sekretaris', s.wakilSekretaris || '');
    setVal('bendahara', s.bendahara || '');
    setVal('wakil-bendahara', s.wakilBendahara || '');
    setVal('penatua-list', s.penatua || '');
    setVal('diaken-list', s.diaken || '');
    setVal('pengajar-list', s.pengajar || '');
    
    // Update counters
    updateTextareaCounters();
  }
}

// Save all data to localStorage
function saveData() {
  localStorage.setItem('gmitAdminData', JSON.stringify(contentData));
}

// Save data to API
async function saveDataToAPI() {
  const client = getApiClient();
  if (!client || !client.isLoggedIn()) {
    console.warn('API client tidak tersedia atau belum login');
    return false;
  }
  try {
    if (typeof client.saveSahaduta === 'function') await client.saveSahaduta(contentData.sahaduta);
    if (typeof client.saveGMIT === 'function') await client.saveGMIT(contentData.gmit);
    if (typeof client.saveStruktur === 'function') await client.saveStruktur(contentData.struktur);
    showSuccessMessage('Semua data berhasil disimpan ke database!');
    return true;
  } catch (err) {
    console.error('Gagal save ke API:', err.message);
    return false;
  }
}

// Update dashboard stats
function updateDashboard() {
  const countEl = document.getElementById('pengumuman-count');
  if (countEl && Array.isArray(contentData.pengumuman)) {
    const activePengumuman = contentData.pengumuman.filter(p => p.aktif).length;
    countEl.textContent = `${activePengumuman} pengumuman aktif`;
  }
}

// ========== CONTENT SAHADUTA ==========
function loadCurrentSahaduta() {
  const savedData = localStorage.getItem('gmitAdminData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      if (data.sahaduta && Object.keys(data.sahaduta).length > 0) {
        if (confirm('Ada data yang sudah disimpan. Load dari data tersimpan atau dari website default?\n\nOK = Data Tersimpan\nCancel = Website Default')) {
          loadSahadutaFromStorage(data.sahaduta);
          showSuccessMessage('Content Sahaduta berhasil di-load dari data tersimpan!');
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  loadSahadutaFromStorage(defaultSahaduta);
  showSuccessMessage('Content Sahaduta website saat ini berhasil di-load! Anda bisa mengedit dan menyimpan perubahan.');
}

function loadSahadutaFromStorage(sahaduta) {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  setVal('sahaduta-gambaran', sahaduta.gambaran || '');
  setVal('sahaduta-pertumbuhan', sahaduta.pertumbuhan || '');
  setVal('sahaduta-pelayanan', sahaduta.pelayanan || '');
  setVal('stat-kk', sahaduta.statKK !== undefined ? sahaduta.statKK : 82);
  setVal('stat-jiwa', sahaduta.statJiwa !== undefined ? sahaduta.statJiwa : 322);
  setVal('stat-baptis', sahaduta.statBaptis !== undefined ? sahaduta.statBaptis : 241);
}

async function saveContentSahaduta() {
  if (!contentData.sahaduta) contentData.sahaduta = {};

  contentData.sahaduta = {
    ...contentData.sahaduta,
    gambaran: document.getElementById('sahaduta-gambaran')?.value || '',
    pertumbuhan: document.getElementById('sahaduta-pertumbuhan')?.value || '',
    pelayanan: document.getElementById('sahaduta-pelayanan')?.value || '',
    statKK: Number(document.getElementById('stat-kk')?.value) || 82,
    statJiwa: Number(document.getElementById('stat-jiwa')?.value) || 322,
    statBaptis: Number(document.getElementById('stat-baptis')?.value) || 241
  };

  // Save custom sections
  const customSections = contentData.sahaduta.customSahadutaSections || contentData.customSahadutaSections || [];
  if (customSections.length > 0) {
    if (!contentData.sahaduta.contentSahaduta) contentData.sahaduta.contentSahaduta = {};
    customSections.forEach(section => {
      const textarea = document.getElementById(`custom-sahaduta-${section.id}`);
      if (textarea) {
        contentData.sahaduta[section.id] = textarea.value;
        contentData.sahaduta.contentSahaduta[section.id] = textarea.value;
        section.content = textarea.value;
      }
    });
    contentData.sahaduta.customSahadutaSections = customSections;
  }

  // Backup to localStorage
  saveData();

  // Save to API if available
  const client = getApiClient();
  if (client && typeof client.saveSahaduta === 'function' && client.isLoggedIn()) {
    try {
      await client.saveSahaduta(contentData.sahaduta);
      showSuccessMessage('Content Sahaduta berhasil disimpan ke database!');
      updatePublicSahaduta();
      return;
    } catch (err) {
      console.warn('Gagal simpan ke API, tersimpan lokal:', err.message);
    }
  }

  showSuccessMessage('Content Sahaduta berhasil disimpan!');
  updatePublicSahaduta();
}

function previewSahaduta() {
  saveContentSahaduta();
  window.open('../tentangSAHADUTA.html', '_blank');
}

function updatePublicSahaduta() {
  console.log('Content Sahaduta updated');
}

// === SAHADUTA SECTION CUSTOM ===
function showAddSahadutaSection() {
  const form = document.getElementById('formAddSahadutaSection');
  if (form) {
    form.style.display = 'block';
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };
    setVal('newSahadutaSectionId', '');
    setVal('newSahadutaSectionLabel', '');
    setVal('newSahadutaSectionContent', '');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function cancelAddSahadutaSection() {
  const form = document.getElementById('formAddSahadutaSection');
  if (form) form.style.display = 'none';
}

async function saveNewSahadutaSection() {
  const sectionId = document.getElementById('newSahadutaSectionId')?.value.trim();
  const sectionLabel = document.getElementById('newSahadutaSectionLabel')?.value.trim();
  const sectionContent = document.getElementById('newSahadutaSectionContent')?.value.trim();

  if (!sectionId || !sectionLabel || !sectionContent) {
    alert('❌ Semua field harus diisi!');
    return;
  }

  // Validate ID format
  if (!/^[a-z0-9-]+$/.test(sectionId)) {
    alert('❌ ID Section hanya boleh menggunakan huruf kecil, angka, dan tanda minus (-)');
    return;
  }

  if (!contentData.sahaduta) contentData.sahaduta = {};
  if (!contentData.sahaduta.customSahadutaSections) contentData.sahaduta.customSahadutaSections = [];
  if (!contentData.sahaduta.contentSahaduta) contentData.sahaduta.contentSahaduta = {};

  const existingIds = ['gambaran-umum', 'pertumbuhan-jemaat', 'pelayanan'];
  if (existingIds.includes(sectionId) || contentData.sahaduta.customSahadutaSections.find(s => s.id === sectionId)) {
    alert('❌ ID Section sudah digunakan! Gunakan ID yang berbeda.');
    return;
  }

  const newSection = {
    id: sectionId,
    label: sectionLabel,
    content: sectionContent
  };

  contentData.sahaduta.customSahadutaSections.push(newSection);
  contentData.sahaduta.contentSahaduta[sectionId] = sectionContent;

  saveData();

  const client = getApiClient();
  if (client && typeof client.saveSahaduta === 'function' && client.isLoggedIn()) {
    try {
      await client.saveSahaduta(contentData.sahaduta);
    } catch (e) {
      console.warn('Gagal menyimpan custom section ke API:', e.message);
    }
  }

  alert('✅ Section baru berhasil ditambahkan!');
  cancelAddSahadutaSection();
  loadAdditionalSahadutaSections();
}

function loadAdditionalSahadutaSections() {
  const container = document.getElementById('additionalSahadutaSections');
  if (!container) return;

  const customSections = (contentData.sahaduta && contentData.sahaduta.customSahadutaSections) || 
                         contentData.customSahadutaSections || 
                         (JSON.parse(localStorage.getItem('gmitAdminData') || '{}').customSahadutaSections) || [];
  const contentMap = (contentData.sahaduta && contentData.sahaduta.contentSahaduta) || 
                     contentData.contentSahaduta || 
                     (JSON.parse(localStorage.getItem('gmitAdminData') || '{}').contentSahaduta) || {};

  if (customSections.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = '<hr style="margin: 30px -30px; border: none; border-top: 2px solid #e9ecef;">';
  customSections.forEach(section => {
    const content = contentMap[section.id] !== undefined ? contentMap[section.id] : section.content;
    html += `
      <div class="form-group">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
          <label for="custom-sahaduta-${section.id}" style="margin-bottom: 8px; text-align: left;">${section.label}</label>
          <button type="button" onclick="deleteCustomSahadutaSection('${section.id}')" class="btn btn-danger" style="padding: 6px 12px; font-size: 12px; margin: 0 0 8px 0; white-space: nowrap;">🗑️ Hapus</button>
        </div>
        <textarea id="custom-sahaduta-${section.id}" rows="6">${content || ''}</textarea>
      </div>
    `;
  });
  container.innerHTML = html;
}

async function deleteCustomSahadutaSection(sectionId) {
  if (!confirm('⚠️ Apakah Anda yakin ingin menghapus section ini? Perubahan akan disimpan otomatis.')) {
    return;
  }

  if (contentData.sahaduta && contentData.sahaduta.customSahadutaSections) {
    contentData.sahaduta.customSahadutaSections = contentData.sahaduta.customSahadutaSections.filter(s => s.id !== sectionId);
    if (contentData.sahaduta.contentSahaduta && contentData.sahaduta.contentSahaduta[sectionId]) {
      delete contentData.sahaduta.contentSahaduta[sectionId];
    }
  }

  saveData();

  const client = getApiClient();
  if (client && typeof client.deleteCustomSahadutaSection === 'function' && client.isLoggedIn()) {
    try {
      await client.deleteCustomSahadutaSection(sectionId);
    } catch (e) {
      console.warn('API delete section failed, fallback lokal:', e.message);
    }
  }

  alert('✅ Section berhasil dihapus!');
  loadAdditionalSahadutaSections();
}

// ========== CONTENT GMIT ==========
function loadCurrentGMIT() {
  const savedData = localStorage.getItem('gmitAdminData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      if (data.gmit && Object.keys(data.gmit).length > 0) {
        if (confirm('Ada data yang sudah disimpan. Load dari data tersimpan atau dari website default?\n\nOK = Data Tersimpan\nCancel = Website Default')) {
          loadGMITFromStorage(data.gmit);
          showSuccessMessage('Content GMIT berhasil di-load dari data tersimpan!');
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  loadGMITFromStorage(defaultGMIT);
  showSuccessMessage('Content GMIT website saat ini berhasil di-load! Anda bisa mengedit dan menyimpan perubahan.');
}

function loadGMITFromStorage(gmit) {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  setVal('gmit-portugis', gmit.portugis || '');
  setVal('gmit-belanda', gmit.belanda || '');
  setVal('gmit-jepang', gmit.jepang || '');
  setVal('gmit-pragmit', gmit.pragmit || '');
  setVal('gmit-modern', gmit.modern || '');
}

async function saveContentGMIT() {
  if (!contentData.gmit) contentData.gmit = {};

  contentData.gmit = {
    ...contentData.gmit,
    portugis: document.getElementById('gmit-portugis')?.value || '',
    belanda: document.getElementById('gmit-belanda')?.value || '',
    jepang: document.getElementById('gmit-jepang')?.value || '',
    pragmit: document.getElementById('gmit-pragmit')?.value || '',
    modern: document.getElementById('gmit-modern')?.value || ''
  };

  // Save custom sections
  const customSections = contentData.gmit.customGMITSections || contentData.customGMITSections || [];
  if (customSections.length > 0) {
    if (!contentData.gmit.contentGMIT) contentData.gmit.contentGMIT = {};
    customSections.forEach(section => {
      const textarea = document.getElementById(`custom-gmit-${section.id}`);
      if (textarea) {
        contentData.gmit[section.id] = textarea.value;
        contentData.gmit.contentGMIT[section.id] = textarea.value;
        section.content = textarea.value;
      }
    });
    contentData.gmit.customGMITSections = customSections;
  }

  // Backup to localStorage
  saveData();

  // Save to API if available
  const client = getApiClient();
  if (client && typeof client.saveGMIT === 'function' && client.isLoggedIn()) {
    try {
      await client.saveGMIT(contentData.gmit);
      showSuccessMessage('Content GMIT berhasil disimpan ke database!');
      updatePublicGMIT();
      return;
    } catch (err) {
      console.warn('Gagal simpan ke API, tersimpan lokal:', err.message);
    }
  }

  showSuccessMessage('Content GMIT berhasil disimpan!');
  updatePublicGMIT();
}

function previewGMIT() {
  saveContentGMIT();
  window.open('../tentangGMIT.html', '_blank');
}

function updatePublicGMIT() {
  console.log('Content GMIT updated');
}

// === GMIT SECTION CUSTOM ===
function showAddGMITSection() {
  const form = document.getElementById('formAddGMITSection');
  if (form) {
    form.style.display = 'block';
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };
    setVal('newGMITSectionId', '');
    setVal('newGMITSectionLabel', '');
    setVal('newGMITSectionContent', '');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function cancelAddGMITSection() {
  const form = document.getElementById('formAddGMITSection');
  if (form) form.style.display = 'none';
}

async function saveNewGMITSection() {
  const sectionId = document.getElementById('newGMITSectionId')?.value.trim();
  const sectionLabel = document.getElementById('newGMITSectionLabel')?.value.trim();
  const sectionContent = document.getElementById('newGMITSectionContent')?.value.trim();

  if (!sectionId || !sectionLabel || !sectionContent) {
    alert('❌ Semua field harus diisi!');
    return;
  }

  // Validate ID format
  if (!/^[a-z0-9-]+$/.test(sectionId)) {
    alert('❌ ID Periode hanya boleh menggunakan huruf kecil, angka, dan tanda minus (-)');
    return;
  }

  if (!contentData.gmit) contentData.gmit = {};
  if (!contentData.gmit.customGMITSections) contentData.gmit.customGMITSections = [];
  if (!contentData.gmit.contentGMIT) contentData.gmit.contentGMIT = {};

  const existingIds = ['portugis', 'belanda', 'jepang', 'pragmit', 'modern'];
  if (existingIds.includes(sectionId) || contentData.gmit.customGMITSections.find(s => s.id === sectionId)) {
    alert('❌ ID Periode sudah digunakan! Gunakan ID yang berbeda.');
    return;
  }

  const newSection = {
    id: sectionId,
    label: sectionLabel,
    content: sectionContent
  };

  contentData.gmit.customGMITSections.push(newSection);
  contentData.gmit.contentGMIT[sectionId] = sectionContent;

  saveData();

  const client = getApiClient();
  if (client && typeof client.saveGMIT === 'function' && client.isLoggedIn()) {
    try {
      await client.saveGMIT(contentData.gmit);
    } catch (e) {
      console.warn('Gagal menyimpan custom GMIT section ke API:', e.message);
    }
  }

  alert('✅ Periode baru berhasil ditambahkan!');
  cancelAddGMITSection();
  loadAdditionalGMITSections();
}

function loadAdditionalGMITSections() {
  const container = document.getElementById('additionalGMITSections');
  if (!container) return;

  const customSections = (contentData.gmit && contentData.gmit.customGMITSections) || 
                         contentData.customGMITSections || 
                         (JSON.parse(localStorage.getItem('gmitAdminData') || '{}').customGMITSections) || [];
  const contentMap = (contentData.gmit && contentData.gmit.contentGMIT) || 
                     contentData.contentGMIT || 
                     (JSON.parse(localStorage.getItem('gmitAdminData') || '{}').contentGMIT) || {};

  if (customSections.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = '<hr style="margin: 30px -30px; border: none; border-top: 2px solid #e9ecef;">';
  customSections.forEach(section => {
    const content = contentMap[section.id] !== undefined ? contentMap[section.id] : section.content;
    html += `
      <div class="form-group">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
          <label for="custom-gmit-${section.id}" style="margin-bottom: 8px; text-align: left;">${section.label}</label>
          <button type="button" onclick="deleteCustomGMITSection('${section.id}')" class="btn btn-danger" style="padding: 6px 12px; font-size: 12px; margin: 0 0 8px 0; white-space: nowrap;">🗑️ Hapus</button>
        </div>
        <textarea id="custom-gmit-${section.id}" rows="8">${content || ''}</textarea>
      </div>
    `;
  });
  container.innerHTML = html;
}

async function deleteCustomGMITSection(sectionId) {
  if (!confirm('⚠️ Apakah Anda yakin ingin menghapus periode ini? Perubahan akan disimpan otomatis.')) {
    return;
  }

  if (contentData.gmit && contentData.gmit.customGMITSections) {
    contentData.gmit.customGMITSections = contentData.gmit.customGMITSections.filter(s => s.id !== sectionId);
    if (contentData.gmit.contentGMIT && contentData.gmit.contentGMIT[sectionId]) {
      delete contentData.gmit.contentGMIT[sectionId];
    }
  }

  saveData();

  const client = getApiClient();
  if (client && typeof client.deleteCustomGMITSection === 'function' && client.isLoggedIn()) {
    try {
      await client.deleteCustomGMITSection(sectionId);
    } catch (e) {
      console.warn('API delete custom GMIT section failed, fallback lokal:', e.message);
    }
  }

  alert('✅ Periode berhasil dihapus!');
  loadAdditionalGMITSections();
}

// ========== PENGUMUMAN ==========
let editingPengumumanId = null;

async function loadPengumumanList() {
  const list = document.getElementById('pengumuman-list');
  if (!list) return;

  const client = getApiClient();

  // Try API first
  try {
    if (client && typeof client.getAnnouncements === 'function') {
      const announcements = await client.getAnnouncements();
      if (Array.isArray(announcements)) {
        contentData.pengumuman = announcements;
        updateDashboard();
      }
    }
  } catch (err) {
    console.warn('Pengumuman API unavailable, fallback localStorage:', err.message);
    const savedData = localStorage.getItem('gmitAdminData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.pengumuman && data.pengumuman.length > 0) {
          contentData.pengumuman = data.pengumuman;
          updateDashboard();
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  if (!contentData.pengumuman || contentData.pengumuman.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <h3>Belum ada pengumuman</h3>
        <p>Klik tombol "Tambah Pengumuman Baru" untuk membuat pengumuman pertama</p>
      </div>
    `;
    return;
  }

  // Sort by date (newest first)
  const sorted = [...contentData.pengumuman].sort((a, b) => 
    new Date(b.tanggal) - new Date(a.tanggal)
  );

  list.innerHTML = sorted.map(p => `
    <div class="pengumuman-item">
      <div class="pengumuman-content">
        <div>
          <span class="kategori-badge kategori-${p.kategori}">${getKategoriLabel(p.kategori)}</span>
          <span class="status-badge status-${p.aktif ? 'aktif' : 'nonaktif'}">
            ${p.aktif ? 'Aktif' : 'Nonaktif'}
          </span>
        </div>
        <h3>${p.judul}</h3>
        <div class="pengumuman-meta">
          <span class="meta-item">📅 ${formatDate(p.tanggal)}</span>
          ${p.waktu ? `<span class="meta-item">🕐 ${p.waktu}</span>` : ''}
          ${p.lokasi ? `<span class="meta-item">📍 ${p.lokasi}</span>` : ''}
        </div>
        <p class="pengumuman-deskripsi">${p.deskripsi}</p>
        <div class="pengumuman-actions">
          <button class="btn btn-secondary" onclick="editPengumuman('${p._id || p.id}')">Edit</button>
          <button class="btn btn-danger" onclick="deletePengumuman('${p._id || p.id}')">Hapus</button>
        </div>
      </div>
    </div>
  `).join('');
}

function showAddPengumumanModal() {
  editingPengumumanId = null;
  const title = document.getElementById('modal-title');
  if (title) title.textContent = 'Tambah Pengumuman Baru';
  const form = document.getElementById('pengumuman-form');
  if (form) form.reset();
  const aktif = document.getElementById('pengumuman-aktif');
  if (aktif) aktif.checked = true;
  const modal = document.getElementById('pengumuman-modal');
  if (modal) modal.classList.add('active');
}

function editPengumuman(id) {
  const pengumuman = (contentData.pengumuman || []).find(p => (p._id || p.id) == id);
  if (!pengumuman) return;

  editingPengumumanId = id;
  const title = document.getElementById('modal-title');
  if (title) title.textContent = 'Edit Pengumuman';

  const setVal = (elemId, val) => {
    const el = document.getElementById(elemId);
    if (el) el.value = val;
  };

  setVal('pengumuman-id', id);
  setVal('pengumuman-judul', pengumuman.judul || '');
  setVal('pengumuman-kategori', pengumuman.kategori || 'umum');
  setVal('pengumuman-tanggal', pengumuman.tanggal ? pengumuman.tanggal.substring(0, 10) : '');
  setVal('pengumuman-waktu', pengumuman.waktu || '');
  setVal('pengumuman-lokasi', pengumuman.lokasi || '');
  setVal('pengumuman-deskripsi', pengumuman.deskripsi || '');

  const aktif = document.getElementById('pengumuman-aktif');
  if (aktif) aktif.checked = !!pengumuman.aktif;

  const modal = document.getElementById('pengumuman-modal');
  if (modal) modal.classList.add('active');
}

async function deletePengumuman(id) {
  if (!confirm('Anda yakin ingin menghapus pengumuman ini?')) return;

  const client = getApiClient();

  try {
    if (client && typeof client.deleteAnnouncement === 'function' && client.isLoggedIn()) {
      await client.deleteAnnouncement(id);
      await loadPengumumanList();
      showSuccessMessage('Pengumuman berhasil dihapus!');
      return;
    }
    throw new Error('API client tidak tersedia atau belum login');
  } catch (err) {
    console.warn('Delete via API gagal, fallback localStorage:', err.message);
    contentData.pengumuman = (contentData.pengumuman || []).filter(p => (p._id || p.id) != id);
    saveData();
    await loadPengumumanList();
    updateDashboard();
    showSuccessMessage('Pengumuman berhasil dihapus (fallback lokal)!');
  }
}

function closePengumumanModal() {
  const modal = document.getElementById('pengumuman-modal');
  if (modal) modal.classList.remove('active');
  editingPengumumanId = null;
}

async function savePengumuman(event) {
  event.preventDefault();

  const formData = {
    judul: document.getElementById('pengumuman-judul')?.value || '',
    kategori: document.getElementById('pengumuman-kategori')?.value || 'umum',
    tanggal: document.getElementById('pengumuman-tanggal')?.value || '',
    waktu: document.getElementById('pengumuman-waktu')?.value || '',
    lokasi: document.getElementById('pengumuman-lokasi')?.value || '',
    deskripsi: document.getElementById('pengumuman-deskripsi')?.value || '',
    aktif: document.getElementById('pengumuman-aktif')?.checked ?? true
  };

  const client = getApiClient();

  try {
    if (client && typeof client.createAnnouncement === 'function' && client.isLoggedIn()) {
      if (editingPengumumanId) {
        await client.updateAnnouncement(editingPengumumanId, formData);
      } else {
        await client.createAnnouncement(formData);
      }
      await loadPengumumanList();
      closePengumumanModal();
      showSuccessMessage(editingPengumumanId ? 'Pengumuman berhasil diupdate!' : 'Pengumuman berhasil ditambahkan!');
      return;
    }
    throw new Error('API client belum dimuat atau belum login');
  } catch (err) {
    console.warn('Save via API gagal, fallback localStorage:', err.message);
    const localData = { id: editingPengumumanId || Date.now(), ...formData };
    if (!contentData.pengumuman) contentData.pengumuman = [];
    if (editingPengumumanId) {
      const index = contentData.pengumuman.findIndex(p => (p._id || p.id) == editingPengumumanId);
      if (index >= 0) contentData.pengumuman[index] = localData;
    } else {
      contentData.pengumuman.push(localData);
    }
    saveData();
    await loadPengumumanList();
    updateDashboard();
    closePengumumanModal();
    showSuccessMessage('Pengumuman disimpan (fallback lokal).');
  }
}

function getKategoriLabel(kategori) {
  const labels = {
    'kegiatan': 'Kegiatan Gereja',
    'perjamuan': 'Jadwal Perjamuan',
    'irt': 'Ibadah Rumah Tangga',
    'umum': 'Pengumuman Umum'
  };
  return labels[kategori] || kategori;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

// ========== STRUKTUR ==========
function loadCurrentStruktur() {
  const savedData = localStorage.getItem('gmitAdminData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      if (data.struktur && Object.keys(data.struktur).length > 0) {
        if (confirm('Ada data yang sudah disimpan. Load dari data tersimpan atau dari website default?\n\nOK = Data Tersimpan\nCancel = Website Default')) {
          loadStrukturFromStorage(data.struktur);
          showSuccessMessage('Data struktur berhasil di-load dari data tersimpan!');
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  loadStrukturFromStorage(defaultStruktur);
  showSuccessMessage('Data struktur website saat ini berhasil di-load! Anda bisa mengedit dan menyimpan perubahan.');
}

function loadStrukturFromStorage(struktur) {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  setVal('struktur-periode', struktur.periode || '');
  setVal('ketua', struktur.ketua || '');
  setVal('wakil-ketua', struktur.wakilKetua || '');
  setVal('sekretaris', struktur.sekretaris || '');
  setVal('wakil-sekretaris', struktur.wakilSekretaris || '');
  setVal('bendahara', struktur.bendahara || '');
  setVal('wakil-bendahara', struktur.wakilBendahara || '');
  setVal('penatua-list', struktur.penatua || '');
  setVal('diaken-list', struktur.diaken || '');
  setVal('pengajar-list', struktur.pengajar || '');

  // Update counters
  updateTextareaCounters();
}

async function saveStruktur() {
  contentData.struktur = {
    periode: document.getElementById('struktur-periode')?.value || '2024-2027',
    ketua: document.getElementById('ketua')?.value || '',
    wakilKetua: document.getElementById('wakil-ketua')?.value || '',
    sekretaris: document.getElementById('sekretaris')?.value || '',
    wakilSekretaris: document.getElementById('wakil-sekretaris')?.value || '',
    bendahara: document.getElementById('bendahara')?.value || '',
    wakilBendahara: document.getElementById('wakil-bendahara')?.value || '',
    penatua: document.getElementById('penatua-list')?.value || '',
    diaken: document.getElementById('diaken-list')?.value || '',
    pengajar: document.getElementById('pengajar-list')?.value || ''
  };

  saveData();

  const client = getApiClient();
  if (client && typeof client.saveStruktur === 'function' && client.isLoggedIn()) {
    try {
      await client.saveStruktur(contentData.struktur);
      showSuccessMessage('Struktur kepengurusan berhasil disimpan ke database!');
      updatePublicStruktur();
      return;
    } catch (err) {
      console.warn('Gagal simpan ke API, tersimpan lokal:', err.message);
    }
  }

  showSuccessMessage('Struktur kepengurusan berhasil disimpan!');
  updatePublicStruktur();
}

function previewStruktur() {
  saveStruktur();
  window.open('../Profil.gereja.html#majelis', '_blank');
}

function updatePublicStruktur() {
  console.log('Struktur updated');
}

// ========== UTILITIES ==========
function showSuccessMessage(message) {
  let successDiv = document.querySelector('.success-message');
  if (!successDiv) {
    successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    const content = document.querySelector('.admin-content');
    if (content) {
      content.insertBefore(successDiv, content.firstChild);
    } else {
      document.body.appendChild(successDiv);
    }
  }

  successDiv.textContent = message;
  successDiv.classList.add('show');

  setTimeout(() => {
    successDiv.classList.remove('show');
  }, 3000);
}

function updateTextareaCounters() {
  const updateList = (inputId, counterId, label) => {
    const el = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    if (!el || !counter) return;

    const count = () => {
      const lines = el.value.split('\n').filter(line => line.trim() !== '');
      counter.textContent = `${lines.length} ${label}`;
    };

    count();

    if (!el._hasCounterListener) {
      el.addEventListener('input', count);
      el._hasCounterListener = true;
    }
  };

  updateList('penatua-list', 'penatua-counter', 'penatua');
  updateList('diaken-list', 'diaken-counter', 'diaken');
  updateList('pengajar-list', 'pengajar-counter', 'pengajar');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('pengumuman-modal');
  if (modal && event.target === modal) {
    closePengumumanModal();
  }
});
