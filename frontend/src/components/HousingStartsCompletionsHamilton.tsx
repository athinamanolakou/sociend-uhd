import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../ThemeContext";  // ✅ Import useTheme

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HousingStartsHamilton: React.FC = () => {
  const { theme } = useTheme(); // ✅ Get theme from context

  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }

  const [chartData, setChartData] = useState<ChartData | null>(null);

  const mockData = [
    { city: "Hamilton", year: 2023, month: 1, totalStarts: 100, totalCompletions: 80 },
    { city: "Hamilton", year: 2023, month: 2, totalStarts: 120, totalCompletions: 90 },
    { city: "Hamilton", year: 2023, month: 3, totalStarts: 110, totalCompletions: 95 },
    { city: "Hamilton", year: 2023, month: 4, totalStarts: 130, totalCompletions: 100 },
    { city: "Hamilton", year: 2023, month: 5, totalStarts: 115, totalCompletions: 105 },
    { city: "Hamilton", year: 2023, month: 6, totalStarts: 125, totalCompletions: 110 },
  ];

  useEffect(() => {
    const timeLabels = mockData.map(entry => `${entry.year}-${String(entry.month).padStart(2, "0")}`);
    const starts = mockData.map(entry => entry.totalStarts);
    const completions = mockData.map(entry => entry.totalCompletions);

    setChartData({
      labels: timeLabels,
      datasets: [
        {
          label: "Hamilton - Total Starts",
          data: starts,
          backgroundColor: "rgba(0, 123, 255, 0.6)",
        },
        {
          label: "Hamilton - Total Completions",
          data: completions,
          backgroundColor: "rgba(0, 123, 255, 1)",
        },
      ],
    });
  }, []);

  return (
    <section
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
          color: theme === "dark" ? "#ffffff" : "#000000", // ✅ Change title color based on theme
        }}
      >
        Housing Starts and Completions - Hamilton
      </h1>

      <div
        style={{
          backgroundColor: theme === "dark" ? "#2c2c2c" : "#f8f8f8",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { labels: { color: theme === "dark" ? "#ffffff" : "#000000" } }, // ✅ Legend color
                title: {
                  display: true,
                  text: "Housing Starts and Completions - Hamilton",
                  color: theme === "dark" ? "#ffffff" : "#000000", // ✅ Change graph title
                },
              },
              scales: {
                x: {
                  ticks: { color: theme === "dark" ? "#ffffff" : "#000000" }, // ✅ X-axis label color
                },
                y: {
                  ticks: { color: theme === "dark" ? "#ffffff" : "#000000" }, // ✅ Y-axis label color
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

export default HousingStartsHamilton;
