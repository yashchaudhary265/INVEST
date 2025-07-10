// api/middleware/validation.js
const validateEntrepreneur = (req, res, next) => {
  const { name, email, phone, sector } = req.body;
  const errors = [];

  if (!name?.trim()) errors.push('Name is required');
  if (!email?.trim()) errors.push('Email is required');
  else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Please enter a valid email');
  }
  
  if (!phone?.toString().trim()) errors.push('Phone is required');
  else if (!/^[0-9]{10}$/.test(phone.toString().replace(/\D/g, ''))) {
    errors.push('Please enter a valid 10-digit phone number');
  }
  
  if (!sector?.trim()) errors.push('Sector is required');

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  // Clean the phone number
  req.body.phone = phone.toString().replace(/\D/g, '');
  next();
};

const validateIdea = (req, res, next) => {
  const { entrepreneurName, ideaTitle, description, fundingNeeded, email } = req.body;
  const errors = [];

  if (!entrepreneurName?.trim()) errors.push('Entrepreneur name is required');
  if (!ideaTitle?.trim()) errors.push('Idea title is required');
  if (!description?.trim()) errors.push('Description is required');
  if (!email?.trim()) errors.push('Email is required');
  else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Please enter a valid email');
  }

  if (!fundingNeeded) errors.push('Funding amount is required');
  else {
    const amount = parseFloat(fundingNeeded);
    if (isNaN(amount) || amount < 1000) {
      errors.push('Minimum funding amount is ₹1,000');
    } else if (amount > 1000000000) {
      errors.push('Maximum funding amount is ₹100 crores');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  // Ensure fundingNeeded is a number
  req.body.fundingNeeded = parseFloat(fundingNeeded);
  next();
};

const validateInvestor = (req, res, next) => {
  const { name, email, phone, investmentCapacity, sectorInterest } = req.body;
  const errors = [];

  if (!name?.trim()) errors.push('Name is required');
  if (!email?.trim()) errors.push('Email is required');
  else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Please enter a valid email');
  }
  
  if (!phone?.toString().trim()) errors.push('Phone is required');
  else if (!/^[0-9]{10}$/.test(phone.toString().replace(/\D/g, ''))) {
    errors.push('Please enter a valid 10-digit phone number');
  }
  
  if (!sectorInterest?.trim()) errors.push('Sector interest is required');

  if (!investmentCapacity) errors.push('Investment capacity is required');
  else {
    const amount = parseFloat(investmentCapacity);
    if (isNaN(amount) || amount < 10000) {
      errors.push('Minimum investment capacity is ₹10,000');
    } else if (amount > 10000000000) {
      errors.push('Maximum investment capacity is ₹1000 crores');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  // Clean data
  req.body.phone = phone.toString().replace(/\D/g, '');
  req.body.investmentCapacity = parseFloat(investmentCapacity);
  next();
};

module.exports = { validateEntrepreneur, validateIdea, validateInvestor };
