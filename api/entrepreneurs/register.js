const express = require('express');
const router = express.Router();
const Entrepreneur = require('../models/Entrepreneur');


// POST /api/entrepreneurs/register
router.post('/register', async (req, res) => {
  try {
    const newEntrepreneur = new Entrepreneur(req.body);
    await newEntrepreneur.save();
    res.status(201).json({ message: 'Entrepreneur registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const data = await Entrepreneur.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entrepreneurs' });
  }
});

module.exports = router;
