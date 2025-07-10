// api/models/investor.js
const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
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
  investmentCapacity: {
    type: Number,
    required: [true, 'Investment capacity is required'],
    min: [10000, 'Minimum investment capacity is ₹10,000'],
    max: [10000000000, 'Maximum investment capacity is ₹1000 crores']
  },
  sectorInterest: {
    type: String,
    required: [true, 'Sector interest is required'],
    trim: true
  },
  investmentType: {
    type: String,
    enum: ['Angel', 'Seed', 'Series A', 'Series B', 'Growth', 'Any'],
    default: 'Any'
  },
  riskTolerance: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  }
}, {
  timestamps: true
});

// ✅ CORRECT: Use this pattern to prevent overwrite errors
module.exports = mongoose.models.Investor || mongoose.model('Investor', investorSchema);
