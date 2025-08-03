const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');

dotenv.config();
const app = express();

app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated', userId: req.userId });
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
