// Script untuk migrasi data dari localStorage JSON ke MongoDB
// Gunakan: node scripts/migrate.js < data.json

require('dotenv').config();
const mongoose = require('mongoose');
const Pastor = require('../models/Pastor');

async function migrate(data) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - uncomment jika ingin clear)
    // await Pastor.deleteMany({});
    // console.log('Cleared existing pastors');

    // Insert data
    const result = await Pastor.insertMany(data, { ordered: false });
    console.log(`✅ ${result.length} pastor(s) berhasil dimigrasi ke MongoDB`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (err) {
    console.error('❌ Migration error:', err.message);
    process.exit(1);
  }
}

// Read JSON from stdin
let jsonString = '';
process.stdin.on('data', chunk => {
  jsonString += chunk;
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(jsonString);
    const pastorsData = Array.isArray(data) ? data : data.pastors || [];
    
    // Normalize data structure
    const normalizedData = pastorsData.map((p, index) => ({
      name: p.name || '',
      period: p.period || '',
      image_url: p.image_url || p.image || '',
      order: p.order !== undefined ? p.order : index
    }));

    console.log(`📊 Akan migrasi ${normalizedData.length} pastor(s)...`);
    migrate(normalizedData);
  } catch (err) {
    console.error('❌ JSON parse error:', err.message);
    process.exit(1);
  }
});

// Jika no stdin, baca dari file atau gunakan data sample
if (process.stdin.isTTY) {
  const sampleData = [
    {
      name: 'Pendeta Pelayanan Pertama',
      period: '1950 - 1970',
      image_url: 'arsip/pastor1.jpg',
      order: 0
    },
    {
      name: 'Pdt. Selvy J.K. Asfes-Zina, S.Th',
      period: '2020 - Sekarang',
      image_url: 'arsip/IMG-20251124-WA0059.jpg',
      order: 1
    }
  ];
  console.log('No stdin detected. Using sample data...');
  migrate(sampleData);
}
