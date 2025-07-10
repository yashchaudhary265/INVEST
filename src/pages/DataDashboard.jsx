import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useParticles from './useParticles';

const DataDashboard = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  useParticles({
    particles: {
      number: { value: 50 },
      color: { value: "#00d4ff" },
      opacity: { value: 0.4 }
    }
  });

  // Helper function to format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'Not specified';
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) return 'Invalid amount';
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
        setError('');
        
        console.log('🔄 Fetching data from API...');
        
        // Try the main endpoint
        const res = await axios.get('https://invest-cy9o.onrender.com/api/summary/all-data', {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('📥 API Response:', res.data);
        
        if (res.data.success) {
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
          
          console.log('✅ Data loaded successfully:', {
            entrepreneurs: entrepreneursData.length,
            ideas: ideasData.length,
            investors: investorsData.length
          });
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        console.error('❌ Error fetching data:', err);
        setError(`Failed to load data: ${err.message}`);
        
        // Try alternative endpoint or show cached data
        try {
          const testRes = await axios.get('https://invest-cy9o.onrender.com/api/summary/test');
          console.log('📊 Test endpoint response:', testRes.data);
        } catch (testErr) {
          console.error('❌ Test endpoint also failed:', testErr);
        }
      } finally {
        setLoading(false);
      }
    };

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
    totalFundingRequested: ideas.reduce((sum, idea) => sum + (idea.fundingNeeded || 0), 0),
    totalInvestmentCapacity: investors.reduce((sum, inv) => sum + (inv.investmentCapacity || 0), 0),
    averageFundingRequest: ideas.length ? ideas.reduce((sum, idea) => sum + (idea.fundingNeeded || 0), 0) / ideas.length : 0
  };

  if (loading) {
    return (
      <div>
        <div id="particles-js"></div>
        <div className="container2">
          <div className="form-box">
            <h2>🔄 Loading Dashboard...</h2>
            <p>Fetching the latest data from our servers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div id="particles-js"></div>
        <div className="container2">
          <div className="form-box">
            <h2>❌ Error Loading Data</h2>
            <p style={{ color: '#ff4444' }}>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="login-btn"
              style={{ marginTop: '20px' }}
            >
              Retry
            </button>
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
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {['overview', 'entrepreneurs', 'ideas', 'investors'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="login-btn"
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: activeTab === tab ? '#00d4ff' : 'transparent',
                  color: activeTab === tab ? '#000' : '#00d4ff',
                  border: `1px solid ${activeTab === tab ? '#00d4ff' : 'rgba(0, 212, 255, 0.5)'}`
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
              <div className="input-group" style={{ textAlign: 'center', padding: '20px', border: '1px solid #00d4ff', borderRadius: '10px' }}>
                <div style={{ fontSize: '2em', color: '#00ff88' }}>{stats.totalEntrepreneurs}</div>
                <div><strong>Total Entrepreneurs</strong></div>
              </div>
              <div className="input-group" style={{ textAlign: 'center', padding: '20px', border: '1px solid #00d4ff', borderRadius: '10px' }}>
                <div style={{ fontSize: '2em', color: '#00ff88' }}>{stats.totalIdeas}</div>
                <div><strong>Business Ideas</strong></div>
              </div>
              <div className="input-group" style={{ textAlign: 'center', padding: '20px', border: '1px solid #00d4ff', borderRadius: '10px' }}>
                <div style={{ fontSize: '2em', color: '#00ff88' }}>{stats.totalInvestors}</div>
                <div><strong>Active Investors</strong></div>
              </div>
              <div className="input-group" style={{ textAlign: 'center', padding: '20px', border: '1px solid #00d4ff', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.5em', color: '#00ff88' }}>{formatCurrency(stats.totalFundingRequested)}</div>
                <div><strong>Total Funding Requested</strong></div>
              </div>
              <div className="input-group" style={{ textAlign: 'center', padding: '20px', border: '1px solid #00d4ff', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.5em', color: '#00ff88' }}>{formatCurrency(stats.totalInvestmentCapacity)}</div>
                <div><strong>Total Investment Capacity</strong></div>
              </div>
              <div className="input-group" style={{ textAlign: 'center', padding: '20px', border: '1px solid #00d4ff', borderRadius: '10px' }}>
                <div style={{ fontSize: '1.5em', color: '#00ff88' }}>{formatCurrency(stats.averageFundingRequest)}</div>
                <div><strong>Average Funding Request</strong></div>
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
                  .sort((a, b) => (b.fundingNeeded || 0) - (a.fundingNeeded || 0))
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
                  .sort((a, b) => (b.investmentCapacity || 0) - (a.investmentCapacity || 0))
                  .map((inv, i) => (
                  <div key={i} className="input-group" style={{ padding: '15px', border: '1px solid #00d4ff', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div><strong>Name:</strong> {inv.name}</div>
                      <div><strong>Email:</strong> {inv.email}</div>
                      <div><strong>Phone:</strong> {formatPhone(inv.phone)}</div>
                      <div><strong>Investment Capacity:</strong> {formatCurrency(inv.investmentCapacity)}</div>
                      <div><strong>Sector Interest:</strong> {inv.sectorInterest}</div>
                      {inv.investmentType && <div><strong>Investment Type:</strong> {inv.investmentType}</div>}
                      {inv.riskTolerance && <div><strong>Risk Tolerance:</strong> {inv.riskTolerance}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No investors found matching your search.</p>
            )}
          </div>
        )}

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="form-box" style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
            <h4>🔧 Debug Info</h4>
            <p>Entrepreneurs: {entrepreneurs.length} | Ideas: {ideas.length} | Investors: {investors.length}</p>
            <p>Search Term: "{searchTerm}"</p>
            <p>Active Tab: {activeTab}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataDashboard;