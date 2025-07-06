import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import '../index.css';
import ProfitRadar3D from './ProfitRadar3D';

const COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
  '#E91E63', '#00BCD4', '#8BC34A', '#CDDC39', '#FFC107', '#795548',
  '#607D8B', '#F44336', '#3F51B5', '#009688', '#673AB7', '#2196F3',
  '#00BFA5', '#E65100', '#827717', '#F50057', '#1B5E20', '#004D40',
  '#BF360C', '#311B92', '#1E88E5', '#43A047', '#FF5722', '#9C27B0'
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div
        className="tooltip-box"
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 10px #8b5cf6',
        }}
      >
        <p style={{ fontWeight: 'bold' }}>{label}</p>
        <p>Profit: ${payload[0].value.toFixed(2)}B</p>
      </div>
    );
  }
  return null;
};

const ProfitChart = ({ data }) => {
  const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);

  const normalizedRadarData = data.map((company) => ({
    company: company.company,
    profit: Number(company.profit) || 0,
    revenue: Number(company.revenue) || 0,
    marketCap: Number(company.marketCap) || 0,
  }));

  return (
    <div className="chart-wrapper animate-fade-in">
      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data}>
          <XAxis
            dataKey="company"
            tick={{ fontSize: 10, fill: '#cbd5e1' }}
            interval={0}
            angle={-45}
            height={150}
            textAnchor="end"
          />
          <YAxis
            tickFormatter={(val) => `${val.toFixed(2)}B`}
            tick={{ fill: '#cbd5e1' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="profit"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Pie Chart */}
      <div style={{ width: '100%', marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <ResponsiveContainer width="90%" height={500}>
          <PieChart>
            <Pie
              data={data}
              dataKey="profit"
              nameKey="company"
              cx="50%"
              cy="50%"
              outerRadius={200}
              labelLine={false}
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend below pie with matching colors */}
      <div style={{ marginTop: '-1rem', padding: '0 2rem' }}>
        <div style={{
          maxHeight: '240px',
          overflowY: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          color: '#fff',
          gap: '6px',
        }}>
          {data.map((entry, index) => (
            <div
              key={`legend-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '12px',
                margin: '4px 12px',
              }}
            >
              <div style={{
                width: 12,
                height: 12,
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: 6,
                borderRadius: 2,
              }} />
              <span style={{ color: COLORS[index % COLORS.length], fontWeight: 500 }}>
                {entry.company}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ textAlign: 'center', color: 'white', marginTop: '1rem' }}>
        <p><strong>Total Profit:</strong> {totalProfit.toFixed(2)}B</p>
        <p><strong>Average Profit:</strong> {(totalProfit / data.length || 0).toFixed(2)}B</p>
        <p><strong>Companies Displayed:</strong> {data.length}</p>
      </div>

      {/* Radar Chart */}
      <div className="chart-wrapper animate-fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <div style={{ width: '90%' }}>
          <h3 style={{ textAlign: 'center', color: '#fff' }}>📡 Company Radar (Profit, Revenue, MarketCap)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart outerRadius={110} data={normalizedRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="company" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fill: '#cbd5e1' }} />
              <Radar name="Profit" dataKey="profit" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.4} />
              <Radar name="Revenue" dataKey="revenue" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.4} />
              <Radar name="Market Cap" dataKey="marketCap" stroke="#facc15" fill="#facc15" fillOpacity={0.4} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3D Radar Chart */}
      {/* 3D Radar Chart */}
<div
  className="fade-zoom-in"
  style={{
    marginTop: '4rem',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '1rem',
    boxShadow: '0 0 30px rgba(168,139,250,0.25)',
  }}
>
  <h2
    style={{
      textAlign: 'center',
      fontSize: '1.6rem',
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: '1.2rem',
    }}
  >
    🧭 3D Radar Chart View <span style={{ fontSize: '1rem', color: '#a78bfa' }}></span>
  </h2>
  <div style={{ height: '800px', width: '100%' }}>
    <ProfitRadar3D data={normalizedRadarData} />
  </div>
</div>

    </div>
  );
};

export default ProfitChart;
