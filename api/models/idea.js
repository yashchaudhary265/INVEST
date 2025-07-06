const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  entrepreneurName: {
    type: String,
    required: true,
    trim: true
  },
  ideaTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fundingNeeded: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Idea', ideaSchema);
