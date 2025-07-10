// api/routes/summary.js
const express = require('express');
const router = express.Router();
const Entrepreneur = require('../models/Entrepreneur');
const Idea = require('../models/idea');
const Investor = require('../models/investor');

// GET /api/summary/all-data
router.get('/all-data', async (req, res) => {
  try {
    console.log('📊 Fetching all data for dashboard...');

    // Add CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    const [entrepreneurs, ideas, investors] = await Promise.all([
      Entrepreneur.find().sort({ createdAt: -1 }).lean(),
      Idea.find().sort({ createdAt: -1 }).lean(),
      Investor.find().sort({ createdAt: -1 }).lean()
    ]);

    console.log(`✅ Found: ${entrepreneurs.length} entrepreneurs, ${ideas.length} ideas, ${investors.length} investors`);

    // Ensure all arrays exist even if empty
    const entrepreneursData = entrepreneurs || [];
    const ideasData = ideas || [];
    const investorsData = investors || [];

    // Calculate summary stats
    const totalFundingRequested = ideasData.reduce((sum, idea) => {
      const funding = parseFloat(idea.fundingNeeded) || 0;
      return sum + funding;
    }, 0);

    const totalInvestmentCapacity = investorsData.reduce((sum, inv) => {
      const capacity = parseFloat(inv.investmentCapacity) || 0;
      return sum + capacity;
    }, 0);

    const responseData = {
      success: true,
      entrepreneurs: entrepreneursData,
      ideas: ideasData,
      investors: investorsData,
      summary: {
        totalEntrepreneurs: entrepreneursData.length,
        totalIdeas: ideasData.length,
        totalInvestors: investorsData.length,
        totalFundingRequested,
        totalInvestmentCapacity
      }
    };

    console.log('📤 Sending response:', {
      entrepreneurs: entrepreneursData.length,
      ideas: ideasData.length,
      investors: investorsData.length
    });

    res.json(responseData);
  } catch (err) {
    console.error('❌ Error fetching summary data:', err);
    res.status(500).json({ 
      error: 'Failed to fetch data', 
      details: err.message,
      entrepreneurs: [],
      ideas: [],
      investors: [],
      success: false
    });
  }
});

// GET /api/summary/test - Test endpoint
router.get('/test', async (req, res) => {
  try {
    const counts = await Promise.all([
      Entrepreneur.countDocuments(),
      Idea.countDocuments(),
      Investor.countDocuments()
    ]);

    res.json({
      message: 'API is working',
      counts: {
        entrepreneurs: counts[0],
        ideas: counts[1],
        investors: counts[2]
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;