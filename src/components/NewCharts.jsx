import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#6b21a8', '#7e22ce', '#9333ea', '#a855f7', '#c084fc'];
const BG_DARK = '#1e1b4b';
const TEXT_LIGHT = '#e0e7ff';

const formatCurrency = (val) => `${val.toFixed(2)}B`;

const NewCharts = ({ data }) => {
  const netProfitData = data.filter(d => !isNaN(d.net_profit));
  const revenueData = data.filter(d => !isNaN(d.revenue));

  return (
    <div className="new-charts-wrapper p-6 mt-12 rounded-xl" style={{ background: BG_DARK }}>
      <h2 className="text-center text-xl font-bold mb-6 text-indigo-300">🟪 Net Profit by Company</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={netProfitData}>
          <XAxis dataKey="company" angle={-45} textAnchor="end" tick={{ fill: TEXT_LIGHT, fontSize: 11 }} interval={0} />
          <YAxis tickFormatter={formatCurrency} tick={{ fill: TEXT_LIGHT }} />
          <Tooltip />
          <Bar dataKey="net_profit" fill="#a855f7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="text-center text-xl font-bold mt-12 mb-6 text-indigo-300">🟪 Revenue Share by Company</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={revenueData}
            dataKey="revenue"
            nameKey="company"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {revenueData.map((entry, index) => (
              <Cell key={`rev-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewCharts;
