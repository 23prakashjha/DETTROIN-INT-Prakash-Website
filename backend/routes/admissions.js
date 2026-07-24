const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const { auth, authorize } = require('../middleware/auth');

// Seed default admissions if empty
const seedAdmissions = async () => {
  try {
    const admissionCount = await Admission.countDocuments();
    if (admissionCount === 0) {
      console.log('Seeding initial admissions...');
      const admissions = [
        {
          studentName: 'Vihaan Sharma',
          parentName: 'Alok Sharma',
          email: 'alok.sharma@example.com',
          phone: '+91 98765 43210',
          grade: 'Grade IX',
          additionalInfo: 'Seeking admission due to family relocation from Mumbai. Excellent academic record in previous school.',
          status: 'pending'
        },
        {
          studentName: 'Ananya Iyer',
          parentName: 'Raman Iyer',
          email: 'riyer@example.com',
          phone: '+91 99887 76655',
          grade: 'Grade VI',
          additionalInfo: 'Ananya is an avid chess player and has participated in state-level championships.',
          status: 'pending'
        },
        {
          studentName: 'Kabir Kapoor',
          parentName: 'Sanjay Kapoor',
          email: 'skapoor@example.com',
          phone: '+91 91234 56789',
          grade: 'Grade XI (Science)',
          additionalInfo: 'Interested in Cambridge Advanced AS Level. Opting for Physics, Chemistry, Mathematics, and Computer Science.',
          status: 'approved'
        }
      ];
      await Admission.insertMany(admissions);
      console.log('Admissions seeded successfully.');
    }
  } catch (err) {
    console.error('Error seeding admissions:', err.message);
  }
};

seedAdmissions();

// @route   POST api/admissions
// @desc    Submit an admission form
// @access  Public
router.post('/', async (req, res) => {
  const { studentName, parentName, email, phone, grade, additionalInfo } = req.body;

  if (!studentName || !parentName || !email || !phone || !grade) {
    return res.status(400).json({ message: 'All required fields must be completed.' });
  }

  try {
    const newApplication = new Admission({
      studentName,
      parentName,
      email,
      phone,
      grade,
      additionalInfo
    });

    await newApplication.save();
    res.status(201).json({
      message: 'Admission application submitted successfully.',
      application: newApplication
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/admissions
// @desc    Get all admission applications
// @access  Private (Teacher/Admin only)
router.get('/', auth, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const applications = await Admission.find().sort({ appliedAt: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/admissions/:id
// @desc    Update admission application status
// @access  Private (Admin only)
router.put('/:id', auth, authorize(['admin']), async (req, res) => {
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value.' });
  }

  try {
    const application = await Admission.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Admission application not found.' });
    }

    application.status = status;
    await application.save();

    res.json({
      message: `Application status updated to ${status}.`,
      application
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
