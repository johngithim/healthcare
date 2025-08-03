const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// Register
router.post('/doctor/register', async (req, res) => {
  const { firstname, lastname, email, age, phoneno, address, speciality, telegram, whatsapp, password  } = req.body;


    
  const hashed = await bcrypt.hash(password, 10);

  try {
    const [existingDoctors] = await pool.query('SELECT * FROM doctor WHERE email = ?', [email]);
    if (existingDoctors.length > 0) {
      return res.status(400).json({ message: 'Email already exists for a doctor' });
    }

    const [existingPatients] = await pool.query('SELECT * FROM patient WHERE email = ?', [email]);
    if (existingPatients.length > 0) {
      return res.status(400).json({ message: 'Email already exists for a patient' });
    }


    await pool.query(
      'INSERT INTO doctor (firstname, lastname, email, age, phoneno, adress, speciality, telegram, whatsapp, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [firstname, lastname, email, age, phoneno, address, speciality, telegram, whatsapp, hashed]
    );
    
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Email already exists or DB error' });
  }
});

// Login
router.post('/doctor/login', async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query('SELECT id, email, password FROM doctor WHERE email = ?', [email]);
  const doctor = rows[0];
  
  if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  console.log('user:', user);
const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);
  
  res.json({ token });
});

// Edit Profile for doctors
router.put('/doctor/profile', verifyToken, async (req, res) => {
  const doctorId = req.user.id;
  const fields = req.body;

  if (!doctorId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const [existing] = await pool.query('SELECT * FROM doctor WHERE id = ?', [doctorId]);

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const current = existing[0];

    // Use new values if provided, otherwise keep the old ones
    const updatedDoctor = {
      firstname: fields.firstname || current.firstname,
      lastname: fields.lastname || current.lastname,
      age: fields.age || current.age,
      phoneno: fields.phoneno || current.phoneno,
      adress: fields.adress || current.adress,
      speciality: fields.speciality || current.speciality,
      telegram: fields.telegram || current.telegram,
      whatsapp: fields.whatsapp || current.whatsapp
    };

    // Perform the update
    await pool.query(
      `UPDATE doctor SET firstname = ?, lastname = ?, age = ?, phoneno = ?, adress = ?, speciality = ?, telegram = ?, whatsapp = ? WHERE id = ?`,
      [
        updatedDoctor.firstname,
        updatedDoctor.lastname,
        updatedDoctor.age,
        updatedDoctor.phoneno,
        updatedDoctor.adress,
        updatedDoctor.speciality,
        updatedDoctor.telegram,
        updatedDoctor.whatsapp,
        doctorId
      ]
    );

    res.status(200).json({ message: 'Doctor profile updated successfully' });

  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Database update failed', error: err.message });
  }
});

module.exports = router;
