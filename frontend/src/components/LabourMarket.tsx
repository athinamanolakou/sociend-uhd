import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labourMarketData = {
  1: 'Person not in an economic family',
  2: 'Dual-earner couple, no children or none under 25',
  3: 'Dual-earner couple, youngest child 0 to 17',
  4: 'Dual-earner couple, youngest child 18 to 24',
  5: 'Single-earner couple, male employed, no children or none under 25',
  6: 'Single-earner couple, male employed, youngest child 0 to 17',
  7: 'Single-earner couple, male employed, youngest child 18 to 24',
  8: 'Single-earner couple, female employed, no children or none under 25',
  9: 'Single-earner couple, female employed, youngest child 0 to 17',
  10: 'Single-earner couple, female employed, youngest child 18 to 24',
  11: 'Non-earner couple, no children or none under 25',
  12: 'Non-earner couple, youngest child 0 to 17',
  13: 'Non-earner couple, youngest child 18 to 24',
  14: 'Lone-parent family, parent employed, youngest child 0 to 17',
  15: 'Lone-parent family, parent employed, youngest child 18 to 24',
  16: 'Lone-parent family, parent not employed, youngest child 0 to 17',
  17: 'Lone-parent family, parent not employed, youngest child 18 to 24',
  18: 'Other families'
};

// Generate random numbers for now (Replace with actual data later)
const randomValues = Array.from({ length: 18 }, () => Math.floor(Math.random() * 100));

const data = {
  labels: Object.values(labourMarketData),
  datasets: [
    {
      label: 'Labour Market Distribution',
      data: randomValues,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Labour Market Breakdown' },
  },
  scales: {
    x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } },
    y: { beginAtZero: true },
  },
};

const LabourMarket: React.FC = () => {
  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '30px', textAlign: 'center' }}>
      <h1 style={{ color: '#FFD700', fontSize: '2rem' }}>Labour Market Data</h1>
      <Bar data={data} options={options} />
    </section>
  );
};

export default LabourMarket;
