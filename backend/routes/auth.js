const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, JWT_SECRET } = require('../middleware/auth');

// Seed default accounts if DB is empty
const seedDefaults = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Seeding default portal accounts...');
      
      const admin = new User({
        name: 'Principal Vasant Valley',
        email: 'admin@vasantvalley.edu',
        password: 'password123',
        role: 'admin'
      });
      await admin.save();

      const teacher = new User({
        name: 'Dr. Sarah Sen',
        email: 'teacher@vasantvalley.edu',
        password: 'password123',
        role: 'teacher'
      });
      await teacher.save();

      const student = new User({
        name: 'Aarav Mehta',
        email: 'student@vasantvalley.edu',
        password: 'password123',
        role: 'student'
      });
      await student.save();

      console.log('Default accounts seeded successfully.');
    }
  } catch (err) {
    console.error('Error seeding default accounts:', err.message);
  }
};

// Execute seed
seedDefaults();

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    user = new User({
      name,
      email,
      password,
      role: role || 'student'
    });

    await user.save();

    const payload = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    const payload = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// @route   GET api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
