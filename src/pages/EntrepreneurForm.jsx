import React, { useState } from 'react';
import axios from 'axios';
import useParticles from './useParticles';

const EntrepreneurForm = () => {
  useParticles(); // Use the custom hook

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startupStage: '',
    sector: '',
    description: ''
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
    
    if (!formData.sector.trim()) newErrors.sector = 'Sector is required';
    
    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Clean phone number - remove any non-digits
      const cleanedData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, '')
      };

      await axios.post('https://invest-cy9o.onrender.com/api/entrepreneurs/register', cleanedData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        startupStage: '',
        sector: '',
        description: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Failed to submit registration. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div id="particles-js"></div>
      <div className="container">
        <div className="form-box">
          <h2>Entrepreneur<br />Register</h2>
          <p>Tell us about your startup</p>

          {submitted ? (
            <div style={{ textAlign: 'center', color: '#00ff88', marginTop: '20px' }}>
              <h3>✅ Registration Successful!</h3>
              <p>Thank you for registering. We'll review your application and get back to you soon.</p>
              <button 
                onClick={() => setSubmitted(false)} 
                className="login-btn"
                style={{ marginTop: '20px' }}
              >
                Register Another
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
                <label>Full Name *</label>
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
                <label>Email *</label>
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
                <label>Phone Number *</label>
                <div className="glow-line"></div>
                {errors.phone && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.phone}</span>}
              </div>

              <div className="input-group">
                <select
                  name="startupStage"
                  className={`input-field ${errors.startupStage ? 'error' : ''}`}
                  value={formData.startupStage}
                  onChange={handleChange}
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: '#fff',
                    border: '1px solid rgba(0, 212, 255, 0.3)'
                  }}
                >
                  <option value="">Select Startup Stage</option>
                  <option value="Idea Stage">Idea Stage</option>
                  <option value="Prototype">Prototype</option>
                  <option value="MVP">MVP</option>
                  <option value="Early Stage">Early Stage</option>
                  <option value="Growth Stage">Growth Stage</option>
                  <option value="Expansion">Expansion</option>
                </select>
                <label>Startup Stage</label>
                <div className="glow-line"></div>
                {errors.startupStage && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.startupStage}</span>}
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="sector"
                  required
                  className={`input-field ${errors.sector ? 'error' : ''}`}
                  value={formData.sector}
                  onChange={handleChange}
                  placeholder="e.g., Technology, Healthcare, Finance"
                />
                <label>Sector *</label>
                <div className="glow-line"></div>
                {errors.sector && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.sector}</span>}
              </div>

              <div className="input-group">
                <textarea
                  name="description"
                  rows="3"
                  className={`input-field ${errors.description ? 'error' : ''}`}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of your startup (optional)"
                  maxLength="1000"
                />
                <label>Brief about your startup</label>
                <div className="glow-line"></div>
                {errors.description && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.description}</span>}
                <small style={{ color: '#888', fontSize: '12px' }}>
                  {formData.description.length}/1000 characters
                </small>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                <span>{loading ? 'REGISTERING...' : 'REGISTER'}</span>
                <div className="btn-glow"></div>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurForm;