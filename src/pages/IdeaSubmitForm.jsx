import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IdeaSubmitForm = () => {
  const [formData, setFormData] = useState({
    entrepreneurName: '',
    ideaTitle: '',
    description: '',
    fundingNeeded: '',
    email: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post('http://invest-cy9o.onrender.com/api/ideas/submit', formData);


      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#00d4ff" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 }
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false }
            },
            size: {
              value: 5,
              random: true,
              anim: { enable: true, speed: 2, size_min: 1, sync: false }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#00d4ff",
              opacity: 0.6,
              width: 1.5
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true
            },
            modes: {
              grab: { distance: 400, line_linked: { opacity: 1 } },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 }
            }
          },
          retina_detect: true
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="particles-js"></div>
      <div className="container">
        <div className="form-box">
          <h2>Submit Your<br />Business Idea</h2>
          <p>Share your vision with us</p>

          {submitted ? (
            <p className="text-green-400 text-center">Your idea has been submitted successfully!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="entrepreneurName"
                  required
                  className="input-field"
                  value={formData.entrepreneurName}
                  onChange={handleChange}
                />
                <label>Your Name</label>
                <div className="glow-line"></div>
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="ideaTitle"
                  required
                  className="input-field"
                  value={formData.ideaTitle}
                  onChange={handleChange}
                />
                <label>Idea Title</label>
                <div className="glow-line"></div>
              </div>

              <div className="input-group">
                <textarea
                  name="description"
                  rows="3"
                  required
                  className="input-field"
                  value={formData.description}
                  onChange={handleChange}
                />
                <label>Brief Description</label>
                <div className="glow-line"></div>
              </div>

              <div className="input-group">
                <input
                  type="number"
                  name="fundingNeeded"
                  required
                  className="input-field"
                  value={formData.fundingNeeded}
                  onChange={handleChange}
                />
                <label>Funding Needed (INR)</label>
                <div className="glow-line"></div>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  required
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>Your Email</label>
                <div className="glow-line"></div>
              </div>

              <button type="submit" className="login-btn">
                <span>SUBMIT IDEA</span>
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
