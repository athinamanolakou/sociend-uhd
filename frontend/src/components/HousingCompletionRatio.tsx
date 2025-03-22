import React, {useEffect, useState} from "react";
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
import {useTheme} from "../ThemeContext"; // same pattern as your starts/completions Hamilton file

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Types
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

// Mock data – replace with real data/fetching as needed
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

// Helper to transform raw data into chart-friendly format
const processChartData = (data: typeof mockData): ChartData => {
  const timeLabels = [
    ...new Set(data.map((entry) => `${entry.year}-${String(entry.month).padStart(2, "0")}`)),
  ];

  const getCityCompletionRates = (city: string) =>
    timeLabels.map((date) => {
      const entry = data.find(
        (item) =>
          item.city === city &&
          `${item.year}-${String(item.month).padStart(2, "0")}` === date
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
  const {theme} = useTheme();  // same approach as your Hamilton file
  const [chartData, setChartData] = useState<ChartData>({labels: [], datasets: []});

  useEffect(() => {
    // Simulate fetching / processing data
    const data = processChartData(mockData);
    setChartData(data);
  }, []);

  return (
    <section
      data-testid="housing-completion-ratio"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        color: theme === "dark" ? "#f4f4f4" : "#000000",
        backgroundColor: theme === "dark" ? "#1c1c1c" : "#ffffff",
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
          color: theme === "dark" ? "#ffffff" : "#000000",
        }}
      >
        Housing Completion Rate (Hamilton vs Toronto) - Monthly
      </h1>

      <div
        style={{
          backgroundColor: theme === "dark" ? "#2c2c2c" : "#f8f8f8",
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
                      color: theme === "dark" ? "#ffffff" : "#000000",
                    },
                  },
                  title: {
                    display: true,
                    text: "Housing Completion Rates",
                    color: theme === "dark" ? "#ffffff" : "#000000",
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: theme === "dark" ? "#ffffff" : "#000000",
                    },
                  },
                  y: {
                    ticks: {
                      color: theme === "dark" ? "#ffffff" : "#000000",
                    },
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
