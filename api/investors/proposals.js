// api/investors/proposals.js (Updated)
const express = require('express');
const router = express.Router();
const Investor = require('../models/investor');
const { validateInvestor } = require('../middleware/validation');

// POST /api/investors/proposals
router.post('/proposals', validateInvestor, async (req, res) => {
  try {
    // Check if investor already exists
    const existingInvestor = await Investor.findOne({ email: req.body.email });
    if (existingInvestor) {
      return res.status(400).json({ 
        error: 'Email already registered', 
        message: 'An investor with this email already exists' 
      });
    }

    console.log('💾 Saving investor:', req.body);

    const newInvestor = new Investor(req.body);
    const savedInvestor = await newInvestor.save();
    
    res.status(201).json({ 
      message: 'Investor profile submitted successfully',
      data: {
        id: savedInvestor._id,
        name: savedInvestor.name,
        email: savedInvestor.email,
        investmentCapacity: savedInvestor.investmentCapacity
      }
    });
  } catch (err) {
    console.error('❌ Investor Submission Error:', err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /api/investors/
router.get('/', async (req, res) => {
  try {
    const { 
      minCapacity, 
      maxCapacity, 
      sector, 
      investmentType,
      riskTolerance,
      limit = 50, 
      page = 1,
      sort = 'createdAt'
    } = req.query;
    
    const query = {};
    
    if (minCapacity || maxCapacity) {
      query.investmentCapacity = {};
      if (minCapacity) query.investmentCapacity.$gte = parseFloat(minCapacity);
      if (maxCapacity) query.investmentCapacity.$lte = parseFloat(maxCapacity);
    }
    
    if (sector) query.sectorInterest = new RegExp(sector, 'i');
    if (investmentType) query.investmentType = investmentType;
    if (riskTolerance) query.riskTolerance = riskTolerance;

    const sortOrder = sort.startsWith('-') ? -1 : 1;
    const sortField = sort.replace(/^-/, '');

    const investors = await Investor.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ [sortField]: sortOrder });

    const total = await Investor.countDocuments(query);
    
    res.json({
      data: investors,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('❌ Error fetching investors:', err);
    res.status(500).json({ error: 'Failed to fetch investors' });
  }
});

module.exports = router;
