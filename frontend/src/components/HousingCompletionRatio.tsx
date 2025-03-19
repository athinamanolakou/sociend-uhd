import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ThemeContext } from "../ThemeContext"; // Import ThemeContext

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockData = [
  { city: "Hamilton", year: 2023, month: 1, ratio: 0.75 },
  { city: "Hamilton", year: 2023, month: 2, ratio: 0.80 },
  { city: "Hamilton", year: 2023, month: 3, ratio: 0.85 },
  { city: "Hamilton", year: 2023, month: 4, ratio: 0.78 },
  { city: "Hamilton", year: 2023, month: 5, ratio: 0.82 },
  { city: "Hamilton", year: 2023, month: 6, ratio: 0.88 },
  { city: "Toronto", year: 2023, month: 1, ratio: 0.70 },
  { city: "Toronto", year: 2023, month: 2, ratio: 0.72 },
  { city: "Toronto", year: 2023, month: 3, ratio: 0.76 },
  { city: "Toronto", year: 2023, month: 4, ratio: 0.74 },
  { city: "Toronto", year: 2023, month: 5, ratio: 0.78 },
  { city: "Toronto", year: 2023, month: 6, ratio: 0.81 },
];

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const processChartData = (data: typeof mockData): ChartData => {
  const timeLabels = [...new Set(data.map(entry => `${entry.year}-${String(entry.month).padStart(2, "0")}`))];

  const getCityCompletionRates = (city: string) =>
    timeLabels.map(date => {
      const entry = data.find(item => item.city === city && `${item.year}-${String(item.month).padStart(2, "0")}` === date);
      return entry ? entry.ratio * 100 : 0;
    });

  return {
    labels: timeLabels,
    datasets: [
      {
        label: "Hamilton Completion Rate (%)",
        data: getCityCompletionRates("Hamilton"),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "Toronto Completion Rate (%)",
        data: getCityCompletionRates("Toronto"),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
      },
    ],
  };
};

const HousingGraph: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
  const themeContext = useContext(ThemeContext); // Use ThemeContext

  useEffect(() => {
    setChartData(processChartData(mockData));
  }, []);

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        color: "var(--text-color)", // Use theme-based text color
        backgroundColor: "var(--background-color)", // Use theme-based background
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "var(--text-color)", // Ensure text matches theme
        }}
      >
        Housing Completion Rate (Hamilton vs Toronto) - Monthly
      </h1>

      <div
        style={{
          backgroundColor: "var(--button-bg)", // Adjust chart container to match theme
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {chartData.labels.length > 0 ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: "var(--text-color)", // Ensure legend follows theme
                  },
                },
              },
              scales: {
                x: {
                  ticks: { color: "var(--text-color)" }, // Make x-axis text follow theme
                },
                y: {
                  ticks: { color: "var(--text-color)" }, // Make y-axis text follow theme
                },
              },
            }}
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </section>
  );
};

export default HousingGraph;
