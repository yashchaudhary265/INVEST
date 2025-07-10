import React, { useState } from 'react';
import axios from 'axios';
import useParticles from './useParticles';

const IdeaSubmitForm = () => {
  useParticles();

  const [formData, setFormData] = useState({
    entrepreneurName: '',
    ideaTitle: '',
    description: '',
    fundingNeeded: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.entrepreneurName.trim()) newErrors.entrepreneurName = 'Name is required';
    if (!formData.ideaTitle.trim()) newErrors.ideaTitle = 'Idea title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length > 2000) {
      newErrors.description = 'Description cannot exceed 2000 characters';
    }
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.fundingNeeded) newErrors.fundingNeeded = 'Funding amount is required';
    else {
      const amount = parseFloat(formData.fundingNeeded);
      if (isNaN(amount) || amount < 1000) {
        newErrors.fundingNeeded = 'Minimum funding amount is ₹1,000';
      } else if (amount > 1000000000) {
        newErrors.fundingNeeded = 'Maximum funding amount is ₹100 crores';
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
        fundingNeeded: parseFloat(formData.fundingNeeded)
      };

      await axios.post('https://invest-cy9o.onrender.com/api/ideas/submit', submissionData);
      setSubmitted(true);
      setFormData({
        entrepreneurName: '',
        ideaTitle: '',
        description: '',
        fundingNeeded: '',
        email: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Failed to submit idea. Please try again.' });
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
          <h2>Submit Your<br />Business Idea</h2>
          <p>Share your vision with us</p>

          {submitted ? (
            <div style={{ textAlign: 'center', color: '#00ff88', marginTop: '20px' }}>
              <h3>✅ Idea Submitted Successfully!</h3>
              <p>Thank you for sharing your business idea. We'll review it and connect you with potential investors.</p>
              <button 
                onClick={() => setSubmitted(false)} 
                className="login-btn"
                style={{ marginTop: '20px' }}
              >
                <span>Submit Another Idea</span>
                <div className="btn-glow"></div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errors.submit && (
                <div style={{ color: '#ff4444', textAlign: 'center', marginBottom: '20px' }}>
                  {errors.submit}
                </div>
              )}

              <div className={`input-group ${formData.entrepreneurName ? 'filled' : ''}`}>
                <input
                  type="text"
                  name="entrepreneurName"
                  required
                  className={`input-field ${errors.entrepreneurName ? 'error' : ''}`}
                  value={formData.entrepreneurName}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label>Your Name *</label>
                <div className="glow-line"></div>
                {errors.entrepreneurName && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.entrepreneurName}</span>}
              </div>

              <div className={`input-group ${formData.ideaTitle ? 'filled' : ''}`}>
                <input
                  type="text"
                  name="ideaTitle"
                  required
                  className={`input-field ${errors.ideaTitle ? 'error' : ''}`}
                  value={formData.ideaTitle}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label>Idea Title *</label>
                <div className="glow-line"></div>
                {errors.ideaTitle && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.ideaTitle}</span>}
              </div>

              <div className={`input-group ${formData.description ? 'filled' : ''}`}>
                <textarea
                  name="description"
                  rows="4"
                  required
                  className={`input-field ${errors.description ? 'error' : ''}`}
                  value={formData.description}
                  onChange={handleChange}
                  maxLength="2000"
                  placeholder=" "
                />
                <label>Detailed Description *</label>
                <div className="glow-line"></div>
                {errors.description && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.description}</span>}
                <small style={{ color: '#888', fontSize: '12px' }}>
                  {formData.description.length}/2000 characters
                </small>
              </div>

              <div className={`input-group ${formData.fundingNeeded ? 'filled' : ''}`}>
                <input
                  type="number"
                  name="fundingNeeded"
                  required
                  className={`input-field ${errors.fundingNeeded ? 'error' : ''}`}
                  value={formData.fundingNeeded}
                  onChange={handleChange}
                  min="1000"
                  max="1000000000"
                  placeholder=" "
                />
                <label>Funding Needed (₹) *</label>
                <div className="glow-line"></div>
                {errors.fundingNeeded && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.fundingNeeded}</span>}
                {formData.fundingNeeded && (
                  <small style={{ color: '#00d4ff', fontSize: '12px' }}>
                    ₹{formatCurrency(formData.fundingNeeded)}
                  </small>
                )}
              </div>

              <div className={`input-group ${formData.email ? 'filled' : ''}`}>
                <input
                  type="email"
                  name="email"
                  required
                  className={`input-field ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label>Your Email *</label>
                <div className="glow-line"></div>
                {errors.email && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.email}</span>}
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                <span>{loading ? 'SUBMITTING...' : 'SUBMIT IDEA'}</span>
                <div className="btn-glow"></div>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaSubmitForm;
