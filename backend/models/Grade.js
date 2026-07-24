const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  studentEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
    default: 100,
  },
  grade: {
    type: String,
    required: true,
    trim: true,
  },
  remarks: {
    type: String,
    trim: true,
  },
  term: {
    type: String,
    required: true,
    default: 'Term 1',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Grade', GradeSchema);
