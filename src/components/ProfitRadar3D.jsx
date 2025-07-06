import React, { useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import ReactEChartsCore from 'echarts-for-react/lib/core';

const ProfitRadar3D = ({ data }) => {
  const chartRef = useRef();

  const validData = (data || []).filter(
    (d) =>
      d &&
      !isNaN(Number(d.profit)) &&
      !isNaN(Number(d.revenue)) &&
      !isNaN(Number(d.marketCap))
  );

  if (!validData.length) return null;

  const option = {
    tooltip: {
      formatter: (params) =>
        `${params.value[0]}<br/>${params.value[1]}: ${params.value[2].toFixed(2)}`
    },
    visualMap: {
      max: 1000,
      inRange: {
        color: ['#3b82f6', '#a78bfa', '#facc15']
      },
    },
    xAxis3D: {
      type: 'category',
      name: 'Company',
      data: validData.map((d) => d.company),
      axisLabel: { interval: 0, rotate: 30 },
    },
    yAxis3D: {
      type: 'category',
      data: ['Profit', 'Revenue', 'Market Cap'],
    },
    zAxis3D: {
      type: 'value',
      name: 'Amount (in B)',
    },
    grid3D: {
      boxWidth: 300,
      boxDepth: 100,
      boxHeight: 300,
      viewControl: {
        autoRotate: true,
        distance: 300,
        alpha: 25,
        beta: 40,
        minDistance: 150,
        maxDistance: 500,
        animation: true,
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true,
        },
        ambient: {
          intensity: 0.3,
        },
      },
    },
    series: [
      {
        type: 'bar3D',
        shading: 'lambert',
        barSize: 6,
        data: validData.flatMap((d) => [
          { value: [d.company, 'Profit', Number(d.profit)] },
          { value: [d.company, 'Revenue', Number(d.revenue)] },
          { value: [d.company, 'Market Cap', Number(d.marketCap)] },
        ]),
        label: {
          show: false,
        },
      },
    ],
  };

  return (
    <div style={{ height: 700, width: '100%', marginTop: '2rem' }}>
      <h3 style={{ textAlign: 'center', color: '#fff', marginBottom: '1rem' }}>
        
      </h3>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        ref={chartRef}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default ProfitRadar3D;
