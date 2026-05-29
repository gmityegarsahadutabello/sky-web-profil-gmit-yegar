# 🧪 Testing Guide - Upload File to S3

Panduan lengkap untuk menguji fitur upload foto pendeta ke AWS S3.

---

## ✅ Pre-Testing Checklist

Sebelum mulai test, pastikan:

- [ ] Backend `.env` sudah dibuat dengan kredensial MongoDB dan S3
- [ ] `npm install` sudah selesai di folder `backend/`
- [ ] Python HTTP server berjalan di port 5500 (untuk frontend)
- [ ] Anda terhubung ke internet (untuk akses MongoDB dan S3)

---

## 🚀 Step 1: Start Backend Server

Buka terminal di folder `backend/` dan jalankan:

```bash
npm run dev
```

**Ekspektasi output:**
```
✅ MongoDB connected
Server listening on port 5000
Health check: http://localhost:5000/health
```

Jika ada error:
- ❌ **"MONGODB CONNECTION FAILED"**: Cek `.env` file, pastikan URI benar
- ❌ **"npm ERR! missing script: dev"**: Cek `package.json`, pastikan ada script `dev`
- ❌ **"Cannot find module"**: Jalankan `npm install` terlebih dahulu

---

## 🌐 Step 2: Access Frontend

Buka browser dan navigasi ke:
```
http://localhost:5500/admin/login.html
```

---

## 🔐 Step 3: Admin Login

Masukkan kredensial:
- **Username**: `admin`
- **Password**: `kerjapraktik2025`

Klik **"Login"**

**Ekspektasi**: Redirect ke halaman `kelola-galeri-api.html`

---

## 📸 Step 4: Test File Upload

### 4.1 Tambah Pendeta Baru
Klik tombol **"➕ Tambah Pendeta Baru"**

Modal dialog terbuka dengan form:
- Nama Pendeta
- Masa Jabatan
- **Upload Foto Pendeta** (file upload zone)

### 4.2 Pilih File Foto

**⚠️ PENTING**: Anda HARUS memilih file foto dari komputer (bukan paste URL)

Opsi pilih file:
1. **Klik zona upload** (tempat bergambar folder 📁)
2. **Drag & drop** file foto ke zona

**Ekspektasi:**
- Zona berganti warna (jadi lebih terang)
- Preview foto muncul di bawah
- Status: ✅ File siap di-upload ke AWS S3

### 4.3 Isi Data

Masukkan:
- **Nama**: contoh `Pdt. Sukardi, S.Th`
- **Masa Jabatan**: contoh `2020 - 2025`

### 4.4 Simpan & Upload

Klik **"💾 Simpan"**

**Ekspektasi proses upload:**
1. Progress bar muncul (⏳ Mengupload FILE ke AWS S3...)
2. Progress naik dari 0% → 100%
3. Icon berubah jadi ✅ (hijau)
4. Alert: ✅ Gambar berhasil diupload ke S3

---

## 🔍 Step 5: Verifikasi Upload

### 5.1 Check MongoDB Data

File baru muncul di galeri admin panel dengan:
- Thumbnail foto
- Nama pendeta
- Masa jabatan
- Tombol edit/hapus/reorder

### 5.2 Check S3 Storage (Opsional)

Login ke Neva Objects console:
- Buka https://console.nevacloud.io/
- Masuk dengan akun Anda
- Cari bucket `fotopendeta`
- Lihat file foto (UUID.jpg)

### 5.3 Check Galeri Publik

Buka halaman galeri publik:
```
http://localhost:5500/galeri.html
```

**Ekspektasi**: Foto pendeta baru muncul di halaman galeri

---

## 🐛 Troubleshooting

### ❌ "Cannot read property 'baseUrl' of undefined"
**Penyebab**: API client belum loaded
**Solusi**: 
1. Refresh halaman (F5)
2. Cek browser console (F12 → Console tab)

### ❌ "Upload gagal: 403 Forbidden"
**Penyebab**: S3 credentials salah atau tidak memiliki permission
**Solusi**:
1. Cek `.env` file di backend:
   - `AWS_ACCESS_KEY_ID` benar?
   - `AWS_SECRET_ACCESS_KEY` benar?
2. Cek Neva Objects dashboard permission

### ❌ "Upload gagal: 404 Not Found"
**Penyebab**: Backend `/api/pastors/upload` endpoint tidak ditemukan
**Solusi**:
1. Cek backend console: ada error saat start?
2. Verifikasi `backend/routes/pastors.js` ada route POST `/upload`

### ❌ "File terlalu besar (max 5MB)"
**Penyebab**: Ukuran file > 5MB
**Solusi**: Gunakan file gambar lebih kecil atau compress dulu

### ❌ "Format gambar tidak didukung"
**Penyebab**: File bukan JPG/PNG/WebP/GIF
**Solusi**: Convert ke JPG atau PNG terlebih dahulu

### ❌ Photo tidak muncul di galeri publik
**Penyebab**: 
1. S3 URL belum di-save ke MongoDB
2. Browser cache lama
**Solusi**:
1. Hard refresh galeri (Ctrl+Shift+R)
2. Cek MongoDB data: nama field `image_url` sesuai?

---

## 📋 Full Test Scenario

```
1. ✅ Backend berjalan (port 5000)
2. ✅ Frontend accessible (port 5500)
3. ✅ Admin login berhasil
4. ✅ Buka modal "Tambah Pendeta"
5. ✅ Drag & drop / click file foto
6. ✅ Preview foto muncul
7. ✅ Isi nama & periode
8. ✅ Klik "Simpan"
9. ✅ Progress bar upload 100%
10. ✅ Alert success muncul
11. ✅ Data muncul di galeri admin
12. ✅ Foto muncul di galeri publik (galeri.html)
```

**Jika semua ✅ selesai = Upload feature BERHASIL!**

---

## 📞 Kontakt Support

Jika ada masalah:
1. Cek backend console untuk error messages
2. Cek browser console (F12) untuk JavaScript errors
3. Cek `.env` file untuk kredensial
4. Verifikasi file `backend/routes/pastors.js` & `controllers/pastorController.js`

---

## 🎉 Next Steps

Setelah test berhasil:

1. **Migrate Data Lama** (opsional)
   ```bash
   node backend/scripts/migrate.js < data.json
   ```

2. **Deployment** (jika siap production)
   - Setup backend di server (PM2, Docker, dll)
   - Setup MongoDB production cluster
   - Setup S3 production bucket
   - Update `.env` dengan URL production

3. **Optimize** (opsional)
   - Add image resizing/compression
   - Add file upload progress (real, bukan fake)
   - Add bulk upload
   - Add image gallery with lightbox
