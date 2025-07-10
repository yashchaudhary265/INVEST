// api/ideas/submit.js (Updated)
const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');
const { validateIdea } = require('../middleware/validation');

// POST /api/ideas/submit
router.post('/submit', validateIdea, async (req, res) => {
  try {
    const newIdea = new Idea(req.body);
    const savedIdea = await newIdea.save();
    
    res.status(201).json({ 
      message: 'Idea submitted successfully',
      data: {
        id: savedIdea._id,
        title: savedIdea.ideaTitle,
        entrepreneur: savedIdea.entrepreneurName
      }
    });
  } catch (err) {
    console.error('❌ Idea Submission Error:', err);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /api/ideas/
router.get('/', async (req, res) => {
  try {
    const { 
      minFunding, 
      maxFunding, 
      entrepreneur, 
      status = 'Submitted',
      limit = 50, 
      page = 1,
      sort = 'createdAt'
    } = req.query;
    
    const query = {};
    
    if (minFunding || maxFunding) {
      query.fundingNeeded = {};
      if (minFunding) query.fundingNeeded.$gte = parseFloat(minFunding);
      if (maxFunding) query.fundingNeeded.$lte = parseFloat(maxFunding);
    }
    
    if (entrepreneur) query.entrepreneurName = new RegExp(entrepreneur, 'i');
    if (status) query.status = status;

    const sortOrder = sort.startsWith('-') ? -1 : 1;
    const sortField = sort.replace(/^-/, '');

    const ideas = await Idea.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ [sortField]: sortOrder });

    const total = await Idea.countDocuments(query);
    
    res.json({
      data: ideas,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('❌ Error fetching ideas:', err);
    res.status(500).json({ error: 'Failed to fetch ideas' });
  }
});

module.exports = router;
