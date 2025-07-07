const express = require('express');
const router = express.Router();
const Investor = require('../models/investor'); // Ensure path and casing is correct

// POST /api/investors/proposals
router.post('/proposals', async (req, res) => {
  try {
    const { name, email, phone, investmentCapacity, sector } = req.body;

    // Validation
    if (!name || !email || !phone || !investmentCapacity || !sector) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Debug log
    console.log('Investor Submission Received:', req.body);

    const newInvestor = new Investor({
      name,
      email,
      phone,
      investmentCapacity,
      sector
    });

    await newInvestor.save();
    res.status(201).json({ message: 'Investor submitted successfully' });
  } catch (err) {
    console.error('❌ Investor Submission Error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /api/investors/
router.get('/', async (req, res) => {
  try {
    const data = await Investor.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch investors' });
  }
});

module.exports = router;
