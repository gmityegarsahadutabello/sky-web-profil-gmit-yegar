const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token tidak valid atau kadaluarsa' });
  }
};

module.exports = authMiddleware;
