const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: Number,
    required: true
  },
  investmentCapacity: {
    type: Number,
    required: true
  },
  sectorInterest: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Investor', investorSchema);
