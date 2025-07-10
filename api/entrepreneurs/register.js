// api/entrepreneurs/register.js (Updated)
const express = require('express');
const router = express.Router();
const Entrepreneur = require('../models/Entrepreneur');
const { validateEntrepreneur } = require('../middleware/validation');

// POST /api/entrepreneurs/register
router.post('/register', validateEntrepreneur, async (req, res) => {
  try {
    // Check if entrepreneur already exists
    const existingEntrepreneur = await Entrepreneur.findOne({ email: req.body.email });
    if (existingEntrepreneur) {
      return res.status(400).json({ 
        error: 'Email already registered', 
        message: 'An entrepreneur with this email already exists' 
      });
    }

    const newEntrepreneur = new Entrepreneur(req.body);
    const savedEntrepreneur = await newEntrepreneur.save();
    
    res.status(201).json({ 
      message: 'Entrepreneur registered successfully',
      data: {
        id: savedEntrepreneur._id,
        name: savedEntrepreneur.name,
        email: savedEntrepreneur.email
      }
    });
  } catch (err) {
    console.error('❌ Entrepreneur Registration Error:', err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /api/entrepreneurs/
router.get('/', async (req, res) => {
  try {
    const { sector, stage, limit = 50, page = 1 } = req.query;
    const query = {};
    
    if (sector) query.sector = new RegExp(sector, 'i');
    if (stage) query.startupStage = stage;

    const entrepreneurs = await Entrepreneur.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Entrepreneur.countDocuments(query);
    
    res.json({
      data: entrepreneurs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('❌ Error fetching entrepreneurs:', err);
    res.status(500).json({ error: 'Failed to fetch entrepreneurs' });
  }
});

module.exports = router;
