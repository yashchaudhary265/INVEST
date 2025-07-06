const express = require('express');
const router = express.Router();
const Investor = require('../models/investor'); // Make sure filename matches exactly (case-sensitive on Mac/Linux)

// POST /api/ideas/submit
router.post('/proposals', async (req, res) => {
  try {
    const newInvestor = new Investor(req.body);
    await newInvestor.save();
    res.status(201).json({ message: 'Investor submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const data = await Investor.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch investors' });
  }
});

module.exports = router;
