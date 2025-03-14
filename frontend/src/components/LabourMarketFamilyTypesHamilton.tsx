import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

// Mock family type data for Hamilton
const familyTypeData: Record<number, string> = {
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
  18: 'Other families',
};

// Secure random number generator function
const getSecureRandomNumber = (max: number) => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max; // Ensures the number is within the expected range
};

// Generate secure random values for each family type
const randomValues = Object.keys(familyTypeData).map(() => getSecureRandomNumber(100));

// Generate a rainbow color scheme
const generateRainbowColors = (numColors: number) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors; // Distribute colors evenly around the hue spectrum
    colors.push(`hsl(${hue}, 75%, 60%)`); // HSL with 75% saturation and 60% lightness
  }
  return colors;
};

const backgroundColors = generateRainbowColors(Object.keys(familyTypeData).length);

const data = {
  labels: Object.values(familyTypeData),
  datasets: [
    {
      label: 'Hamilton - Family Type Distribution',
      data: randomValues,
      backgroundColor: backgroundColors,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' as const },
    title: { display: true, text: 'Family Type Breakdown - Hamilton' },
  },
};

const FamilyTypeHamilton: React.FC = () => {
  return (
    <section
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '30px',
        fontFamily: 'Arial, sans-serif',
        color: '#f4f4f4',
        backgroundColor: '#1c1c1c',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '20px',
          color: '#FFD700',
        }}
      >
        Family Type Breakdown - Hamilton
      </h1>

      <div
        style={{
          backgroundColor: '#2c2c2c',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '600px',
            paddingBottom: '50px',
          }}
        >
          <Pie data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default FamilyTypeHamilton;
