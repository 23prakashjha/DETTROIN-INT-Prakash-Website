const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const { auth, authorize } = require('../middleware/auth');

// Seed default grades if empty
const seedGrades = async () => {
  try {
    const gradesCount = await Grade.countDocuments();
    if (gradesCount === 0) {
      console.log('Seeding initial grades...');
      const grades = [
        {
          studentEmail: 'student@vasantvalley.edu',
          studentName: 'Aarav Mehta',
          subject: 'Mathematics',
          marks: 92,
          maxMarks: 100,
          grade: 'A',
          remarks: 'Excellent analytical skills, consistent performance.',
          term: 'Term 1'
        },
        {
          studentEmail: 'student@vasantvalley.edu',
          studentName: 'Aarav Mehta',
          subject: 'Physics',
          marks: 88,
          maxMarks: 100,
          grade: 'A-',
          remarks: 'Good grasp of concepts, lab reports are highly detailed.',
          term: 'Term 1'
        },
        {
          studentEmail: 'student@vasantvalley.edu',
          studentName: 'Aarav Mehta',
          subject: 'English Literature',
          marks: 85,
          maxMarks: 100,
          grade: 'B+',
          remarks: 'Active participant in discussions. Essay writing is strong.',
          term: 'Term 1'
        },
        {
          studentEmail: 'student@vasantvalley.edu',
          studentName: 'Aarav Mehta',
          subject: 'Computer Science',
          marks: 95,
          maxMarks: 100,
          grade: 'A+',
          remarks: 'Outstanding projects and debugging skills.',
          term: 'Term 1'
        }
      ];
      await Grade.insertMany(grades);
      console.log('Grades seeded successfully.');
    }
  } catch (err) {
    console.error('Error seeding grades:', err.message);
  }
};

seedGrades();

// @route   GET api/grades
// @desc    Get grades (Students get their own, teachers/admins get all or filtered)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'student') {
      // Students can only see their own grades
      const grades = await Grade.find({ studentEmail: req.user.email.toLowerCase() }).sort({ dateAdded: -1 });
      return res.json(grades);
    }

    // Teacher & Admin can see all grades (or filter by studentEmail)
    const { studentEmail } = req.query;
    const filter = studentEmail ? { studentEmail: studentEmail.toLowerCase() } : {};
    const grades = await Grade.find(filter).sort({ dateAdded: -1 });
    res.json(grades);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/grades
// @desc    Add or update a student grade
// @access  Private (Teacher/Admin only)
router.post('/', auth, authorize(['teacher', 'admin']), async (req, res) => {
  const { studentEmail, studentName, subject, marks, maxMarks, grade, remarks, term } = req.body;

  if (!studentEmail || !studentName || !subject || !marks || !grade) {
    return res.status(400).json({ message: 'Please enter all required grading fields.' });
  }

  try {
    const newGrade = new Grade({
      studentEmail: studentEmail.toLowerCase(),
      studentName,
      subject,
      marks,
      maxMarks: maxMarks || 100,
      grade,
      remarks,
      term: term || 'Term 1'
    });

    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/grades/:id
// @desc    Delete a grade record
// @access  Private (Teacher/Admin only)
router.delete('/:id', auth, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade record not found.' });
    }

    await grade.deleteOne();
    res.json({ message: 'Grade record removed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
