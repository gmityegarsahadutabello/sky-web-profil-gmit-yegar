# ⚡ Quick Start - Upload File to S3

**TL;DR** - How to upload pastor photo to S3:

## 🎯 The Key Concept

```
YOUR COMPUTER PHOTO FILE
        ↓
    (select file)
        ↓
FORM PREVIEW (✅ File ready)
        ↓
CLICK "Simpan"
        ↓
FILE UPLOADED TO AWS S3
        ↓
✅ PHOTO APPEARS IN PUBLIC GALERI.HTML
```

---

## 👨‍💼 Admin Steps (3 minutes)

### 1. Login to Admin Panel
```
http://localhost:5500/admin/login.html
Username: admin
Password: kerjapraktik2025
```

### 2. Click "➕ Tambah Pendeta Baru"

### 3. Upload Photo (⚠️ FILE, NOT URL!)
- Click the 📁 folder zone OR drag photo
- Pick photo file from your computer
- See preview + ✅ status message
- **NOT**: Paste URL or file path

### 4. Fill Form
```
Nama: Pdt. Nama, S.Th
Periode: 2020 - 2025
```

### 5. Click "💾 Simpan"
- Wait for progress bar → 100%
- See ✅ success alert
- Photo appears in admin panel

### 6. Check Public Gallery
```
http://localhost:5500/galeri.html
↓ Photo should appear here!
```

---

## 🔧 Developer - Start Backend

```bash
cd backend
npm install        # (if not done)
npm run dev        # Start server on port 5000
```

Expected output:
```
✅ MongoDB connected
Server listening on port 5000
```

---

## ⚠️ IMPORTANT: FILE vs URL

| ❌ WRONG | ✅ CORRECT |
|---------|-----------|
| Paste URL: `https://example.com/photo.jpg` | Select file: `/Users/Desktop/photo.jpg` |
| Type path: `C:\photos\pendeta.jpg` | Click to browse computer |
| Write filename: `pendeta.jpg` | Drag & drop file to zone |

**Admin must SELECT FILE FROM DISK** — not paste text!

---

## 🐛 If Upload Fails

| Error | Solution |
|-------|----------|
| "Cannot connect to server" | Is backend running? `npm run dev` in terminal |
| "File too large" | Resize photo to < 5MB |
| "Format not supported" | Use JPG, PNG, or WebP (not BMP, GIF, TIFF) |
| "403 Forbidden" | Check S3 credentials in `.env` |
| "Photo doesn't appear in galeri" | Hard refresh: Ctrl+Shift+R |

---

## 📁 Key Files

```
├── backend/
│   ├── server.js              ← Main backend
│   ├── .env                   ← Credentials (MongoDB, S3)
│   └── controllers/
│       └── pastorController.js ← S3 upload logic
│
├── admin/
│   └── kelola-galeri-api.html ← Upload UI (IMPROVED!)
│
├── api-client.js              ← API connector
├── galeri.html                ← Public gallery
└── TESTING_GUIDE.md           ← Full testing guide
```

---

## ✅ Success Indicators

- [x] Backend logs: "✅ MongoDB connected"
- [x] Admin login works
- [x] File preview shows after selecting photo
- [x] Progress bar appears during upload
- [x] Success alert: "✅ Gambar berhasil diupload ke S3"
- [x] Photo appears in admin panel with thumbnail
- [x] Photo appears in public galeri.html

---

## 📞 Need Help?

1. **Check Testing Guide**: [TESTING_GUIDE.md](TESTING_GUIDE.md)
2. **Check Backend Console**: Look for error messages
3. **Check Browser Console**: F12 → Console tab
4. **Check .env File**: All credentials correct?

---

## 🎉 Flow Complete!

```
File Upload to S3 → Stored in MongoDB → Displayed in Public Gallery
```

**Everything is ready!** Just start backend and test. 🚀
