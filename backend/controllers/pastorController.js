const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const Pastor = require('../models/Pastor');

const getBucketName = () => process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME;

const normalizeS3Endpoint = (rawEndpoint, bucketName) => {
  if (!rawEndpoint) return rawEndpoint;
  try {
    const url = new URL(rawEndpoint);
    const hostname = (url.hostname || '').toLowerCase();
    const bucketPrefix = bucketName ? `${bucketName.toLowerCase()}.` : '';

    // Jika user mengisi endpoint bucket-specific (mis. https://<bucket>.s3.nevaobjects.id)
    // sementara SDK juga diberi Bucket=<bucket>, request bisa jadi tidak valid.
    // Solusi: ubah endpoint menjadi base (https://s3.nevaobjects.id).
    if (bucketPrefix && hostname.startsWith(bucketPrefix)) {
      url.hostname = url.hostname.slice(bucketPrefix.length);
    }

    // Pastikan tidak ada trailing slash agar konsisten
    return url.toString().replace(/\/$/, '');
  } catch {
    return rawEndpoint;
  }
};

// Konfigurasi AWS S3 (support custom endpoint seperti Neva Objects)
const s3Config = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1'
};

// Jika ada custom endpoint (Neva Objects atau MinIO)
if (process.env.S3_ENDPOINT_URL) {
  const bucketName = getBucketName();
  const endpoint = normalizeS3Endpoint(process.env.S3_ENDPOINT_URL, bucketName);
  s3Config.endpoint = new AWS.Endpoint(endpoint);
  s3Config.s3ForcePathStyle = true; // untuk kompatibilitas endpoint custom
  s3Config.signatureVersion = 'v4';
  s3Config.sslEnabled = true;
}

const s3 = new AWS.S3(s3Config);

// GET semua pastor (public)
const getAllPastors = async (req, res) => {
  try {
    const pastors = await Pastor.find().sort({ order: 1 });
    res.json(pastors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET pastor by ID
const getPastorById = async (req, res) => {
  try {
    const pastor = await Pastor.findById(req.params.id);
    if (!pastor) {
      return res.status(404).json({ error: 'Pastor tidak ditemukan' });
    }
    res.json(pastor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE pastor baru (admin)
const createPastor = async (req, res) => {
  try {
    const { name, period, image_url } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Nama pastor wajib diisi' });
    }

    // Tentukan order (urutan) - tambahkan di akhir
    const lastPastor = await Pastor.findOne().sort({ order: -1 });
    const newOrder = lastPastor ? lastPastor.order + 1 : 0;

    const pastor = new Pastor({
      name,
      period: period || '',
      image_url: image_url || '',
      order: newOrder
    });

    await pastor.save();
    res.status(201).json({ message: 'Pastor berhasil ditambahkan', pastor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE pastor (admin)
const updatePastor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, period, image_url, order } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (period !== undefined) updateData.period = period;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (order !== undefined) updateData.order = order;

    const pastor = await Pastor.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!pastor) {
      return res.status(404).json({ error: 'Pastor tidak ditemukan' });
    }

    res.json({ message: 'Pastor berhasil diperbarui', pastor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE pastor (admin)
const deletePastor = async (req, res) => {
  try {
    const { id } = req.params;
    const pastor = await Pastor.findByIdAndDelete(id);

    if (!pastor) {
      return res.status(404).json({ error: 'Pastor tidak ditemukan' });
    }

    // Hapus file dari S3 jika ada
    if (pastor.s3_key) {
      const bucketName = getBucketName();
      const params = {
        Bucket: bucketName,
        Key: pastor.s3_key
      };
      if (bucketName) {
        s3.deleteObject(params, (err) => {
          if (err) console.error('Gagal menghapus file S3:', err);
        });
      }
    }

    res.json({ message: 'Pastor berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPLOAD gambar ke S3 (admin)
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File gambar tidak ditemukan' });
    }

    const bucketName = getBucketName();
    if (!bucketName) {
      return res.status(500).json({ error: 'Konfigurasi S3_BUCKET_NAME belum diisi di backend .env' });
    }

    console.log('Upload image - file:', req.file.originalname, 'size:', req.file.size);

    // Generate unique key untuk S3
    const fileExtension = req.file.originalname.split('.').pop();
    const s3Key = `pastors/${uuidv4()}.${fileExtension}`;

    // Parameter untuk upload ke S3
    const params = {
      Bucket: bucketName,
      Key: s3Key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read' // Buat file public readable
    };

    console.log('Uploading to S3:', params.Bucket, '/', params.Key);

    // Upload ke S3
    const result = await s3.upload(params).promise();

    console.log('Upload success:', result.Location);

    // Return URL gambar
    res.json({
      message: 'Gambar berhasil diupload',
      url: result.Location,
      s3_key: s3Key,
      size: req.file.size,
      filename: req.file.originalname
    });
  } catch (err) {
    const details = {
      code: err && err.code,
      statusCode: err && err.statusCode,
      message: err && err.message
    };
    console.error('S3 upload error:', details);
    const safeMessage = details.message || details.code || 'Unknown error';
    const response = { error: 'Gagal upload ke S3: ' + safeMessage };

    // Tambahkan info diagnosis di mode development (tanpa membocorkan kredensial)
    if ((process.env.NODE_ENV || 'development') === 'development') {
      response.details = {
        code: details.code || null,
        statusCode: details.statusCode || null,
        bucket: getBucketName() || null,
        endpoint: process.env.S3_ENDPOINT_URL ? normalizeS3Endpoint(process.env.S3_ENDPOINT_URL, getBucketName()) : null,
        region: process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1'
      };
      response.hint = 'Jika code=SignatureDoesNotMatch/Forbidden: cek S3_ENDPOINT_URL, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME, dan S3_REGION sesuai panel Neva Objects.';
    }

    res.status(500).json(response);
  }
};

// REORDER pastors (admin)
const reorderPastors = async (req, res) => {
  try {
    const { pastorIds } = req.body; // Array of pastor IDs in desired order

    if (!Array.isArray(pastorIds)) {
      return res.status(400).json({ error: 'pastorIds harus berupa array' });
    }

    // Update order untuk setiap pastor
    for (let i = 0; i < pastorIds.length; i++) {
      await Pastor.findByIdAndUpdate(pastorIds[i], { order: i });
    }

    res.json({ message: 'Urutan pastor berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPastors,
  getPastorById,
  createPastor,
  updatePastor,
  deletePastor,
  uploadImage,
  reorderPastors
};
