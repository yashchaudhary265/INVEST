const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const entrepreneurRoutes = require('./api/entrepreneurs/register');
const investorRoutes = require('./api/investors/proposals');
const ideaRoutes = require('./api/ideas/submit');
const authRoutes = require('./api/auth/authRoutes');  
const summaryRoutes = require('./api/routes/summary'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/entrepreneurs', entrepreneurRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/summary', summaryRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
