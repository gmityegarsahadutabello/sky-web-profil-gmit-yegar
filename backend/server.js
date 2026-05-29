const { app, connectToMongo } = require('./app');
const PORT = process.env.PORT || 5000;

connectToMongo()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} sudah dipakai. Matikan server yang sedang berjalan atau ganti PORT di .env, lalu coba lagi.`);
        return process.exit(1);
      }

      console.error('❌ Server error:', err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

  // ini cuman text
