import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useParticles from './useParticles';


const DataDashboard = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Helper function to format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'Not specified';
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(numAmount);
  };

  // Helper function to format phone numbers
  const formatPhone = (phone) => {
    if (!phone) return 'Not provided';
    const cleanPhone = phone.toString().replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      return `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;
    }
    return phone;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://invest-cy9o.onrender.com/api/summary/all-data');
        
        // Ensure data consistency and type conversion
        const entrepreneursData = (res.data.entrepreneurs || []).map(e => ({
          ...e,
          phone: e.phone?.toString() || '',
        }));

        const ideasData = (res.data.ideas || []).map(idea => ({
          ...idea,
          fundingNeeded: parseFloat(idea.fundingNeeded) || 0,
        }));

        const investorsData = (res.data.investors || []).map(inv => ({
          ...inv,
          investmentCapacity: parseFloat(inv.investmentCapacity) || 0,
          phone: inv.phone?.toString() || '',
        }));

        setEntrepreneurs(entrepreneursData);
        setIdeas(ideasData);
        setInvestors(investorsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    // Load particles.js background
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: "#00d4ff" },
            shape: { type: "circle" },
            opacity: {
              value: 0.6, random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.3, sync: false }
            },
            size: {
              value: 3, random: true,
              anim: { enable: true, speed: 2, size_min: 1, sync: false }
            },
            line_linked: {
              enable: true, distance: 150,
              color: "#00d4ff", opacity: 0.4, width: 1
            },
            move: {
              enable: true, speed: 1,
              direction: "none", random: true, out_mode: "out"
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" }
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 2 }
            }
          },
          retina_detect: true
        });
      }
    };
    document.body.appendChild(script);

    fetchAllData();
  }, []);

  // Filter function
  const filterData = (data, searchFields) => {
    if (!searchTerm) return data;
    return data.filter(item =>
      searchFields.some(field =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  // Statistics calculations
  const stats = {
    totalEntrepreneurs: entrepreneurs.length,
    totalIdeas: ideas.length,
    totalInvestors: investors.length,
    totalFundingRequested: ideas.reduce((sum, idea) => sum + idea.fundingNeeded, 0),
    totalInvestmentCapacity: investors.reduce((sum, inv) => sum + inv.investmentCapacity, 0),
    averageFundingRequest: ideas.length ? ideas.reduce((sum, idea) => sum + idea.fundingNeeded, 0) / ideas.length : 0
  };

  if (loading) {
    return (
      <div>
        <div id="particles-js"></div>
        <div className="container2">
          <div className="form-box">
            <h2>Loading Dashboard...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div id="particles-js"></div>
      <div className="container2" style={{ paddingBottom: '100px', overflowY: 'auto', maxHeight: '100vh' }}>
        
        {/* Header */}
        <div className="form-box">
          <h2>📊 Investment Platform Dashboard</h2>
          <div style={{ marginTop: '20px' }}>
            <input
              type="text"
              placeholder="Search across all data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
              style={{ width: '100%', marginBottom: '20px' }}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="form-box">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {['overview', 'entrepreneurs', 'ideas', 'investors'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`login-btn ${activeTab === tab ? 'active' : ''}`}
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: activeTab === tab ? '#00d4ff' : 'transparent',
                  color: activeTab === tab ? '#000' : '#00d4ff'
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="form-box">
            <h3>📈 Platform Statistics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <div className="input-group">
                <strong>Total Entrepreneurs:</strong> {stats.totalEntrepreneurs}
              </div>
              <div className="input-group">
                <strong>Total Ideas Submitted:</strong> {stats.totalIdeas}
              </div>
              <div className="input-group">
                <strong>Total Investors:</strong> {stats.totalInvestors}
              </div>
              <div className="input-group">
                <strong>Total Funding Requested:</strong> {formatCurrency(stats.totalFundingRequested)}
              </div>
              <div className="input-group">
                <strong>Total Investment Capacity:</strong> {formatCurrency(stats.totalInvestmentCapacity)}
              </div>
              <div className="input-group">
                <strong>Average Funding Request:</strong> {formatCurrency(stats.averageFundingRequest)}
              </div>
            </div>
          </div>
        )}

        {/* Entrepreneurs Tab */}
        {activeTab === 'entrepreneurs' && (
          <div className="form-box">
            <h3>👥 Entrepreneurs ({entrepreneurs.length})</h3>
            {filterData(entrepreneurs, ['name', 'email', 'sector', 'startupStage']).length > 0 ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                {filterData(entrepreneurs, ['name', 'email', 'sector', 'startupStage']).map((e, i) => (
                  <div key={i} className="input-group" style={{ padding: '15px', border: '1px solid #00d4ff', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div><strong>Name:</strong> {e.name}</div>
                      <div><strong>Email:</strong> {e.email}</div>
                      <div><strong>Phone:</strong> {formatPhone(e.phone)}</div>
                      <div><strong>Sector:</strong> {e.sector || 'Not specified'}</div>
                      <div><strong>Stage:</strong> {e.startupStage || 'Not specified'}</div>
                    </div>
                    {e.description && (
                      <div style={{ marginTop: '10px' }}>
                        <strong>Description:</strong> {e.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No entrepreneurs found matching your search.</p>
            )}
          </div>
        )}

        {/* Ideas Tab */}
        {activeTab === 'ideas' && (
          <div className="form-box">
            <h3>💡 Business Ideas ({ideas.length})</h3>
            {filterData(ideas, ['ideaTitle', 'entrepreneurName', 'description']).length > 0 ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                {filterData(ideas, ['ideaTitle', 'entrepreneurName', 'description'])
                  .sort((a, b) => b.fundingNeeded - a.fundingNeeded)
                  .map((idea, i) => (
                  <div key={i} className="input-group" style={{ padding: '15px', border: '1px solid #00d4ff', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div><strong>Title:</strong> {idea.ideaTitle}</div>
                      <div><strong>Entrepreneur:</strong> {idea.entrepreneurName}</div>
                      <div><strong>Email:</strong> {idea.email}</div>
                      <div><strong>Funding Needed:</strong> {formatCurrency(idea.fundingNeeded)}</div>
                    </div>
                    {idea.description && (
                      <div style={{ marginTop: '10px' }}>
                        <strong>Description:</strong> {idea.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No ideas found matching your search.</p>
            )}
          </div>
        )}

        {/* Investors Tab */}
        {activeTab === 'investors' && (
          <div className="form-box">
            <h3>💰 Investors ({investors.length})</h3>
            {filterData(investors, ['name', 'email', 'sectorInterest']).length > 0 ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                {filterData(investors, ['name', 'email', 'sectorInterest'])
                  .sort((a, b) => b.investmentCapacity - a.investmentCapacity)
                  .map((inv, i) => (
                  <div key={i} className="input-group" style={{ padding: '15px', border: '1px solid #00d4ff', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div><strong>Name:</strong> {inv.name}</div>
                      <div><strong>Email:</strong> {inv.email}</div>
                      <div><strong>Phone:</strong> {formatPhone(inv.phone)}</div>
                      <div><strong>Investment Capacity:</strong> {formatCurrency(inv.investmentCapacity)}</div>
                      <div><strong>Sector Interest:</strong> {inv.sectorInterest}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No investors found matching your search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataDashboard;