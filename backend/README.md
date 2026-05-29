# GMIT Sahaduta Bello - Backend Integration Setup

## 📋 Setup MongoDB + AWS S3

Panduan lengkap untuk mengintegrasikan MongoDB dan AWS S3 ke sistem website profil gereja.

---

## 1️⃣ Setup MongoDB

### Option A: MongoDB Atlas (Recommended - Cloud)

1. **Buat akun MongoDB Atlas**
   - Kunjungi: https://www.mongodb.com/cloud/atlas
   - Daftar dengan email dan password
   - Buat organization dan project baru

2. **Buat MongoDB Cluster**
   - Pilih "Build a Cluster"
   - Pilih free tier (M0)
   - Pilih region terdekat (Asia)
   - Tunggu cluster terbuat (5-10 menit)

3. **Setup Database Access**
   - Menu "Security" → "Database Access"
   - Klik "Add New Database User"
   - Username: `gmit_admin`
   - Password: `YourSecurePassword123!` (simpan password ini!)
   - Pilih "Autogenerate secure password" jika mau
   - Klik "Add User"

4. **Setup Network Access**
   - Menu "Security" → "Network Access"
   - Klik "Add IP Address"
   - Pilih "Allow Access from Anywhere" (untuk development)
   - Untuk production: masukkan IP spesifik saja

5. **Get Connection String**
   - Kembali ke Cluster, klik "Connect"
   - Pilih "Connect your application"
   - Copy connection string
   - Contoh: `mongodb+srv://gmit_admin:password@cluster0.xxxxx.mongodb.net/gmit_sahaduta?retryWrites=true&w=majority`

### Option B: MongoDB Community (Local)

1. **Download MongoDB**
   - https://www.mongodb.com/try/download/community
   - Install untuk OS Anda

2. **Start MongoDB**
   ```bash
   # Windows
   mongod --dbpath C:\data\db
   
   # Mac/Linux
   mongod --dbpath ~/data/db
   ```

3. **Connection String**
   ```
   mongodb://localhost:27017/gmit_sahaduta
   ```

---

## 2️⃣ Setup AWS S3

### 1. Buat AWS Account
- Kunjungi: https://aws.amazon.com
- Daftar dengan email dan kartu kredit
- Free tier memberikan 5 GB gratis per bulan

### 2. Buat S3 Bucket
1. Login ke AWS Console
2. Cari "S3" dan buka
3. Klik "Create Bucket"
4. Bucket name: `gmit-sahaduta-images` (harus unik)
5. Region: `ap-southeast-1` (Singapore - terdekat Indonesia)
6. **Uncheck "Block all public access"**
7. Klik "Create Bucket"

### 3. Setup Bucket Policy (untuk public read)
1. Buka bucket, tab "Permissions"
2. Tab "Bucket Policy"
3. Paste policy ini:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::gmit-sahaduta-images/*"
    }
  ]
}
```
4. Klik "Save"

### 4. Buat IAM User & Access Keys
1. Cari "IAM" di AWS Console
2. Menu "Users"
3. Klik "Create User"
4. Username: `gmit-s3-uploader`
5. Klik "Next"
6. Klik "Attach policies directly"
7. Cari dan pilih "AmazonS3FullAccess"
8. Klik "Create User"

### 5. Generate Access Keys
1. Buka user yang baru dibuat
2. Tab "Security credentials"
3. Klik "Create access key"
4. Pilih "Application running on an AWS compute service"
5. Klik "Next"
6. Klik "Create access key"
7. **Copy dan simpan Access Key ID dan Secret Access Key**

---

## 3️⃣ Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup .env File
```bash
# Copy dari .env.example
cp .env.example .env
```

Edit `.env` dengan nilai Anda:
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://gmit_admin:password@cluster0.xxxxx.mongodb.net/gmit_sahaduta?retryWrites=true&w=majority

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET_NAME=gmit-sahaduta-images

# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5500

# JWT Secret (ganti dengan string random panjang)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=kerjapraktik2025
```

### 3. Start Backend Server
```bash
npm run dev
```

Server akan berjalan di: `http://localhost:5000`

Cek health: `http://localhost:5000/health`

---

## 4️⃣ Database Migration

### Migrate Data Lama ke MongoDB

1. **Export localStorage dari browser** (gunakan test-pastors.html):
   - Buka: http://localhost:5500/test-pastors.html
   - Klik "Show Current Data"
   - Copy JSON data

2. **Buat file data.json**
   ```json
   [
     {
       "name": "Pendeta Pelayanan Pertama",
       "period": "1950 - 1970",
       "image_url": "arsip/pastor1.jpg",
       "order": 0
     },
     {
       "name": "Pdt. Selvy J.K. Asfes-Zina, S.Th",
       "period": "2020 - Sekarang",
       "image_url": "arsip/IMG-20251124-WA0059.jpg",
       "order": 1
     }
   ]
   ```

3. **Jalankan migration script**
   ```bash
   cd backend
   node scripts/migrate.js < ../data.json
   ```

---

## 5️⃣ Frontend Integration

### Update Frontend untuk Pakai API

1. **Copy api-client.js**
   - File sudah ada di root folder
   - Include di HTML: `<script src="api-client.js"></script>`

2. **Update File HTML**
   
   **galeri.html** (public gallery):
   - Sudah diupdate untuk fetch dari `/api/pastors`
   - Fallback ke localStorage jika backend offline

   **admin/kelola-galeri-api.html** (admin panel):
   - Upload foto ke S3
   - CRUD operations via API
   - Real-time sync dengan MongoDB

3. **Update admin/login.html**
   - Sudah diupdate untuk auth via API
   - Fallback ke local auth untuk testing

### Switch ke API Gallery
```bash
# Ganti nama file
# Dari: admin/kelola-galeri.html (localStorage version)
# Ke: admin/kelola-galeri.html (gunakan kelola-galeri-api.html)

mv admin/kelola-galeri.html admin/kelola-galeri-old.html
mv admin/kelola-galeri-api.html admin/kelola-galeri.html
```

---

## 6️⃣ Testing

### Test MongoDB Connection
```bash
curl http://localhost:5000/health
```

Response:
```json
{"status":"Server berjalan","timestamp":"2025-12-18T..."}
```

### Test API Endpoints

**GET all pastors**
```bash
curl http://localhost:5000/api/pastors
```

**Admin Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"kerjapraktik2025"}'
```

**Create pastor (dengan auth)**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR..."

curl -X POST http://localhost:5000/api/pastors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Pdt. Baru",
    "period": "2025 - Sekarang",
    "image_url": ""
  }'
```

---

## 7️⃣ API Routes Reference

### Public Routes (Tidak perlu auth)
- `GET /api/pastors` - Get all pastors
- `GET /api/pastors/:id` - Get pastor by ID

### Admin Routes (Perlu JWT token)
- `POST /api/auth/login` - Admin login
- `POST /api/pastors` - Create pastor
- `PUT /api/pastors/:id` - Update pastor
- `DELETE /api/pastors/:id` - Delete pastor
- `POST /api/pastors/upload` - Upload image to S3
- `POST /api/pastors/reorder` - Reorder pastors

---

## 8️⃣ Environment Variables

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key | `wJalr...` |
| `AWS_REGION` | AWS region | `ap-southeast-1` |
| `AWS_S3_BUCKET_NAME` | S3 bucket name | `gmit-sahaduta-images` |
| `PORT` | Backend port | `5000` |
| `CORS_ORIGIN` | Frontend URL untuk CORS | `http://localhost:5500` |
| `JWT_SECRET` | Secret untuk JWT token | random string panjang |
| `ADMIN_USERNAME` | Admin username | `admin` |
| `ADMIN_PASSWORD` | Admin password | `kerjapraktik2025` |

---

## 9️⃣ Troubleshooting

### Backend tidak bisa connect ke MongoDB
**Error**: `MongoServerError: connect ECONNREFUSED`

**Solusi**:
- Cek `MONGODB_URI` di .env
- Pastikan MongoDB cluster/server running
- Jika pakai Atlas: pastikan IP Anda di whitelist

### Upload ke S3 gagal
**Error**: `Access Denied` atau `Signature does not match`

**Solusi**:
- Verifikasi AWS credentials
- Cek bucket policy sudah setup public read
- Pastikan IAM user punya `AmazonS3FullAccess`

### CORS error saat fetch dari frontend
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solusi**:
- Update `CORS_ORIGIN` di .env dengan URL frontend
- Kalau frontend di `http://localhost:5500`, set: `CORS_ORIGIN=http://localhost:5500`

### Gallery tidak menampilkan gambar
**Error**: Gambar kosong / fallback

**Solusi**:
- Cek browser console untuk error 404
- Pastikan image_url di MongoDB benar
- Cek S3 bucket public read policy

---

## 🔟 Deployment to Production

### Deploy Backend ke Railway/Render
1. Push code ke GitHub
2. Connect repo ke Railway/Render
3. Set environment variables di platform
4. Deploy

### Update Frontend URL
Ganti di `api-client.js`:
```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : 'https://your-backend-api.railway.app/api';  // Ganti dengan URL production
```

---

## 📞 Checklists

- [ ] MongoDB Atlas account created & cluster running
- [ ] AWS S3 bucket created & configured
- [ ] IAM user with S3 access created
- [ ] Backend `.env` file configured
- [ ] `npm install` completed
- [ ] Backend server running: `npm run dev`
- [ ] MongoDB migration completed
- [ ] Frontend `api-client.js` included
- [ ] Admin panel dapat upload gambar
- [ ] Public gallery menampilkan data dari API
- [ ] Logout dan login berfungsi

---

## 📚 Resources

- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **AWS S3**: https://aws.amazon.com/s3/
- **Express.js**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/

---

**Questions?** Check error logs di backend console atau browser DevTools.
