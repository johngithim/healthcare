const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('../config/db');


const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Invalid token format' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.user = decoded; // { id, email, role }
    next();
  });
};

const verifyUserTable = async (req, res, next) => {

  try {
    const [doctorRows] = await pool.query('SELECT id FROM doctor WHERE id = ?', [req.user.id]);
    if (doctorRows.length > 0) {
      req.user.role = 'doctor';
      return next();
    }
    const [patientRows] = await pool.query('SELECT id FROM paitent WHERE id = ?', [req.user.id]);
    if (patientRows.length > 0) {
      req.user.role = 'patient';
      return next();
    }
    return res.status(403).json({ message: 'User role not found in any table' });
  } catch (err) {
    return res.status(500).json({ message: 'Database error during role check', error: err.message });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ message: 'Access denied: role mismatch' });
  }
  next();
};


module.exports = { verifyToken, verifyUserTable, requireRole};
