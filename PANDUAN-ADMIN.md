# 🎯 Panduan Cepat Admin Website GMIT Yegar Sahaduta Bello

## 🔐 Cara Masuk ke Admin Panel

1. Buka browser (Chrome, Firefox, Edge, dll)
2. Akses: `http://localhost:5500/admin/login.html`
3. Masukkan kredensial:
   - **Username**: `admin`
   - **Password**: `admin123`
4. Klik tombol **Login**

## 📝 Mengelola Content Website

### Edit Content Tentang Jemaat Sahaduta

1. Klik menu **"Content Sahaduta"** di sidebar kiri
2. Anda akan melihat beberapa kotak text:
   - **Gambaran Umum Jemaat**: Tulis sejarah dan gambaran jemaat
   - **Pertumbuhan Jemaat**: Tulis perkembangan jemaat
   - **Statistik**: Isi jumlah KK, Jiwa, dan Baptis
   - **Pelayanan & Kegiatan**: Tulis kegiatan pelayanan
3. Klik tombol **"💾 Simpan Perubahan"**
4. Untuk melihat hasil, klik **"👁️ Preview"**

### Edit Content Tentang GMIT

1. Klik menu **"Content GMIT"** di sidebar kiri
2. Edit sejarah GMIT sesuai periode:
   - Periode Portugis (1556–1613)
   - Periode Belanda (1614–1941)
   - Periode Jepang (1942–1945)
   - Periode Pra-GMIT (1945–1947)
   - Periode GMIT Modern (1947–Kini)
3. Klik **"💾 Simpan Perubahan"**
4. Klik **"👁️ Preview"** untuk melihat hasil

## 📢 Mengelola Pengumuman

### Membuat Pengumuman Baru

1. Klik menu **"Pengumuman"** di sidebar
2. Klik tombol **"➕ Tambah Pengumuman Baru"**
3. Isi form pengumuman:
   - **Judul**: Judul pengumuman (wajib)
   - **Kategori**: Pilih kategori (wajib)
     - Kegiatan Gereja
     - Jadwal Perjamuan
     - Ibadah Rumah Tangga
     - Pengumuman Umum
   - **Tanggal**: Tanggal kegiatan (wajib)
   - **Waktu**: Jam kegiatan (opsional)
   - **Lokasi**: Tempat kegiatan (opsional)
   - **Deskripsi**: Detail lengkap pengumuman (wajib)
   - **Centang** "Tampilkan di website publik" agar muncul di website
4. Klik **"Simpan"**

### Edit Pengumuman yang Sudah Ada

1. Di halaman **Pengumuman**, cari pengumuman yang ingin diedit
2. Klik tombol **"Edit"**
3. Ubah informasi yang diperlukan
4. Klik **"Simpan"**

### Menghapus Pengumuman

1. Klik tombol **"Hapus"** pada pengumuman yang ingin dihapus
2. Konfirmasi dengan klik **"OK"**

> **💡 Tips**: Jika tidak ingin menghapus tapi hanya menyembunyikan, hapus centang "Tampilkan di website publik"

## 👥 Mengelola Struktur Kepengurusan

### Update Data Kepengurusan

1. Klik menu **"Struktur Kepengurusan"** di sidebar
2. **Periode Pelayanan**: Isi periode (contoh: 2024-2027)
3. **Pengurus Utama**: Isi nama lengkap dengan gelar
   - Ketua Majelis Jemaat
   - Wakil Ketua
   - Sekretaris
   - Wakil Sekretaris
   - Bendahara
   - Wakil Bendahara
4. **Penatua**: Tulis nama penatua, satu nama per baris
   ```
   Johanis Watrimny, S.Si
   Agustinus Bria
   Engelina Wabang – Maro, S.Pd
   ```
5. **Diaken**: Tulis nama diaken, satu nama per baris
6. **Pengajar**: Tulis nama pengajar, satu nama per baris
7. Klik **"💾 Simpan Perubahan"**
8. Klik **"👁️ Preview"** untuk melihat hasil

> **💡 Tips**: Counter akan otomatis menghitung jumlah nama yang Anda masukkan

## 🔍 Melihat Hasil di Website Publik

Setelah menyimpan perubahan, buka halaman publik untuk melihat hasilnya:

- **Beranda**: `http://localhost:5500/Beranda.html`
- **Tentang Sahaduta**: `http://localhost:5500/tentangSAHADUTA.html`
- **Tentang GMIT**: `http://localhost:5500/tentangGMIT.html`
- **Struktur**: `http://localhost:5500/Profil.gereja.html#majelis`
- **Pengumuman**: `http://localhost:5500/pengumuman.html`

## 🚪 Keluar dari Admin Panel

1. Klik menu **"🚪 Logout"** di sidebar
2. Konfirmasi dengan klik **"OK"**
3. Anda akan kembali ke halaman login

## ❓ FAQ - Pertanyaan Umum

### Q: Data saya hilang setelah close browser?
**A**: Pastikan Anda sudah klik tombol "Simpan" sebelum menutup browser. Data tersimpan di localStorage browser Anda.

### Q: Pengumuman tidak muncul di website?
**A**: Pastikan Anda sudah:
1. Centang "Tampilkan di website publik"
2. Klik tombol "Simpan"
3. Refresh halaman website publik (tekan F5)

### Q: Lupa password admin?
**A**: Kredensial default adalah:
- Username: `admin`
- Password: `admin123`

Untuk mengganti password, hubungi developer website.

### Q: Bagaimana cara menambah foto?
**A**: Saat ini fitur upload foto belum tersedia. Untuk menambah foto, hubungi developer website atau letakkan foto di folder `arsip/` kemudian edit HTML secara manual.

### Q: Apakah bisa diakses dari HP?
**A**: Ya! Website dan admin panel sudah responsive dan bisa diakses dari smartphone atau tablet.

## 📞 Bantuan

Jika mengalami kesulitan atau ada pertanyaan:
- **Email**: gmitsahadutabelo@gmail.com
- **Telephone**: (hubungi majelis jemaat)

## ⚠️ Hal Penting yang Perlu Diingat

1. **Selalu klik "Simpan"** setelah melakukan perubahan
2. **Jangan clear browser cache** jika tidak perlu, karena data tersimpan di browser
3. **Backup data** secara berkala dengan mencatat perubahan penting
4. **Refresh halaman publik** (F5) untuk melihat perubahan terbaru
5. **Logout** setelah selesai menggunakan admin panel

## 🎯 Tips & Trik

### Menulis Pengumuman yang Baik
- Gunakan judul yang jelas dan menarik
- Pilih kategori yang sesuai
- Berikan detail waktu dan lokasi yang lengkap
- Tulis deskripsi yang informatif tapi tidak terlalu panjang

### Mengorganisir Content
- Update pengumuman secara rutin
- Hapus atau nonaktifkan pengumuman yang sudah lewat
- Update statistik jemaat setiap periode tertentu
- Periksa struktur kepengurusan di awal periode baru

### Keamanan
- Jangan bagikan password admin ke sembarang orang
- Logout setelah selesai menggunakan admin panel
- Gunakan browser yang aman dan terpercaya

---

**Selamat mengelola website GMIT Yegar Sahaduta Bello! 🙏**
