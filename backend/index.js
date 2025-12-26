const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected ✅'))
  .catch(err => console.error(err));

// Test route
app.get('/', (req, res) => {
  res.send('Backend running 🚀');
});

// Receive data from frontend
app.post('/submit', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const user = new User({ name, email });
    await user.save();

    res.json({
      success: true,
      message: 'Data saved to MongoDB Atlas',
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
