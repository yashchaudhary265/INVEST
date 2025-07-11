# 🚀 INVEST - Investment Platform

[![Deploy Status](https://img.shields.io/badge/deploy-live-brightgreen)](https://invest-rose.vercel.app)
[![Backend Status](https://img.shields.io/badge/backend-live-brightgreen)](https://invest-cy9o.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.0.0-blue)](https://reactjs.org/)

> A modern investment platform connecting entrepreneurs with investors, featuring real-time data visualization, comprehensive form validation, and a sleek cyberpunk-inspired UI.

## ✨ Features

### 🎯 Core Functionality
- **Entrepreneur Registration** - Submit startup profiles with detailed information
- **Investor Profiles** - Register investment preferences and capacity
- **Business Idea Submission** - Share innovative ideas with funding requirements
- **Data Dashboard** - Comprehensive overview of all platform activity
- **Real-time Analytics** - Live statistics and insights

### 🎨 UI/UX Features
- **Cyberpunk Design** - Modern dark theme with neon accents
- **Particles.js Animation** - Interactive background effects
- **Responsive Design** - Optimized for all device sizes
- **Form Validation** - Real-time validation with error handling
- **Loading States** - Smooth loading animations and feedback

### 📊 Dashboard Features
- **Tabbed Interface** - Overview, Entrepreneurs, Ideas, Investors
- **Global Search** - Search across all data types
- **Currency Formatting** - Proper INR formatting with commas
- **Phone Formatting** - Standardized phone number display
- **Data Sorting** - Sort by funding amount, investment capacity
- **Statistics Overview** - Key metrics and totals

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Axios** - HTTP client for API calls
- **Particles.js** - Interactive background animations
- **CSS3** - Custom styling with animations
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashchaudhary265/INVEST.git
   cd INVEST
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   # Start backend
   npm run server
   
   # Start frontend (in new terminal)
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
INVEST/
├── api/                          # Backend API
│   ├── auth/                     # Authentication routes
│   ├── config/                   # Database configuration
│   ├── controllers/              # Business logic
│   ├── entrepreneurs/            # Entrepreneur endpoints
│   ├── ideas/                    # Business idea endpoints
│   ├── investors/                # Investor endpoints
│   ├── middleware/               # Custom middleware
│   ├── models/                   # MongoDB schemas
│   │   ├── Entrepreneur.js
│   │   ├── idea.js
│   │   ├── investor.js
│   │   └── User.js
│   └── routes/                   # Route definitions
├── public/                       # Static assets
├── src/                          # Frontend source
│   ├── assets/                   # Images and static files
│   ├── components/               # Reusable components
│   ├── data/                     # Mock data
│   ├── pages/                    # Page components
│   │   ├── CompanyProfitGra...   # Analytics pages
│   │   ├── DataDashboard.jsx     # Main dashboard
│   │   ├── EntrepreneurForm.jsx  # Entrepreneur registration
│   │   ├── IdeaSubmitForm.jsx    # Idea submission
│   │   ├── InvestorForm.jsx      # Investor registration
│   │   ├── login.jsx             # Login page
│   │   ├── Register.jsx          # User registration
│   │   └── useParticles.js       # Particles hook
│   ├── App.js                    # Main app component
│   ├── index.css                 # Global styles
│   └── index.js                  # React entry point
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
├── server.js                     # Express server
└── vercel.json                   # Vercel config
```

## 🔧 API Endpoints

### Base URL: `https://invest-cy9o.onrender.com/api`

#### Entrepreneurs
- `POST /entrepreneurs/register` - Register new entrepreneur
- `GET /entrepreneurs` - Get all entrepreneurs

#### Ideas
- `POST /ideas/submit` - Submit business idea
- `GET /ideas` - Get all ideas

#### Investors
- `POST /investors/proposals` - Submit investor profile
- `GET /investors` - Get all investors

#### Summary
- `GET /summary/all-data` - Get dashboard data
- `GET /summary/stats` - Get platform statistics
- `GET /summary/test` - API health check

## 📊 Data Models

### Entrepreneur Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required, 10 digits),
  startupStage: Enum ['Idea Stage', 'Prototype', 'MVP', 'Early Stage', 'Growth Stage', 'Expansion'],
  sector: String (required),
  description: String (max 1000 chars),
  timestamps: true
}
```

### Idea Schema
```javascript
{
  entrepreneurName: String (required),
  ideaTitle: String (required),
  description: String (required, max 2000 chars),
  fundingNeeded: Number (min: 1000, max: 1,000,000,000),
  email: String (required),
  status: Enum ['Submitted', 'Under Review', 'Approved', 'Rejected'],
  timestamps: true
}
```

### Investor Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required, 10 digits),
  investmentCapacity: Number (min: 10000, max: 10,000,000,000),
  sectorInterest: String (required),
  investmentType: Enum ['Angel', 'Seed', 'Series A', 'Series B', 'Growth', 'Any'],
  riskTolerance: Enum ['Low', 'Medium', 'High'],
  timestamps: true
}
```

## 🎨 Design System

### Color Palette
- **Primary Cyan**: `#00d4ff` - Headers, borders, focus states
- **Secondary Green**: `#00ff88` - Success states, currency, highlights
- **Background**: `#000000` - Dark theme base
- **Text**: `#ffffff` - Primary text color
- **Error**: `#ff4444` - Error states and validation
- **Muted**: `#888888` - Secondary text and placeholders

### Typography
- **Primary Font**: 'Poppins', sans-serif
- **Heading Font**: 'Cinzel', serif (for titles)
- **Code Font**: 'Orbitron', sans-serif (for special elements)

### Animations
- **Form Entrance**: 3D rotation and fade-in
- **Button Hover**: Glow effects and scaling
- **Particles**: Interactive background animation
- **Loading States**: Smooth transitions

## 🔍 Features Breakdown

### Form Validation
- **Real-time validation** with instant feedback
- **Email validation** with regex patterns
- **Phone number formatting** (10-digit Indian numbers)
- **Currency input validation** with min/max limits
- **Character counters** for text areas
- **Error highlighting** with visual indicators

### Dashboard Analytics
- **Platform Statistics** - Total counts and amounts
- **Data Filtering** - Search across all entities
- **Currency Formatting** - Proper INR display with commas
- **Responsive Tables** - Mobile-optimized data display
- **Export Ready** - Structured data for future export features

### Performance Optimizations
- **Lazy Loading** - Components loaded on demand
- **Memoization** - Optimized re-renders
- **Efficient API Calls** - Single endpoint for dashboard data
- **Image Optimization** - Compressed assets
- **Code Splitting** - Reduced bundle sizes

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Configure build settings:
   ```
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Backend (Render)
1. Connect GitHub repository to Render
2. Configure service:
   ```
   Build Command: npm install
   Start Command: node server.js
   ```
3. Set environment variables in Render dashboard
4. Auto-deploy on push to main branch

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation if needed

## 📈 Future Roadmap

### Phase 2 Features
- [ ] **User Authentication** - Complete login/register system
- [ ] **Investment Matching** - Algorithm to match investors with ideas
- [ ] **Messaging System** - In-app communication
- [ ] **File Uploads** - Document and image support
- [ ] **Advanced Analytics** - Charts and graphs

### Phase 3 Features
- [ ] **Video Calls** - Integrated meeting system
- [ ] **Payment Integration** - Secure transaction handling
- [ ] **Mobile App** - React Native version
- [ ] **AI Recommendations** - ML-powered matching
- [ ] **Multi-language Support** - i18n implementation

## 🐛 Known Issues

- [ ] File upload feature pending implementation
- [ ] Email notifications not yet configured
- [ ] Advanced search filters in development
- [ ] Export functionality planned for next release

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Yash Chaudhary** - Full Stack Developer - [@yashchaudhary265](https://github.com/yashchaudhary265)

## 📞 Support

For support, email [your-email@example.com](mailto:your-email@example.com) or create an issue on GitHub.

## 🙏 Acknowledgments

- **Particles.js** - For amazing background animations
- **MongoDB** - For reliable database solutions
- **Vercel & Render** - For seamless deployment
- **React Community** - For excellent documentation and support

---

<div align="center">
  <strong>Built with ❤️ for the entrepreneurial community</strong>
  <br>
  <br>
  <a href="https://invest-rose.vercel.app">Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-endpoints">API</a>
</div>

---

**⭐ Star this repository if you found it helpful!**
