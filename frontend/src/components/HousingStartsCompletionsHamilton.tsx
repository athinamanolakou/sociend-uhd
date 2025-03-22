import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {useTheme} from "../ThemeContext";
import {getHousingTotalStartsCompletions} from "../services/housingService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

/** Represents each entry from the API. */
interface HousingEntry {
  city: string;
  year: number;
  month: number;
  totalStarts: number;
  totalCompletions: number;
}

const HousingStartsHamilton: React.FC = () => {
  const {theme} = useTheme();
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchHamiltonData() {
      try {
        const allData: HousingEntry[] = await getHousingTotalStartsCompletions();

        // Filter for city === "Hamilton"
        const hamiltonData = allData.filter((entry) => entry.city === "Hamilton");

        // Group by (year, month) to avoid duplicates
        const groupedMap = new Map<string, {year: number; month: number; totalStarts: number; totalCompletions: number}>();

        for (const row of hamiltonData) {
          const ymKey = `${row.year}-${row.month}`;
          if (!groupedMap.has(ymKey)) {
            groupedMap.set(ymKey, {
              year: row.year,
              month: row.month,
              totalStarts: 0,
              totalCompletions: 0,
            });
          }
          const existing = groupedMap.get(ymKey)!;
          existing.totalStarts += row.totalStarts;
          existing.totalCompletions += row.totalCompletions;
        }

        // Convert map back to an array and sort by (year, month)
        const groupedArray = Array.from(groupedMap.values());
        groupedArray.sort((a, b) => {
          const dateA = a.year * 100 + a.month;
          const dateB = b.year * 100 + b.month;
          return dateA - dateB;
        });

        // Build labels & data arrays
        const timeLabels = groupedArray.map(
          (item) => `${item.year}-${String(item.month).padStart(2, "0")}`
        );
        const starts = groupedArray.map((item) => item.totalStarts);
        const completions = groupedArray.map((item) => item.totalCompletions);

        // Construct chart data
        const newChartData: ChartData = {
          labels: timeLabels,
          datasets: [
            {
              label: "Total Starts (Hamilton)",
              data: starts,
              backgroundColor: "rgba(0, 123, 255, 0.6)",
            },
            {
              label: "Total Completions (Hamilton)",
              data: completions,
              backgroundColor: "rgba(0, 123, 255, 1)",
            },
          ],
        };

        setChartData(newChartData);
      } catch (error) {
        console.error("Error fetching or processing Hamilton housing data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHamiltonData();
  }, []);

  return (
    <section
      data-testid="housing-starts-hamilton"
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
        Housing Starts and Completions (Hamilton)
      </h1>

      <div
        style={{
          backgroundColor: theme === "dark" ? "#2c2c2c" : "#f8f8f8",
          padding: "20px",
          borderRadius: "8px",
          height: "600px",
        }}
      >
        {loading ? (
          <p>Loading chart data...</p>
        ) : chartData ? (
          <Bar
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
                  text: "Housing Starts and Completions (Hamilton)",
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
        ) : (
          <p>No data available for Hamilton.</p>
        )}
      </div>
    </section>
  );
};

export default HousingStartsHamilton;
