const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Vasant Valley School Redesign API is running!' });
});

// Import Routes
const authRoutes = require('./routes/auth');
const admissionsRoutes = require('./routes/admissions');
const noticesRoutes = require('./routes/notices');
const gradesRoutes = require('./routes/grades');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionsRoutes);
app.use('/api/notices', noticesRoutes);
app.use('/api/grades', gradesRoutes);

// MongoDB Connection with fallback/warning
const mongoURI = process.env.MONGO_URI;
console.log('Connecting to MongoDB Atlas...');

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.log('Backend will run, but database persistence requires MongoDB to be running.');
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
