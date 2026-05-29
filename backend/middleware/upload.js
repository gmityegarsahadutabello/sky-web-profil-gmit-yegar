const multer = require('multer');
const path = require('path');

// Konfigurasi storage di memory (akan dikirim ke S3)
const storage = multer.memoryStorage();

// Filter file - hanya gambar
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File harus berupa gambar (JPEG, PNG, WebP, atau GIF)'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

module.exports = upload;
