import React, {useEffect, useState, useContext} from "react";
import {Line} from "react-chartjs-2";
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
import {ThemeContext} from "../ThemeContext";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

// Mocked data – replace with your real data fetching if needed
const mockData = [
  {city: "Hamilton", year: 2023, month: 1, ratio: 0.75},
  {city: "Hamilton", year: 2023, month: 2, ratio: 0.8},
  {city: "Hamilton", year: 2023, month: 3, ratio: 0.85},
  {city: "Hamilton", year: 2023, month: 4, ratio: 0.78},
  {city: "Hamilton", year: 2023, month: 5, ratio: 0.82},
  {city: "Hamilton", year: 2023, month: 6, ratio: 0.88},
  {city: "Toronto", year: 2023, month: 1, ratio: 0.7},
  {city: "Toronto", year: 2023, month: 2, ratio: 0.72},
  {city: "Toronto", year: 2023, month: 3, ratio: 0.76},
  {city: "Toronto", year: 2023, month: 4, ratio: 0.74},
  {city: "Toronto", year: 2023, month: 5, ratio: 0.78},
  {city: "Toronto", year: 2023, month: 6, ratio: 0.81},
];

// Helper function to transform raw data into chart-friendly format
const processChartData = (data: typeof mockData): ChartData => {
  const timeLabels = [...new Set(data.map((entry) => `${entry.year}-${String(entry.month).padStart(2, "0")}`))];

  const getCityCompletionRates = (city: string) =>
    timeLabels.map((date) => {
      const entry = data.find(
        (item) => item.city === city && `${item.year}-${String(item.month).padStart(2, "0")}` === date
      );
      // Multiply ratio by 100 to get a percentage
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

const HousingCompletionRatio: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({labels: [], datasets: []});
  const themeContext = useContext(ThemeContext); // Using the ThemeContext

  useEffect(() => {
    // Simulate fetching or processing data
    const data = processChartData(mockData);
    setChartData(data);
  }, []);

  return (
    <section
      data-testid="housing-completion-ratio" // <-- Used for testing
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        color: "var(--text-color)",
        backgroundColor: "var(--background-color)",
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
          color: "var(--text-color)",
        }}
      >
        Housing Completion Rate (Hamilton vs Toronto) - Monthly
      </h1>

      <div
        style={{
          backgroundColor: "var(--button-bg)",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {chartData.labels.length > 0 ? (
          <div style={{width: "100%", height: "500px"}}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      color: "var(--text-color)",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {color: "var(--text-color)"},
                  },
                  y: {
                    ticks: {color: "var(--text-color)"},
                  },
                },
              }}
            />
          </div>
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </section>
  );
};

export default HousingCompletionRatio;
