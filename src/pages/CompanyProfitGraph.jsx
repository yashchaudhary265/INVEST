import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ProfitChart from '../components/ProfitChart';
import CompanySelector from '../components/CompanySelector';
import NewCharts from '../components/NewCharts';
import '../index.css'; // retains your base styles

const CompanyProfitGraph = () => {
  const [companyData, setCompanyData] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

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
            profit: parseFloat(row.profit_TTM),
            net_profit: parseFloat(row.net_profit_TTM || 0),
            revenue: parseFloat(row.revenue_TTM || 0),
          }));

        setCompanyData(result);
      })
      .catch(err => console.error("❌ CSV Parse Error:", err));
  }, []);

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

  const filteredData = companyData.filter((d) =>
    selectedCompanies.includes(d.company)
  );

  return (
    <div>
      <div id="particles-js"></div>
      <div className="container">
        <div className="form-box" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
          <h2 className="main-title">📊 Company Profit Dashboard</h2>
          <p className="sub-title">Select up to 50 companies to visualize their total TTM profit</p>

          <CompanySelector
            options={companyData.map((c) => c.company)}
            onChange={setSelectedCompanies}
          />

          {selectedCompanies.length > 0 ? (
            <>
              <ProfitChart data={filteredData} />
              <NewCharts data={filteredData} />
            </>
          ) : (
            <p className="no-selection">No companies selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfitGraph;
