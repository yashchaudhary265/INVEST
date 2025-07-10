import React, { useState } from 'react';
import axios from 'axios';
import useParticles from './useParticles';

const InvestorForm = () => {
  useParticles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investmentCapacity: '',
    sectorInterest: '',
    investmentType: '',
    riskTolerance: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.sectorInterest.trim()) newErrors.sectorInterest = 'Sector interest is required';
    
    if (!formData.investmentCapacity) newErrors.investmentCapacity = 'Investment capacity is required';
    else {
      const amount = parseFloat(formData.investmentCapacity);
      if (isNaN(amount) || amount < 10000) {
        newErrors.investmentCapacity = 'Minimum investment capacity is ₹10,000';
      } else if (amount > 10000000000) {
        newErrors.investmentCapacity = 'Maximum investment capacity is ₹1000 crores';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ''),
        investmentCapacity: parseFloat(formData.investmentCapacity)
      };

      await axios.post('https://invest-cy9o.onrender.com/api/investors/proposals', submissionData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        investmentCapacity: '',
        sectorInterest: '',
        investmentType: '',
        riskTolerance: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Failed to submit investor profile. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    const number = parseFloat(value);
    if (isNaN(number)) return value;
    return new Intl.NumberFormat('en-IN').format(number);
  };

  return (
    <div>
      <div id="particles-js"></div>
      <div className="container">
        <div className="form-box">
          <h2>Submit Your<br />Investor Profile</h2>
          <p>Share your investment interests</p>

          {submitted ? (
            <div style={{ textAlign: 'center', color: '#00ff88', marginTop: '20px' }}>
              <h3>✅ Investor Profile Submitted!</h3>
              <p>Thank you for joining our investor network. We'll match you with relevant investment opportunities.</p>
              <button 
                onClick={() => setSubmitted(false)} 
                className="login-btn"
                style={{ marginTop: '20px' }}
              >
                Update Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errors.submit && (
                <div style={{ color: '#ff4444', textAlign: 'center', marginBottom: '20px' }}>
                  {errors.submit}
                </div>
              )}

              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  required
                  className={`input-field ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                <label>Your Name *</label>
                <div className="glow-line"></div>
                {errors.name && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.name}</span>}
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  required
                  className={`input-field ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>Your Email *</label>
                <div className="glow-line"></div>
                {errors.email && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.email}</span>}
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  required
                  className={`input-field ${errors.phone ? 'error' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                />
                <label>Phone *</label>
                <div className="glow-line"></div>
                {errors.phone && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.phone}</span>}
              </div>

              <div className="input-group">
                <input
                  type="number"
                  name="investmentCapacity"
                  required
                  className={`input-field ${errors.investmentCapacity ? 'error' : ''}`}
                  value={formData.investmentCapacity}
                  onChange={handleChange}
                  min="10000"
                  max="10000000000"
                  placeholder="Enter amount in INR"
                />
                <label>Investment Capacity (₹) *</label>
                <div className="glow-line"></div>
                {errors.investmentCapacity && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.investmentCapacity}</span>}
                {formData.investmentCapacity && (
                  <small style={{ color: '#00d4ff', fontSize: '12px' }}>
                    ₹{formatCurrency(formData.investmentCapacity)}
                  </small>
                )}
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="sectorInterest"
                  required
                  className={`input-field ${errors.sectorInterest ? 'error' : ''}`}
                  value={formData.sectorInterest}
                  onChange={handleChange}
                  placeholder="e.g., Technology, Healthcare, Finance"
                />
                <label>Sector of Interest *</label>
                <div className="glow-line"></div>
                {errors.sectorInterest && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.sectorInterest}</span>}
              </div>

              <div className="input-group">
                <select
                  name="investmentType"
                  className="input-field"
                  value={formData.investmentType}
                  onChange={handleChange}
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: '#fff',
                    border: '1px solid rgba(0, 212, 255, 0.3)'
                  }}
                >
                  <option value="">Select Investment Type</option>
                  <option value="Angel">Angel Investment</option>
                  <option value="Seed">Seed Funding</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                  <option value="Growth">Growth Stage</option>
                  <option value="Any">Any Stage</option>
                </select>
                <label>Preferred Investment Type</label>
                <div className="glow-line"></div>
              </div>

              <div className="input-group">
                <select
                  name="riskTolerance"
                  className="input-field"
                  value={formData.riskTolerance}
                  onChange={handleChange}
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: '#fff',
                    border: '1px solid rgba(0, 212, 255, 0.3)'
                  }}
                >
                  <option value="">Select Risk Tolerance</option>
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>
                <label>Risk Tolerance</label>
                <div className="glow-line"></div>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                <span>{loading ? 'SUBMITTING...' : 'SUBMIT'}</span>
                <div className="btn-glow"></div>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorForm;