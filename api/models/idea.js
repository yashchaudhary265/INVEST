// api/models/idea.js
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  entrepreneurName: {
    type: String,
    required: [true, 'Entrepreneur name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  ideaTitle: {
    type: String,
    required: [true, 'Idea title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxLength: [2000, 'Description cannot exceed 2000 characters']
  },
  fundingNeeded: {
    type: Number,
    required: [true, 'Funding amount is required'],
    min: [1000, 'Minimum funding amount is ₹1,000'],
    max: [1000000000, 'Maximum funding amount is ₹100 crores']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Approved', 'Rejected'],
    default: 'Submitted'
  }
}, {
  timestamps: true
});

// ✅ CORRECT: Use this pattern to prevent overwrite errors
module.exports = mongoose.models.Idea || mongoose.model('Idea', ideaSchema);
