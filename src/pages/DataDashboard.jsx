import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDashboard = () => {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
  try {
    const res = await axios.get('https://invest-cy9o.onrender.com/api/summary/all-data');
    setEntrepreneurs(res.data.entrepreneurs || []);
    setIdeas(res.data.ideas || []);
    setInvestors(res.data.investors || []);
  } catch (err) {
    console.error('Error fetching data:', err);
    if (err.response) {
      console.error('Response:', err.response.data);
    } else if (err.request) {
      console.error('Request Error:', err.request);
    } else {
      console.error('Message:', err.message);
    }
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
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#00d4ff" },
            shape: { type: "circle" },
            opacity: {
              value: 0.8, random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false }
            },
            size: {
              value: 5, random: true,
              anim: { enable: true, speed: 2, size_min: 1, sync: false }
            },
            line_linked: {
              enable: true, distance: 150,
              color: "#00d4ff", opacity: 0.6, width: 1.5
            },
            move: {
              enable: true, speed: 2,
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
              push: { particles_nb: 4 }
            }
          },
          retina_detect: true
        });
      }
    };
    document.body.appendChild(script);

    fetchAllData();
  }, []);

  return (
    <div>
      <div id="particles-js"></div>
      <div className="container2">
        <div className="form-box">
          <h2>📋 All Submissions Dashboard</h2>
        </div>

        <div className="form-box">
          <h3>Entrepreneurs</h3>
          {entrepreneurs.length > 0 ? (
            entrepreneurs.map((e, i) => (
              <div key={i} className="input-group">
                <p><strong>{e.name}</strong> – {e.email} – {e.sector}</p>
              </div>
            ))
          ) : (
            <p>No entrepreneur data found.</p>
          )}
        </div>

        <div className="form-box">
          <h3>Ideas</h3>
          {ideas.length > 0 ? (
            ideas.map((i, idx) => (
              <div key={idx} className="input-group">
                <p><strong>{i.ideaTitle}</strong> by {i.entrepreneurName} — ₹{i.fundingNeeded}</p>
              </div>
            ))
          ) : (
            <p>No ideas data found.</p>
          )}
        </div>

        <div className="form-box">
          <h3>Investors</h3>
          {investors.length > 0 ? (
            investors.map((inv, i) => (
              <div key={i} className="input-group">
                <p><strong>{inv.name}</strong> – {inv.email} – Capacity: ₹{inv.investmentCapacity}</p>
              </div>
            ))
          ) : (
            <p>No investors data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataDashboard;
