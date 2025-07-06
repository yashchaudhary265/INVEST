const express = require('express');
const router = express.Router();

const Entrepreneur = require('../models/Entrepreneur');
const Idea = require('../models/idea');
const Investor = require('../models/investor');

router.get('/all-data', async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    const ideas = await Idea.find();
    const investors = await Investor.find();

    res.json({
      entrepreneurs,
      ideas,
      investors
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err });
  }
});

module.exports = router;
