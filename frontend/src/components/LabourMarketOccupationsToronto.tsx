import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Mock data for Toronto occupations
const occupationData = {
  1: 'Legislative and senior management',
  2: 'Specialized middle management',
  3: 'Retail and customer service management',
  4: 'Trades, transport, production management',
  5: 'Professional occupations in finance',
  6: 'Professional occupations in business',
  7: 'Administrative and financial supervisors',
  8: 'Administrative and logistics occupations',
  9: 'Administrative support and supply chain',
  10: 'Professional occupations in sciences',
  11: 'Applied sciences professionals',
  12: 'Engineering professionals',
  13: 'Technical occupations in applied sciences',
  14: 'Health treating and consultation services',
  15: 'Therapy and assessment professionals',
  16: 'Nursing and allied health professionals',
  17: 'Technical occupations in health',
  18: 'Assisting occupations in health services',
  19: 'Professional occupations in law',
  20: 'Professional occupations in education',
  21: 'Community and social services',
  22: 'Government services professionals',
  23: 'Public protection services',
  24: 'Paraprofessional occupations',
  25: 'Legal and public protection assistants',
  26: 'Care providers and public protection',
  27: 'Professional occupations in art & culture',
  28: 'Technical occupations in art & sport',
  29: 'Occupations in art, culture, and sport',
  30: 'Support occupations in art & sport'
};

// Mock random data for Toronto
const randomValues = Array.from({length: Object.keys(occupationData).length}, () => Math.floor(Math.random() * 100));

const data = {
  labels: Object.values(occupationData),
  datasets: [
    {
      label: 'Toronto - Occupation Distribution',
      data: randomValues,
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {position: 'top' as const},
    title: {display: true, text: 'Occupation Breakdown - Toronto'},
  },
  scales: {
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 30,
        minRotation: 30,
        font: {
          size: 12,
        },
      },
    },
    y: {beginAtZero: true},
  },
};

const LabourMarketToronto: React.FC = () => {
  return (
    <section style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      color: '#f4f4f4',
      backgroundColor: '#1c1c1c',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#FFD700',
      }}>
        Occupation Breakdown - Toronto
      </h1>

      <div style={{backgroundColor: '#2c2c2c', padding: '20px', borderRadius: '8px'}}>
        <div style={{width: '100%', height: '600px', paddingBottom: '50px'}}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default LabourMarketToronto;
