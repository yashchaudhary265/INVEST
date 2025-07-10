// api/routes/summary.js (Updated)
const express = require('express');
const router = express.Router();
const Entrepreneur = require('../models/Entrepreneur');
const Idea = require('../models/idea');
const Investor = require('../models/investor');

// GET /api/summary/all-data
router.get('/all-data', async (req, res) => {
  try {
    console.log('📊 Fetching all data for dashboard...');

    const [entrepreneurs, ideas, investors] = await Promise.all([
      Entrepreneur.find().sort({ createdAt: -1 }).lean(),
      Idea.find().sort({ createdAt: -1 }).lean(),
      Investor.find().sort({ createdAt: -1 }).lean()
    ]);

    console.log(`✅ Found: ${entrepreneurs.length} entrepreneurs, ${ideas.length} ideas, ${investors.length} investors`);

    res.json({
      success: true,
      entrepreneurs: entrepreneurs || [],
      ideas: ideas || [],
      investors: investors || [],
      summary: {
        totalEntrepreneurs: entrepreneurs.length,
        totalIdeas: ideas.length,
        totalInvestors: investors.length,
        totalFundingRequested: ideas.reduce((sum, idea) => sum + (idea.fundingNeeded || 0), 0),
        totalInvestmentCapacity: investors.reduce((sum, inv) => sum + (inv.investmentCapacity || 0), 0)
      }
    });
  } catch (err) {
    console.error('❌ Error fetching summary data:', err);
    res.status(500).json({ 
      error: 'Failed to fetch data', 
      details: err.message,
      entrepreneurs: [],
      ideas: [],
      investors: []
    });
  }
});

// GET /api/summary/stats
router.get('/stats', async (req, res) => {
  try {
    const [entrepreneurCount, ideaCount, investorCount] = await Promise.all([
      Entrepreneur.countDocuments(),
      Idea.countDocuments(),
      Investor.countDocuments()
    ]);

    const [totalFunding, totalCapacity] = await Promise.all([
      Idea.aggregate([{ $group: { _id: null, total: { $sum: '$fundingNeeded' } } }]),
      Investor.aggregate([{ $group: { _id: null, total: { $sum: '$investmentCapacity' } } }])
    ]);

    const sectorStats = await Promise.all([
      Entrepreneur.aggregate([
        { $group: { _id: '$sector', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      Investor.aggregate([
        { $group: { _id: '$sectorInterest', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.json({
      totalEntrepreneurs: entrepreneurCount,
      totalIdeas: ideaCount,
      totalInvestors: investorCount,
      totalFundingRequested: totalFunding[0]?.total || 0,
      totalInvestmentCapacity: totalCapacity[0]?.total || 0,
      topEntrepreneurSectors: sectorStats[0],
      topInvestorSectors: sectorStats[1]
    });
  } catch (err) {
    console.error('❌ Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// GET /api/summary/matching
router.get('/matching', async (req, res) => {
  try {
    // Find potential matches between ideas and investors
    const ideas = await Idea.find({ status: 'Submitted' }).lean();
    const investors = await Investor.find().lean();
    
    const matches = [];
    
    ideas.forEach(idea => {
      const potentialInvestors = investors.filter(investor => {
        const sectorMatch = investor.sectorInterest.toLowerCase().includes(idea.description.toLowerCase()) ||
                           idea.description.toLowerCase().includes(investor.sectorInterest.toLowerCase());
        const capacityMatch = investor.investmentCapacity >= idea.fundingNeeded;
        
        return sectorMatch && capacityMatch;
      });
      
      if (potentialInvestors.length > 0) {
        matches.push({
          idea: {
            id: idea._id,
            title: idea.ideaTitle,
            entrepreneur: idea.entrepreneurName,
            funding: idea.fundingNeeded
          },
          investors: potentialInvestors.map(inv => ({
            id: inv._id,
            name: inv.name,
            capacity: inv.investmentCapacity,
            sector: inv.sectorInterest
          }))
        });
      }
    });
    
    res.json({ matches });
  } catch (err) {
    console.error('❌ Error finding matches:', err);
    res.status(500).json({ error: 'Failed to find matches' });
  }
});

module.exports = router;