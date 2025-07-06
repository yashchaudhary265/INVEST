const express = require('express');
const router = express.Router();
const Idea = require('../models/idea'); // Make sure filename matches exactly (case-sensitive on Mac/Linux)

// POST /api/ideas/submit
router.post('/submit', async (req, res) => {
  try {
    const newIdea = new Idea(req.body);
    await newIdea.save();
    res.status(201).json({ message: 'Idea submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const data = await Idea.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ideas' });
  }
});

module.exports = router;
