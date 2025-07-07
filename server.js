const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 10000;
const entrepreneurRoutes = require('./api/entrepreneurs/register');
const investorRoutes = require('./api/investors/proposals');
const ideaRoutes = require('./api/ideas/submit');
const authRoutes = require('./api/auth/authRoutes');  
const summaryRoutes = require('./api/routes/summary'); 

dotenv.config();

const app = express();


// ✅ Must be before routes
app.use(express.json());


// ✅ CORS Middleware
app.use(cors({
  origin: [
  'https://invest-jj6cpant7-interactive-resumes-projects.vercel.app/register',
  'https://invest-rose.vercel.app',
  'https://invest-git-main-interactive-resumes-projects.vercel.app/register',
  
],

  credentials: true
}));

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
