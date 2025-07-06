// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/DataDashboard';
import IdeaSubmitForm from './pages/IdeaSubmitForm';
import EntrepreneurForm from './pages/EntrepreneurForm';
import InvestorForm from './pages/InvestorForm';
import ProfitChart from './components/ProfitChart';
import CompanySelector from './components/CompanySelector';
import Papa from 'papaparse';

// ✅ NEW: Import for MongoDB Dashboard page
import DataDashboard from './pages/DataDashboard'; // <-- make sure your MongoDB-based dashboard file is named like this

const App = () => {
  const [companyData, setCompanyData] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetch('/data/top1kstockscsv.csv')
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText.trim(), {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) => header.trim(),
          transform: (val) => val.trim()
        });

        const result = parsed.data
          .filter(row => row.name && !isNaN(parseFloat(row.profit_TTM)))
          .map(row => ({
            company: row.name,
            profit: parseFloat(row.profit_TTM)
          }));

        setCompanyData(result);
      })
      .catch(err => console.error("CSV parse error:", err));
  }, []);

  const filteredData = companyData.filter((d) => selectedCompanies.includes(d.company));
  const toggleMenu = () => setShowMenu(prev => !prev);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <div>
            <div id="particles-js"></div>
            <div className="container2">
              <div className="form-box" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                <h2 className="main-title">📊 Company Profit Dashboard</h2>
                <div className="feature-box">
                  <button onClick={toggleMenu} className="login-btn">
                    <span>Open Features</span>
                    <div className="btn-glow"></div>
                  </button>
                </div>

                {showMenu && (
                  <div className="form-box" style={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '20px' }}>
                    <div className="feature-links flex flex-col gap-3">
                      <Link to="/entrepreneur" className="text-blue-300 underline">Entrepreneur Form</Link>
                      <Link to="/submit-idea" className="text-blue-300 underline">Submit Idea</Link>
                      <Link to="/investor" className="text-blue-300 underline">Investor Form</Link>
                      <Link to="/data-dashboard" className="text-green-400 underline">View All Submissions</Link> {/* ✅ New Button */}
                    </div>
                  </div>
                )}

                <p className="sub-title">Select up to 50 companies to view TTM profits:</p>
                <CompanySelector
                  options={companyData.map((c) => c.company)}
                  onChange={setSelectedCompanies}
                  maxSelection={50}
                />
                <ProfitChart data={filteredData} />
              </div>
            </div>
          </div>
        } />

        <Route path="/entrepreneur" element={<EntrepreneurForm />} />
        <Route path="/submit-idea" element={<IdeaSubmitForm />} />
        <Route path="/investor" element={<InvestorForm />} />

        {/* ✅ New MongoDB data viewer route */}
        <Route path="/data-dashboard" element={<DataDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
