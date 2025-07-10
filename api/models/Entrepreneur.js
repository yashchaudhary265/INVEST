// api/models/Entrepreneur.js
const mongoose = require('mongoose');

const entrepreneurSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  startupStage: {
    type: String,
    enum: ['Idea Stage', 'Prototype', 'MVP', 'Early Stage', 'Growth Stage', 'Expansion'],
    default: 'Idea Stage'
  },
  sector: {
    type: String,
    required: [true, 'Sector is required'],
    trim: true
  },
  description: {
    type: String,
    maxLength: [1000, 'Description cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Entrepreneur', entrepreneurSchema);
