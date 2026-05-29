const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const GalleryItem = require('../models/GalleryItem');

const getBucketName = () => process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME;

const normalizeS3Endpoint = (rawEndpoint, bucketName) => {
  if (!rawEndpoint) return rawEndpoint;
  try {
    const url = new URL(rawEndpoint);
    const hostname = (url.hostname || '').toLowerCase();
    const bucketPrefix = bucketName ? `${bucketName.toLowerCase()}.` : '';

    // Jika endpoint berisi bucket sebagai subdomain, strip supaya request tidak dobel bucket.
    if (bucketPrefix && hostname.startsWith(bucketPrefix)) {
      url.hostname = url.hostname.slice(bucketPrefix.length);
    }

    return url.toString().replace(/\/$/, '');
  } catch {
    return rawEndpoint;
  }
};

const createS3Client = () => {
  const s3Config = {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1'
  };

  if (process.env.S3_ENDPOINT_URL) {
    const bucketName = getBucketName();
    const endpoint = normalizeS3Endpoint(process.env.S3_ENDPOINT_URL, bucketName);
    s3Config.endpoint = new AWS.Endpoint(endpoint);
    s3Config.s3ForcePathStyle = true;
    s3Config.signatureVersion = 'v4';
    s3Config.sslEnabled = true;
  }

  return new AWS.S3(s3Config);
};

const s3 = createS3Client();

const parseSection = (value) => {
  if (!value) return null;
  const section = String(value).trim();
  if (section === 'activities' || section === 'building') return section;
  return null;
};

// PUBLIC: GET items by section
const getPublicGallery = async (req, res) => {
  try {
    const section = parseSection(req.query.section);
    if (!section) {
      return res.status(400).json({ error: 'section wajib: activities atau building' });
    }

    const items = await GalleryItem.find({ section }).sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: GET items (optional filter section)
const getAdminGallery = async (req, res) => {
  try {
    const section = parseSection(req.query.section);
    const filter = section ? { section } : {};
    const items = await GalleryItem.find(filter).sort({ section: 1, order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: CREATE item
const createGalleryItem = async (req, res) => {
  try {
    const section = parseSection(req.body.section);
    const { image_url, caption } = req.body;

    if (!section) {
      return res.status(400).json({ error: 'section wajib: activities atau building' });
    }
    if (!image_url) {
      return res.status(400).json({ error: 'image_url wajib diisi' });
    }

    const last = await GalleryItem.findOne({ section }).sort({ order: -1 });
    const newOrder = last ? last.order + 1 : 0;

    const item = new GalleryItem({
      section,
      image_url,
      caption: caption || '',
      order: newOrder,
      s3_key: req.body.s3_key || ''
    });

    await item.save();
    res.status(201).json({ message: 'Item galeri berhasil ditambahkan', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: UPDATE item
const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, image_url, s3_key } = req.body;

    const updateData = {};
    if (caption !== undefined) updateData.caption = caption;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (s3_key !== undefined) updateData.s3_key = s3_key;

    const item = await GalleryItem.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!item) {
      return res.status(404).json({ error: 'Item galeri tidak ditemukan' });
    }

    res.json({ message: 'Item galeri berhasil diperbarui', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: DELETE item (and optionally delete from S3)
const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await GalleryItem.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ error: 'Item galeri tidak ditemukan' });
    }

    const bucketName = getBucketName();
    if (bucketName && item.s3_key) {
      s3.deleteObject({ Bucket: bucketName, Key: item.s3_key }, (err) => {
        if (err) console.error('Gagal menghapus file S3:', { code: err.code, statusCode: err.statusCode, message: err.message });
      });
    }

    res.json({ message: 'Item galeri berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: REORDER items in a section
const reorderGalleryItems = async (req, res) => {
  try {
    const section = parseSection(req.body.section);
    const { itemIds } = req.body;

    if (!section) {
      return res.status(400).json({ error: 'section wajib: activities atau building' });
    }
    if (!Array.isArray(itemIds)) {
      return res.status(400).json({ error: 'itemIds harus berupa array' });
    }

    for (let i = 0; i < itemIds.length; i++) {
      await GalleryItem.findByIdAndUpdate(itemIds[i], { order: i });
    }

    res.json({ message: 'Urutan galeri berhasil diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN: UPLOAD image to S3 for gallery
const uploadGalleryImage = async (req, res) => {
  try {
    const section = parseSection(req.body.section || req.query.section);
    if (!section) {
      return res.status(400).json({ error: 'section wajib: activities atau building' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'File gambar tidak ditemukan' });
    }

    const bucketName = getBucketName();
    if (!bucketName) {
      return res.status(500).json({ error: 'Konfigurasi S3_BUCKET_NAME belum diisi di backend .env' });
    }

    const fileExtension = req.file.originalname.split('.').pop();
    const s3Key = `gallery/${section}/${uuidv4()}.${fileExtension}`;

    const params = {
      Bucket: bucketName,
      Key: s3Key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    };

    const result = await s3.upload(params).promise();

    res.json({
      message: 'Gambar galeri berhasil diupload',
      url: result.Location,
      s3_key: s3Key,
      size: req.file.size,
      filename: req.file.originalname,
      section
    });
  } catch (err) {
    const details = { code: err && err.code, statusCode: err && err.statusCode, message: err && err.message };
    console.error('Gallery S3 upload error:', details);
    const safeMessage = details.message || details.code || 'Unknown error';
    res.status(500).json({ error: 'Gagal upload ke S3: ' + safeMessage, details: { code: details.code || null, statusCode: details.statusCode || null } });
  }
};

module.exports = {
  getPublicGallery,
  getAdminGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  reorderGalleryItems,
  uploadGalleryImage
};
