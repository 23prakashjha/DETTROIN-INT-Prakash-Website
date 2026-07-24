const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const { auth, authorize } = require('../middleware/auth');

// Seed default notices if empty
const seedNotices = async () => {
  try {
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      console.log('Seeding initial notices...');
      const notices = [
        {
          title: 'Admissions Open for Academic Year 2026-27',
          content: 'Vasant Valley School invites applications for admissions from Nursery to Class XI. Online applications can be submitted through our portal now.',
          category: 'Admission',
          priority: 'high',
          createdBy: 'Admissions Office',
        },
        {
          title: 'Annual Sports Day Postponement',
          content: 'Please note that the Annual Sports Day, scheduled for next Friday, has been postponed to the following month due to forecasted rains. A revised schedule will be shared soon.',
          category: 'Sports',
          priority: 'medium',
          createdBy: 'Sports Committee',
        },
        {
          title: 'VVS Wins Inter-School Science Congress',
          content: 'Congratulations to our senior science team for securing first place in the National Inter-School Science Congress with their solar grid design project!',
          category: 'Event',
          priority: 'medium',
          createdBy: 'Science Department',
        },
        {
          title: 'Inter-House Debate Championship',
          content: 'The Inter-House debate championship will commence on Monday. All house captains must submit the list of speakers to the English Club by tomorrow afternoon.',
          category: 'Academic',
          priority: 'low',
          createdBy: 'Student Council',
        }
      ];
      await Notice.insertMany(notices);
      console.log('Notices seeded successfully.');
    }
  } catch (err) {
    console.error('Error seeding notices:', err.message);
  }
};

seedNotices();

// @route   GET api/notices
// @desc    Get all notices
// @access  Public
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/notices
// @desc    Create a notice
// @access  Private (Teacher/Admin only)
router.post('/', auth, authorize(['teacher', 'admin']), async (req, res) => {
  const { title, content, category, priority } = req.body;

  try {
    const notice = new Notice({
      title,
      content,
      category,
      priority,
      createdBy: req.user.name
    });

    await notice.save();
    res.status(201).json(notice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/notices/:id
// @desc    Delete a notice
// @access  Private (Teacher/Admin only)
router.delete('/:id', auth, authorize(['teacher', 'admin']), async (req, res) => {
  try {
    const notice = await Notice.findById(req.id || req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found.' });
    }

    await notice.deleteOne();
    res.json({ message: 'Notice successfully removed.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
