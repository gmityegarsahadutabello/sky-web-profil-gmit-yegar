# 🏛️ Website Profil GMIT Yegar Sahaduta Bello

Website profil gereja lengkap dengan sistem admin untuk mengelola konten.

## 📋 Fitur Utama

### 🌐 Website Publik
1. **Beranda** - Halaman utama dengan sambutan
2. **Tentang GMIT Yegar Sahaduta Bello** - Sejarah dan profil jemaat
3. **Tentang GMIT** - Sejarah GMIT secara umum
4. **Struktur Kepengurusan** - Daftar pengurus majelis jemaat
5. **Galeri** - Galeri foto kegiatan
6. **Pengumuman** - Informasi dan pengumuman terkini

### 🔐 Admin Panel
Admin dapat mengelola semua konten website melalui dashboard yang mudah digunakan:

#### 1. **Content Management**
   - Edit konten Tentang GMIT Yegar Sahaduta Bello
   - Edit konten Tentang GMIT (sejarah per periode)
   - Update statistik jemaat (KK, Jiwa, Baptis)
   - Preview perubahan sebelum publish

#### 2. **Kelola Pengumuman**
   - Tambah pengumuman baru
   - Edit pengumuman yang ada
   - Hapus pengumuman
   - Kategori: Kegiatan Gereja, Jadwal Perjamuan, Ibadah Rumah Tangga, Pengumuman Umum
   - Set status aktif/nonaktif untuk tampilan publik
   - Include detail: tanggal, waktu, lokasi, deskripsi

#### 3. **Kelola Struktur Kepengurusan**
   - Update periode pelayanan
   - Edit pengurus utama (Ketua, Wakil, Sekretaris, Bendahara)
   - Kelola daftar Penatua
   - Kelola daftar Diaken
   - Kelola daftar Pengajar
   - Template terintegrasi dengan halaman publik

## 🚀 Cara Menggunakan

### Menjalankan Website

1. **Menggunakan Python Server (Recommended)**
   ```bash
   python -m http.server 5500
   ```
   Atau gunakan task yang tersedia di VS Code: "Start Python Server"

2. **Atau gunakan Live Server extension di VS Code**

3. Buka browser dan akses:
   - Website Publik: `http://localhost:5500/Beranda.html`
   - Admin Panel: `http://localhost:5500/admin/login.html`

### Login Admin

**Kredensial Default:**
- Username: `admin`
- Password: `admin123`

> ⚠️ **PENTING**: Untuk produksi, ganti kredensial default dan implementasikan sistem autentikasi yang lebih aman dengan backend server.

## 📁 Struktur File

```
web profil kp/
├── admin/
│   ├── index.html          # Dashboard admin
│   ├── login.html          # Halaman login admin
│   ├── admin-style.css     # Styling admin panel
│   └── admin-script.js     # JavaScript admin panel
├── arsip/                  # Folder gambar dan aset
├── Beranda.html           # Halaman utama
├── tentangSAHADUTA.html   # Tentang jemaat
├── tentangGMIT.html       # Tentang GMIT
├── Profil.gereja.html     # Struktur kepengurusan
├── galeri.html            # Galeri foto
├── pengumuman.html        # Halaman pengumuman publik
├── informasi.html         # Halaman informasi
├── styel.css              # Main stylesheet
└── README-ADMIN.md        # File ini
```

## 💾 Cara Kerja Penyimpanan Data

Saat ini sistem menggunakan **localStorage** browser untuk menyimpan data:
- Data disimpan di browser pengguna
- Data tetap ada meskipun browser ditutup
- Data dapat di-export/import jika diperlukan

### ⚠️ Catatan Penting:
localStorage adalah solusi frontend yang cocok untuk:
- ✅ Prototype dan development
- ✅ Website sederhana dengan satu admin
- ✅ Data yang tidak kritis

Untuk website produksi, disarankan menggunakan:
- ❌ Backend server (Node.js, PHP, Python, dll.)
- ❌ Database (MySQL, PostgreSQL, MongoDB)
- ❌ API untuk komunikasi frontend-backend

## 🎨 Panduan Penggunaan Admin

### Mengelola Content Sahaduta & GMIT

1. Login ke admin panel
2. Klik menu "Content Sahaduta" atau "Content GMIT"
3. Edit text di textarea yang tersedia
4. Klik "💾 Simpan Perubahan"
5. Klik "👁️ Preview" untuk melihat hasil
6. Perubahan langsung terlihat di website publik

### Menambah Pengumuman

1. Pilih menu "Pengumuman"
2. Klik "➕ Tambah Pengumuman Baru"
3. Isi form:
   - Judul pengumuman
   - Kategori
   - Tanggal dan waktu
   - Lokasi (opsional)
   - Deskripsi lengkap
4. Centang "Tampilkan di website publik" untuk mengaktifkan
5. Klik "Simpan"

### Mengelola Struktur Kepengurusan

1. Pilih menu "Struktur Kepengurusan"
2. Update periode pelayanan (contoh: 2024-2027)
3. Isi nama pengurus utama dengan gelar lengkap
4. Untuk Penatua/Diaken/Pengajar:
   - Masukkan nama satu per baris
   - Counter otomatis menghitung jumlah
5. Klik "💾 Simpan Perubahan"
6. Klik "👁️ Preview" untuk melihat hasil

## 🔧 Kustomisasi

### Mengganti Logo
Ganti file logo di folder `arsip/logo-gmit.png`

### Mengganti Warna Tema
Edit file `styel.css` dan `admin-style.css`:
```css
/* Warna utama */
#123a5a  /* Biru tua */
#1e5a96  /* Biru */
```

### Menambah Kategori Pengumuman
Edit file `admin/admin-script.js` dan `pengumuman.html`:
```javascript
const labels = {
  'kegiatan': 'Kegiatan Gereja',
  'kategori-baru': 'Label Kategori Baru'
};
```

## 🛡️ Keamanan

### Untuk Development:
- ✅ Menggunakan sessionStorage untuk session management
- ✅ Validasi input di frontend
- ✅ Password tersembunyi dengan toggle

### Untuk Produksi (Disarankan):
- 🔐 Implementasi backend authentication
- 🔐 Enkripsi password dengan bcrypt/argon2
- 🔐 HTTPS untuk koneksi aman
- 🔐 Session management di server
- 🔐 Rate limiting untuk prevent brute force
- 🔐 Input sanitization untuk prevent XSS
- 🔐 CSRF protection

## 📱 Responsive Design

Website sudah responsive dan dapat diakses dengan baik di:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🐛 Troubleshooting

### Data admin hilang setelah clear browser
**Solusi**: localStorage akan terhapus jika browser cache dibersihkan. Untuk produksi gunakan database.

### Preview tidak menampilkan perubahan
**Solusi**: 
1. Pastikan sudah klik "Simpan"
2. Refresh halaman preview (Ctrl+F5)

### Tidak bisa login
**Solusi**:
1. Pastikan menggunakan kredensial: `admin` / `admin123`
2. Cek console browser untuk error (F12)
3. Clear browser cache

## 📞 Support

Untuk pertanyaan atau bantuan:
- Email: gmitsahadutabelo@gmail.com

## 📝 Catatan Pengembangan Selanjutnya

Fitur yang bisa ditambahkan:
- [ ] Upload gambar untuk galeri dari admin panel
- [ ] Export/import data backup
- [ ] Multi-user admin dengan role berbeda
- [ ] Email notification untuk pengumuman
- [ ] Pencarian dan filter pengumuman
- [ ] History/log perubahan content
- [ ] Calendar view untuk jadwal kegiatan
- [ ] Integration dengan Google Calendar
- [ ] WhatsApp notification integration

## 📄 Lisensi

© 2025 GMIT Yegar Sahaduta Bello. All rights reserved.

---

**Dibuat dengan ❤️ untuk GMIT Yegar Sahaduta Bello**
