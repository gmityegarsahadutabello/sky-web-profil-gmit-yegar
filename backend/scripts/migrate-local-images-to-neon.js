/**
 * One-off migration: upload gallery images that live in the repo
 * (frontend/assets/images/arsip/...) into Neon Object Storage, point the
 * MongoDB gallery rows at the new public URLs, then remove the rows that
 * still reference the decommissioned Dominesia bucket.
 *
 * Usage (from backend/):
 *   node scripts/migrate-local-images-to-neon.js --dry-run
 *   node scripts/migrate-local-images-to-neon.js
 */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const mongoose = require('mongoose');

const DRY_RUN = process.argv.includes('--dry-run');

const FRONTEND_ROOT = path.resolve(__dirname, '../../frontend');

const getBucketName = () => process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME;
const getEndpointUrl = () => process.env.S3_ENDPOINT_URL || process.env.AWS_ENDPOINT_URL_S3;

const CONTENT_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif'
};

const sanitizeFileName = (name) => name.replace(/\s+/g, '-');

const buildPublicUrl = (bucket, key) => {
  const endpoint = getEndpointUrl();
  if (!endpoint) throw new Error('S3_ENDPOINT_URL / AWS_ENDPOINT_URL_S3 belum diisi');
  return `${endpoint.replace(/\/$/, '')}/${bucket}/${key}`;
};

// ../assets/images/arsip/2.jpeg -> /repo/frontend/assets/images/arsip/2.jpeg
const resolveLocalFile = (imageUrl) => {
  const relative = imageUrl.replace(/^\.\//, '').replace(/^\.\.\//, '');
  return path.join(FRONTEND_ROOT, relative);
};

const createS3 = () => {
  const config = {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1',
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
  };
  if (getEndpointUrl()) {
    config.endpoint = new AWS.Endpoint(getEndpointUrl().replace(/\/$/, ''));
  }
  return new AWS.S3(config);
};

(async () => {
  const bucket = getBucketName();
  if (!bucket) throw new Error('S3_BUCKET_NAME belum diisi');

  await mongoose.connect(process.env.MONGODB_URI);
  const gallery = mongoose.connection.db.collection('galleryitems');
  const s3 = createS3();

  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}`);
  console.log(`Bucket: ${bucket}`);

  // 1) Migrate local images
  const localRows = await gallery.find({ image_url: /^\.\.\/assets\/images\// }).toArray();
  console.log(`\nFound ${localRows.length} gallery rows with local images`);

  const migrated = [];
  for (const row of localRows) {
    const filePath = resolveLocalFile(row.image_url);
    const fileName = path.basename(filePath);
    const ext = path.extname(fileName).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';
    const key = `gallery/${row.section}/${sanitizeFileName(fileName)}`;
    const url = buildPublicUrl(bucket, key);

    if (!fs.existsSync(filePath)) {
      console.log(`  SKIP missing file: ${filePath}`);
      continue;
    }

    const size = fs.statSync(filePath).size;
    console.log(`  ${row.section} | ${fileName} (${size} bytes) -> ${key}`);

    if (!DRY_RUN) {
      await s3.upload({
        Bucket: bucket,
        Key: key,
        Body: fs.readFileSync(filePath),
        ContentType: contentType
      }).promise();

      await gallery.updateOne(
        { _id: row._id },
        { $set: { image_url: url, s3_key: key } }
      );
    }

    migrated.push({ id: row._id, key, url });
  }

  console.log(`  ${DRY_RUN ? 'Would migrate' : 'Migrated'}: ${migrated.length}`);

  // 2) Back up and delete rows pointing at the dead Dominesia bucket
  const deadRows = await gallery.find({ image_url: /nevaobjects\.id/i }).toArray();
  console.log(`\nFound ${deadRows.length} gallery rows pointing at the dead Dominesia bucket`);
  if (deadRows.length) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(__dirname, 'backups', `gallery-dead-rows-${stamp}.json`);
    console.log(`  Backup: ${backupPath}`);
    if (!DRY_RUN) {
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      fs.writeFileSync(backupPath, JSON.stringify(deadRows, null, 2));
      const result = await gallery.deleteMany({ image_url: /nevaobjects\.id/i });
      console.log(`  Deleted: ${result.deletedCount}`);
    } else {
      console.log(`  ${DRY_RUN ? 'Would delete' : 'Deleted'}: ${deadRows.length}`);
    }
  }

  const remaining = await gallery.countDocuments();
  const neonRows = await gallery.countDocuments({ image_url: new RegExp(bucket + '/gallery/') });
  console.log(`\nGallery rows remaining: ${remaining} (pointing at Neon: ${neonRows})`);

  await mongoose.disconnect();
  console.log(DRY_RUN ? '\nDry run complete.' : '\nMigration complete.');
})().catch(async (err) => {
  console.error('Migration failed:', err.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
