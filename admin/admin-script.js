// Global Storage (menggunakan localStorage untuk demo)
let contentData = {
  sahaduta: {},
  gmit: {},
  pengumuman: [],
  struktur: {}
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
    document.getElementById('section-title').textContent = titles[sectionId] || 'Admin Panel';
  }
}

// Event listeners for navigation
document.addEventListener('DOMContentLoaded', function() {
  // Navigation
  document.querySelectorAll('.nav-item:not(.logout)').forEach(item => {
    item.addEventListener('click', function(e) {
      const section = this.getAttribute('data-section');

      // If this nav item controls in-page sections, handle via JS.
      // Otherwise (e.g., links to other HTML pages), let the browser navigate.
      if (section) {
        e.preventDefault();
        navigateToSection(section);
      }
    });
  });

  // Logout
  document.querySelector('.nav-item.logout').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Anda yakin ingin logout?')) {
      // Clear session
      sessionStorage.removeItem('adminLoggedIn');
      sessionStorage.removeItem('adminUsername');
      // Redirect to login
      window.location.href = 'login.html';
    }
  });

  // Load data
  loadAllData();
  
  // Load pengumuman list
  loadPengumumanList();
  
  // Load custom sections if any
  loadAdditionalSahadutaSections();
  loadAdditionalGMITSections();
  
  // Update counters for textarea
  updateTextareaCounters();
});

// Load all data from localStorage
function loadAllData() {
  const savedData = localStorage.getItem('gmitAdminData');
  if (savedData) {
    contentData = JSON.parse(savedData);
  }
  
  // Load content Sahaduta
  if (contentData.sahaduta) {
    document.getElementById('sahaduta-gambaran').value = contentData.sahaduta.gambaran || '';
    document.getElementById('sahaduta-pertumbuhan').value = contentData.sahaduta.pertumbuhan || '';
    document.getElementById('sahaduta-pelayanan').value = contentData.sahaduta.pelayanan || '';
    document.getElementById('stat-kk').value = contentData.sahaduta.statKK || 82;
    document.getElementById('stat-jiwa').value = contentData.sahaduta.statJiwa || 322;
    document.getElementById('stat-baptis').value = contentData.sahaduta.statBaptis || 241;
  }
  
  // Load content GMIT
  if (contentData.gmit) {
    document.getElementById('gmit-portugis').value = contentData.gmit.portugis || '';
    document.getElementById('gmit-belanda').value = contentData.gmit.belanda || '';
    document.getElementById('gmit-jepang').value = contentData.gmit.jepang || '';
    document.getElementById('gmit-pragmit').value = contentData.gmit.pragmit || '';
    document.getElementById('gmit-modern').value = contentData.gmit.modern || '';
  }
  
  // Load struktur
  if (contentData.struktur) {
    document.getElementById('struktur-periode').value = contentData.struktur.periode || '2024-2027';
    document.getElementById('ketua').value = contentData.struktur.ketua || '';
    document.getElementById('wakil-ketua').value = contentData.struktur.wakilKetua || '';
    document.getElementById('sekretaris').value = contentData.struktur.sekretaris || '';
    document.getElementById('wakil-sekretaris').value = contentData.struktur.wakilSekretaris || '';
    document.getElementById('bendahara').value = contentData.struktur.bendahara || '';
    document.getElementById('wakil-bendahara').value = contentData.struktur.wakilBendahara || '';
    document.getElementById('penatua-list').value = contentData.struktur.penatua || '';
    document.getElementById('diaken-list').value = contentData.struktur.diaken || '';
    document.getElementById('pengajar-list').value = contentData.struktur.pengajar || '';
  }
  
  // Update dashboard
  updateDashboard();
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('gmitAdminData', JSON.stringify(contentData));
}

// Update dashboard stats
function updateDashboard() {
  const activePengumuman = contentData.pengumuman.filter(p => p.aktif).length;
  document.getElementById('pengumuman-count').textContent = `${activePengumuman} pengumuman aktif`;
}

// ========== CONTENT SAHADUTA ==========
function loadCurrentSahaduta() {
  // Load dari localStorage dulu
  const savedData = localStorage.getItem('gmitAdminData');
  if (savedData) {
    const data = JSON.parse(savedData);
    if (data.sahaduta && Object.keys(data.sahaduta).length > 0) {
      // Ada data di localStorage, tanya user mau load dari mana
      if (confirm('Ada data yang sudah disimpan. Load dari data tersimpan atau dari website default?\n\nOK = Data Tersimpan\nCancel = Website Default')) {
        // Load from localStorage
        loadSahadutaFromStorage(data.sahaduta);
        showSuccessMessage('Content Sahaduta berhasil di-load dari data tersimpan!');
        return;
      }
    }
  }
  
  // Load from default website data
  const defaultSahaduta = {
    gambaran: `Jemaat GMIT Yegar Sahaduta Bello bermula dari sebuah Pos Pelayanan yang lahir sebagai wujud ucapan syukur kepada Tuhan atas jawaban doa dari beberapa keluarga di wilayah Kelurahan Bello, Kota Kupang sekitar tahun 2010. Gagasan ini mendapat dukungan warga setempat. Dengan semangat kebersamaan dan gotong royong, pembangunan fisik gedung gereja dimulai Mei 2012 dan selesai Juni 2013. Ibadah pertama diadakan 15 Juli 2013 dan Pos Pelayanan secara resmi dibuka dalam kebaktian perdana 22 September 2013.

Setelah melalui proses pembinaan dan dukungan Majelis Klasis Kupang Barat, Pos Pelayanan ini ditetapkan menjadi jemaat mandiri oleh Majelis Sinode GMIT pada 22 September 2019.`,
    pertumbuhan: `Pada masa awal (2013) tercatat 17 KK dengan 35 jiwa. Saat pemandirian (2019) jumlah meningkat menjadi 55 KK. Perkembangan berlanjut menjadi 62 KK hingga 2022. Jumlah baptis, sidi dan statistik lainnya mengalami kenaikan hingga tercatat 82 KK dan sensus sementara 322 jiwa (Mei 2025).`,
    pelayanan: `Jemaat aktif menyelenggarakan ibadah Minggu, persekutuan doa, dan kegiatan pelayanan sosial/diakonia. Informasi jadwal dan pengumuman tersedia di halaman Informasi serta melalui kontak majelis jemaat.`,
    statKK: 82,
    statJiwa: 322,
    statBaptis: 241
  };
  
  loadSahadutaFromStorage(defaultSahaduta);
  showSuccessMessage('Content Sahaduta website saat ini berhasil di-load! Anda bisa mengedit dan menyimpan perubahan.');
}

function loadSahadutaFromStorage(sahaduta) {
  document.getElementById('sahaduta-gambaran').value = sahaduta.gambaran || '';
  document.getElementById('sahaduta-pertumbuhan').value = sahaduta.pertumbuhan || '';
  document.getElementById('sahaduta-pelayanan').value = sahaduta.pelayanan || '';
  document.getElementById('stat-kk').value = sahaduta.statKK || 82;
  document.getElementById('stat-jiwa').value = sahaduta.statJiwa || 322;
  document.getElementById('stat-baptis').value = sahaduta.statBaptis || 241;
}

function saveContentSahaduta() {
  contentData.sahaduta = {
    gambaran: document.getElementById('sahaduta-gambaran').value,
    pertumbuhan: document.getElementById('sahaduta-pertumbuhan').value,
    pelayanan: document.getElementById('sahaduta-pelayanan').value,
    statKK: document.getElementById('stat-kk').value,
    statJiwa: document.getElementById('stat-jiwa').value,
    statBaptis: document.getElementById('stat-baptis').value
  };

  // Save custom sections
  if (contentData.customSahadutaSections && contentData.customSahadutaSections.length > 0) {
    contentData.customSahadutaSections.forEach(section => {
      const textarea = document.getElementById(`custom-sahaduta-${section.id}`);
      if (textarea) {
        contentData.sahaduta[section.id] = textarea.value;
        section.content = textarea.value;
      }
    });
  }

  // Make sure contentSahaduta exists for public page
  if (!contentData.contentSahaduta) {
    contentData.contentSahaduta = {};
  }
  contentData.contentSahaduta['gambaran-umum'] = contentData.sahaduta.gambaran;
  contentData.contentSahaduta['pertumbuhan-jemaat'] = contentData.sahaduta.pertumbuhan;
  contentData.contentSahaduta['pelayanan'] = contentData.sahaduta.pelayanan;
  
  // Add custom sections to contentSahaduta
  if (contentData.customSahadutaSections) {
    contentData.customSahadutaSections.forEach(section => {
      contentData.contentSahaduta[section.id] = section.content;
    });
  }
  
  saveData();
  showSuccessMessage('Content Sahaduta berhasil disimpan!');
  
  // Update public page
  updatePublicSahaduta();
}

function previewSahaduta() {
  // Save first
  saveContentSahaduta();
  // Open in new tab
  window.open('../tentangSAHADUTA.html', '_blank');
}

function updatePublicSahaduta() {
  // This function will be called when saving
  // The actual page will read from localStorage on load
  console.log('Content Sahaduta updated');
}

// ========== CONTENT GMIT ==========
function loadCurrentGMIT() {
  // Load dari localStorage dulu
  const savedData = localStorage.getItem('gmitAdminData');
  if (savedData) {
    const data = JSON.parse(savedData);
    if (data.gmit && Object.keys(data.gmit).length > 0) {
      // Ada data di localStorage, tanya user mau load dari mana
      if (confirm('Ada data yang sudah disimpan. Load dari data tersimpan atau dari website default?\n\nOK = Data Tersimpan\nCancel = Website Default')) {
        // Load from localStorage
        loadGMITFromStorage(data.gmit);
        showSuccessMessage('Content GMIT berhasil di-load dari data tersimpan!');
        return;
      }
    }
  }
  
  // Load from default website data
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

Pada abad XVII di Eropa barat muncul segolongan orang yang mementingkan saleh, sederhana, beribadat, mempelajari kitab suci serta giat mengajarkan pekabaran Injil. Aliran baru ini terkenal dengan nama Pietisme. Salah satu dari persekutuan PI di Indonesia dan di Timor adalah Nederlandse Zendeling Gennotschap (NZG) yang didirikan tanggal 19 desember 1799, tahun dimana VOC dibubarkan. NZG itu memainkan peranan yang sangat penting di pulau Timor selama lebih kurang 40 tahun, tetapi di Sabu jauh lebih lama.

Cara NZG berbeda dengan Oud Hollandse Zending. Dengan sadar NZG tidak mau melanjutkan propaganda gerakan atau ajaran tertentu, supaya dengan jalan itu mendirikan suatu tipe gereja yang tertentu. Yang ia mau lakukan ialah hanya mengajarkan prinsip-prinsip agama Kristen yang benar kepada orang-orang kafir.

Tenaga NZG yang pertama ialah Dws. R. Le Bruyn. Ia tiba di Kupang pada tahun 1819. Dikarenakan keadaan daerah yang buruk dan fisiknya lemah, maka sepuluh tahun kemudian ia meninggal dunia yakni 21 Mei 1929. Walaupun demikian hasil karyanya tetap cemerlang di Timor.

Yang dikerjakan oleh Ds. R. Le Bruyn:
1. Mengunjungi anggota jemaat di sekitar Kupang dan Babau, terletak 16 km dari Kupang
2. Menterjemahkan thalil ke dalam bahasa Melayu
3. Mengarang buku-buku yang berguna bagi PI
4. Mendirikan lembaga Alkitab Hindia Belanda
5. Mengumpulkan orang untuk memperbaiki gedung gereja Kupang yang sudah ditinggalkan sejak 1797
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

GMIT terus beradaptasi dan mengembangkan pelayanan di berbagai wilayah Timor hingga saat ini, dengan peningkatan jumlah jemaat, kegiatan pendidikan, dan pelayanan sosial.`
  };
  
  loadGMITFromStorage(defaultGMIT);
  showSuccessMessage('Content GMIT website saat ini berhasil di-load! Anda bisa mengedit dan menyimpan perubahan.');
}

function loadGMITFromStorage(gmit) {
  document.getElementById('gmit-portugis').value = gmit.portugis || '';
  document.getElementById('gmit-belanda').value = gmit.belanda || '';
  document.getElementById('gmit-jepang').value = gmit.jepang || '';
  document.getElementById('gmit-pragmit').value = gmit.pragmit || '';
  document.getElementById('gmit-modern').value = gmit.modern || '';
}

function saveContentGMIT() {
  contentData.gmit = {
    portugis: document.getElementById('gmit-portugis').value,
    belanda: document.getElementById('gmit-belanda').value,
    jepang: document.getElementById('gmit-jepang').value,
    pragmit: document.getElementById('gmit-pragmit').value,
    modern: document.getElementById('gmit-modern').value
  };

  // Save custom sections
  if (contentData.customGMITSections && contentData.customGMITSections.length > 0) {
    contentData.customGMITSections.forEach(section => {
      const textarea = document.getElementById(`custom-gmit-${section.id}`);
      if (textarea) {
        contentData.gmit[section.id] = textarea.value;
        section.content = textarea.value;
      }
    });
  }

  // Make sure contentGMIT exists for public page
  if (!contentData.contentGMIT) {
    contentData.contentGMIT = {};
  }
  contentData.contentGMIT['portugis'] = contentData.gmit.portugis;
  contentData.contentGMIT['belanda'] = contentData.gmit.belanda;
  contentData.contentGMIT['jepang'] = contentData.gmit.jepang;
  contentData.contentGMIT['pragmit'] = contentData.gmit.pragmit;
  contentData.contentGMIT['modern'] = contentData.gmit.modern;
  
  // Add custom sections to contentGMIT
  if (contentData.customGMITSections) {
    contentData.customGMITSections.forEach(section => {
      contentData.contentGMIT[section.id] = section.content;
    });
  }
  
  saveData();
  showSuccessMessage('Content GMIT berhasil disimpan!');
  
  // Update public page
  updatePublicGMIT();
}

function previewGMIT() {
  // Save first
  saveContentGMIT();
  // Open in new tab
  window.open('../tentangGMIT.html', '_blank');
}

function updatePublicGMIT() {
  console.log('Content GMIT updated');
}

// ========== PENGUMUMAN ==========
let editingPengumumanId = null;

async function fetchPengumumanFromAPI() {
  if (typeof api === 'undefined' || !api) {
    throw new Error('API client belum dimuat');
  }

  // Pastikan token tersedia (hasil login API tersimpan di localStorage oleh api-client)
  if (!api.isLoggedIn()) {
    throw new Error('Belum login (token admin tidak ditemukan). Silakan login ulang.');
  }

  return api.getAnnouncements();
}

async function loadPengumumanList() {
  const list = document.getElementById('pengumuman-list');

  // Coba load dari API (MongoDB). Jika gagal, fallback ke local data.
  try {
    const announcements = await fetchPengumumanFromAPI();
    // Cache ke contentData agar dashboard/count tetap jalan
    contentData.pengumuman = Array.isArray(announcements) ? announcements : [];
    updateDashboard();
  } catch (err) {
    console.warn('Pengumuman API unavailable, fallback localStorage:', err.message);
    // Biarkan contentData.pengumuman apa adanya (hasil loadAllData dari localStorage)
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
  document.getElementById('modal-title').textContent = 'Tambah Pengumuman Baru';
  document.getElementById('pengumuman-form').reset();
  document.getElementById('pengumuman-aktif').checked = true;
  document.getElementById('pengumuman-modal').classList.add('active');
}

function editPengumuman(id) {
  const pengumuman = contentData.pengumuman.find(p => (p._id || p.id) === id);
  if (!pengumuman) return;
  
  editingPengumumanId = id;
  document.getElementById('modal-title').textContent = 'Edit Pengumuman';
  document.getElementById('pengumuman-id').value = id;
  document.getElementById('pengumuman-judul').value = pengumuman.judul;
  document.getElementById('pengumuman-kategori').value = pengumuman.kategori;
  document.getElementById('pengumuman-tanggal').value = pengumuman.tanggal;
  document.getElementById('pengumuman-waktu').value = pengumuman.waktu || '';
  document.getElementById('pengumuman-lokasi').value = pengumuman.lokasi || '';
  document.getElementById('pengumuman-deskripsi').value = pengumuman.deskripsi;
  document.getElementById('pengumuman-aktif').checked = pengumuman.aktif;
  
  document.getElementById('pengumuman-modal').classList.add('active');
}

async function deletePengumuman(id) {
  if (!confirm('Anda yakin ingin menghapus pengumuman ini?')) return;

  // Utamakan delete via API
  try {
    if (typeof api !== 'undefined' && api && api.isLoggedIn()) {
      await api.deleteAnnouncement(id);
      await loadPengumumanList();
      showSuccessMessage('Pengumuman berhasil dihapus!');
      return;
    }
    throw new Error('Token admin tidak ditemukan.');
  } catch (err) {
    console.warn('Delete via API gagal, fallback localStorage:', err.message);
    // Fallback local delete (mode demo/offline)
    contentData.pengumuman = contentData.pengumuman.filter(p => (p._id || p.id) !== id);
    saveData();
    await loadPengumumanList();
    updateDashboard();
    showSuccessMessage('Pengumuman berhasil dihapus (fallback lokal)!');
  }
}

function closePengumumanModal() {
  document.getElementById('pengumuman-modal').classList.remove('active');
  editingPengumumanId = null;
}

async function savePengumuman(event) {
  event.preventDefault();
  
  const formData = {
    judul: document.getElementById('pengumuman-judul').value,
    kategori: document.getElementById('pengumuman-kategori').value,
    tanggal: document.getElementById('pengumuman-tanggal').value,
    waktu: document.getElementById('pengumuman-waktu').value,
    lokasi: document.getElementById('pengumuman-lokasi').value,
    deskripsi: document.getElementById('pengumuman-deskripsi').value,
    aktif: document.getElementById('pengumuman-aktif').checked
  };

  // Utamakan simpan via API
  try {
    if (typeof api === 'undefined' || !api) {
      throw new Error('API client belum dimuat');
    }
    if (!api.isLoggedIn()) {
      throw new Error('Token admin tidak ditemukan. Silakan login ulang.');
    }

    if (editingPengumumanId) {
      await api.updateAnnouncement(editingPengumumanId, formData);
    } else {
      await api.createAnnouncement(formData);
    }

    await loadPengumumanList();
    closePengumumanModal();
    showSuccessMessage(editingPengumumanId ? 'Pengumuman berhasil diupdate!' : 'Pengumuman berhasil ditambahkan!');
    return;
  } catch (err) {
    console.warn('Save via API gagal, fallback localStorage:', err.message);
    // Fallback local save (mode demo/offline)
    const localData = { id: editingPengumumanId || Date.now(), ...formData };
    if (editingPengumumanId) {
      const index = contentData.pengumuman.findIndex(p => (p._id || p.id) === editingPengumumanId);
      if (index >= 0) contentData.pengumuman[index] = localData;
    } else {
      contentData.pengumuman.push(localData);
    }
    saveData();
    await loadPengumumanList();
    updateDashboard();
    closePengumumanModal();
    showSuccessMessage('Pengumuman disimpan (fallback lokal). Jalankan backend & login untuk simpan ke database.');
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
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

// ========== STRUKTUR ==========
function loadCurrentStruktur() {
  // Load dari localStorage dulu
  const savedData = localStorage.getItem('gmitAdminData');
  if (savedData) {
    const data = JSON.parse(savedData);
    if (data.struktur && Object.keys(data.struktur).length > 0) {
      // Ada data di localStorage, tanya user mau load dari mana
      if (confirm('Ada data yang sudah disimpan. Load dari data tersimpan atau dari website default?\n\nOK = Data Tersimpan\nCancel = Website Default')) {
        // Load from localStorage
        loadStrukturFromStorage(data.struktur);
        showSuccessMessage('Data struktur berhasil di-load dari data tersimpan!');
        return;
      }
    }
  }
  
  // Load from default website data
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
  
  loadStrukturFromStorage(defaultStruktur);
  showSuccessMessage('Data struktur website saat ini berhasil di-load! Anda bisa mengedit dan menyimpan perubahan.');
}

function loadStrukturFromStorage(struktur) {
  document.getElementById('struktur-periode').value = struktur.periode || '';
  document.getElementById('ketua').value = struktur.ketua || '';
  document.getElementById('wakil-ketua').value = struktur.wakilKetua || '';
  document.getElementById('sekretaris').value = struktur.sekretaris || '';
  document.getElementById('wakil-sekretaris').value = struktur.wakilSekretaris || '';
  document.getElementById('bendahara').value = struktur.bendahara || '';
  document.getElementById('wakil-bendahara').value = struktur.wakilBendahara || '';
  document.getElementById('penatua-list').value = struktur.penatua || '';
  document.getElementById('diaken-list').value = struktur.diaken || '';
  document.getElementById('pengajar-list').value = struktur.pengajar || '';
  
  // Update counters
  updateTextareaCounters();
  
  // Trigger manual update for counters
  const penatuaLines = (struktur.penatua || '').split('\n').filter(line => line.trim() !== '');
  const diakenLines = (struktur.diaken || '').split('\n').filter(line => line.trim() !== '');
  const pengajarLines = (struktur.pengajar || '').split('\n').filter(line => line.trim() !== '');
  
  document.getElementById('penatua-counter').textContent = `${penatuaLines.length} penatua`;
  document.getElementById('diaken-counter').textContent = `${diakenLines.length} diaken`;
  document.getElementById('pengajar-counter').textContent = `${pengajarLines.length} pengajar`;
}

function saveStruktur() {
  contentData.struktur = {
    periode: document.getElementById('struktur-periode').value,
    ketua: document.getElementById('ketua').value,
    wakilKetua: document.getElementById('wakil-ketua').value,
    sekretaris: document.getElementById('sekretaris').value,
    wakilSekretaris: document.getElementById('wakil-sekretaris').value,
    bendahara: document.getElementById('bendahara').value,
    wakilBendahara: document.getElementById('wakil-bendahara').value,
    penatua: document.getElementById('penatua-list').value,
    diaken: document.getElementById('diaken-list').value,
    pengajar: document.getElementById('pengajar-list').value
  };
  
  saveData();
  showSuccessMessage('Struktur kepengurusan berhasil disimpan!');
  updatePublicStruktur();
}

function previewStruktur() {
  // Save first
  saveStruktur();
  // Open in new tab
  window.open('../Profil.gereja.html#majelis', '_blank');
}

function updatePublicStruktur() {
  console.log('Struktur updated');
}

// ========== UTILITIES ==========
function showSuccessMessage(message) {
  // Create or get success message element
  let successDiv = document.querySelector('.success-message');
  if (!successDiv) {
    successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    const content = document.querySelector('.admin-content');
    content.insertBefore(successDiv, content.firstChild);
  }
  
  successDiv.textContent = message;
  successDiv.classList.add('show');
  
  setTimeout(() => {
    successDiv.classList.remove('show');
  }, 3000);
}

function updateTextareaCounters() {
  // Update penatua counter
  const penatuaList = document.getElementById('penatua-list');
  const penatuaCounter = document.getElementById('penatua-counter');
  
  penatuaList.addEventListener('input', function() {
    const lines = this.value.split('\n').filter(line => line.trim() !== '');
    penatuaCounter.textContent = `${lines.length} penatua`;
  });
  
  // Update diaken counter
  const diakenList = document.getElementById('diaken-list');
  const diakenCounter = document.getElementById('diaken-counter');
  
  diakenList.addEventListener('input', function() {
    const lines = this.value.split('\n').filter(line => line.trim() !== '');
    diakenCounter.textContent = `${lines.length} diaken`;
  });
  
  // Update pengajar counter
  const pengajarList = document.getElementById('pengajar-list');
  const pengajarCounter = document.getElementById('pengajar-counter');
  
  pengajarList.addEventListener('input', function() {
    const lines = this.value.split('\n').filter(line => line.trim() !== '');
    pengajarCounter.textContent = `${lines.length} pengajar`;
  });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('pengumuman-modal');
  if (event.target === modal) {
    closePengumumanModal();
  }
});

// ========== FUNGSI TAMBAH SECTION/PERIODE BARU ==========

// === SAHADUTA SECTION ===
function showAddSahadutaSection() {
  const form = document.getElementById('formAddSahadutaSection');
  form.style.display = 'block';
  document.getElementById('newSahadutaSectionId').value = '';
  document.getElementById('newSahadutaSectionLabel').value = '';
  document.getElementById('newSahadutaSectionContent').value = '';
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelAddSahadutaSection() {
  document.getElementById('formAddSahadutaSection').style.display = 'none';
}

function saveNewSahadutaSection() {
  const sectionId = document.getElementById('newSahadutaSectionId').value.trim();
  const sectionLabel = document.getElementById('newSahadutaSectionLabel').value.trim();
  const sectionContent = document.getElementById('newSahadutaSectionContent').value.trim();

  if (!sectionId || !sectionLabel || !sectionContent) {
    alert('❌ Semua field harus diisi!');
    return;
  }

  // Validate ID format
  if (!/^[a-z0-9-]+$/.test(sectionId)) {
    alert('❌ ID Section hanya boleh menggunakan huruf kecil, angka, dan tanda minus (-)');
    return;
  }

  let data = JSON.parse(localStorage.getItem('gmitAdminData')) || {};
  if (!data.contentSahaduta) {
    data.contentSahaduta = {};
  }
  if (!data.customSahadutaSections) {
    data.customSahadutaSections = [];
  }

  // Check if ID already exists
  const existingIds = ['gambaran-umum', 'pertumbuhan-jemaat', 'pelayanan'];
  if (existingIds.includes(sectionId) || data.customSahadutaSections.find(s => s.id === sectionId)) {
    alert('❌ ID Section sudah digunakan! Gunakan ID yang berbeda.');
    return;
  }

  // Save to custom sections
  data.customSahadutaSections.push({
    id: sectionId,
    label: sectionLabel,
    content: sectionContent
  });

  // Also save to contentSahaduta for easy access
  data.contentSahaduta[sectionId] = sectionContent;

  // Update global contentData
  contentData = data;

  localStorage.setItem('gmitAdminData', JSON.stringify(data));
  alert('✅ Section baru berhasil ditambahkan!');
  cancelAddSahadutaSection();
  loadAdditionalSahadutaSections();
}

function loadAdditionalSahadutaSections() {
  const data = JSON.parse(localStorage.getItem('gmitAdminData')) || {};
  const customSections = data.customSahadutaSections || [];
  const container = document.getElementById('additionalSahadutaSections');

  if (!container) return;

  if (customSections.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = '<hr style="margin: 30px 0; border: 2px solid #28a745;"><h3 style="color: #28a745; margin: 20px 0;">📋 Section Tambahan yang Anda Buat</h3>';
  customSections.forEach(section => {
    const content = data.contentSahaduta && data.contentSahaduta[section.id] ? data.contentSahaduta[section.id] : section.content;
    html += `
      <div class="form-group" style="position: relative; padding: 20px; border: 2px solid #d4edda; border-radius: 8px; margin-bottom: 20px; background-color: #f8fff9;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <label style="margin: 0; color: #28a745; font-weight: bold; font-size: 16px;">${section.label}</label>
          <button onclick="deleteCustomSahadutaSection('${section.id}')" class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;">🗑️ Hapus</button>
        </div>
        <small style="color: #6c757d; display: block; margin-bottom: 8px;">ID: ${section.id}</small>
        <textarea id="custom-sahaduta-${section.id}" rows="6" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px;">${content}</textarea>
      </div>
    `;
  });
  container.innerHTML = html;
}

function deleteCustomSahadutaSection(sectionId) {
  if (!confirm('⚠️ Apakah Anda yakin ingin menghapus section ini? Perubahan akan disimpan otomatis.')) {
    return;
  }

  let data = JSON.parse(localStorage.getItem('gmitAdminData')) || {};
  if (data.customSahadutaSections) {
    data.customSahadutaSections = data.customSahadutaSections.filter(s => s.id !== sectionId);
  }
  if (data.contentSahaduta && data.contentSahaduta[sectionId]) {
    delete data.contentSahaduta[sectionId];
  }

  localStorage.setItem('gmitAdminData', JSON.stringify(data));
  alert('✅ Section berhasil dihapus!');
  loadAdditionalSahadutaSections();
}

// === GMIT SECTION ===
function showAddGMITSection() {
  const form = document.getElementById('formAddGMITSection');
  form.style.display = 'block';
  document.getElementById('newGMITSectionId').value = '';
  document.getElementById('newGMITSectionLabel').value = '';
  document.getElementById('newGMITSectionContent').value = '';
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelAddGMITSection() {
  document.getElementById('formAddGMITSection').style.display = 'none';
}

function saveNewGMITSection() {
  const sectionId = document.getElementById('newGMITSectionId').value.trim();
  const sectionLabel = document.getElementById('newGMITSectionLabel').value.trim();
  const sectionContent = document.getElementById('newGMITSectionContent').value.trim();

  if (!sectionId || !sectionLabel || !sectionContent) {
    alert('❌ Semua field harus diisi!');
    return;
  }

  // Validate ID format
  if (!/^[a-z0-9-]+$/.test(sectionId)) {
    alert('❌ ID Periode hanya boleh menggunakan huruf kecil, angka, dan tanda minus (-)');
    return;
  }

  let data = JSON.parse(localStorage.getItem('gmitAdminData')) || {};
  if (!data.contentGMIT) {
    data.contentGMIT = {};
  }
  if (!data.customGMITSections) {
    data.customGMITSections = [];
  }

  // Check if ID already exists
  const existingIds = ['portugis', 'belanda', 'jepang', 'pragmit', 'modern'];
  if (existingIds.includes(sectionId) || data.customGMITSections.find(s => s.id === sectionId)) {
    alert('❌ ID Periode sudah digunakan! Gunakan ID yang berbeda.');
    return;
  }

  // Save to custom sections
  data.customGMITSections.push({
    id: sectionId,
    label: sectionLabel,
    content: sectionContent
  });

  // Also save to contentGMIT for easy access
  data.contentGMIT[sectionId] = sectionContent;

  // Update global contentData
  contentData = data;

  localStorage.setItem('gmitAdminData', JSON.stringify(data));
  alert('✅ Periode baru berhasil ditambahkan!');
  cancelAddGMITSection();
  loadAdditionalGMITSections();
}

function loadAdditionalGMITSections() {
  const data = JSON.parse(localStorage.getItem('gmitAdminData')) || {};
  const customSections = data.customGMITSections || [];
  const container = document.getElementById('additionalGMITSections');

  if (!container) return;

  if (customSections.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = '<hr style="margin: 30px 0; border: 2px solid #28a745;"><h3 style="color: #28a745; margin: 20px 0;">📋 Periode Tambahan yang Anda Buat</h3>';
  customSections.forEach(section => {
    const content = data.contentGMIT && data.contentGMIT[section.id] ? data.contentGMIT[section.id] : section.content;
    html += `
      <div class="form-group" style="position: relative; padding: 20px; border: 2px solid #d4edda; border-radius: 8px; margin-bottom: 20px; background-color: #f8fff9;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <label style="margin: 0; color: #28a745; font-weight: bold; font-size: 16px;">${section.label}</label>
          <button onclick="deleteCustomGMITSection('${section.id}')" class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;">🗑️ Hapus</button>
        </div>
        <small style="color: #6c757d; display: block; margin-bottom: 8px;">ID: ${section.id}</small>
        <textarea id="custom-gmit-${section.id}" rows="8" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 4px;">${content}</textarea>
      </div>
    `;
  });
  container.innerHTML = html;
}

function deleteCustomGMITSection(sectionId) {
  if (!confirm('⚠️ Apakah Anda yakin ingin menghapus periode ini? Perubahan akan disimpan otomatis.')) {
    return;
  }

  let data = JSON.parse(localStorage.getItem('gmitAdminData')) || {};
  if (data.customGMITSections) {
    data.customGMITSections = data.customGMITSections.filter(s => s.id !== sectionId);
  }
  if (data.contentGMIT && data.contentGMIT[sectionId]) {
    delete data.contentGMIT[sectionId];
  }

  localStorage.setItem('gmitAdminData', JSON.stringify(data));
  alert('✅ Periode berhasil dihapus!');
  loadAdditionalGMITSections();
}

// Load additional sections when navigating to those sections
document.addEventListener('DOMContentLoaded', function() {
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
