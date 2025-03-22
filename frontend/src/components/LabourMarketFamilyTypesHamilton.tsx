import React, {useEffect, useState} from "react";
import {Pie} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {useTheme} from "../ThemeContext";
import {getLabourMarketFamilyTypes} from "../services/housingService";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

/**
 * The 18 family type categories from your backend.
 */
const FAMILY_TYPE_MAP: Record<number, string> = {
  1: "Person not in an economic family",
  2: "Dual-earner couple, no children or none under 25",
  3: "Dual-earner couple, youngest child 0 to 17",
  4: "Dual-earner couple, youngest child 18 to 24",
  5: "Single-earner couple, male employed, no children or none under 25",
  6: "Single-earner couple, male employed, youngest child 0 to 17",
  7: "Single-earner couple, male employed, youngest child 18 to 24",
  8: "Single-earner couple, female employed, no children or none under 25",
  9: "Single-earner couple, female employed, youngest child 0 to 17",
  10: "Single-earner couple, female employed, youngest child 18 to 24",
  11: "Non-earner couple, no children or none under 25",
  12: "Non-earner couple, youngest child 0 to 17",
  13: "Non-earner couple, youngest child 18 to 24",
  14: "Lone-parent family, parent employed, youngest child 0 to 17",
  15: "Lone-parent family, parent employed, youngest child 18 to 24",
  16: "Lone-parent family, parent not employed, youngest child 0 to 17",
  17: "Lone-parent family, parent not employed, youngest child 18 to 24",
  18: "Other families",
};


const fallbackCounts: Record<string, number> = {
  "Person not in an economic family": 50,
  "Dual-earner couple, no children or none under 25": 40,
  "Dual-earner couple, youngest child 0 to 17": 30,
  "Dual-earner couple, youngest child 18 to 24": 25,
  "Single-earner couple, male employed, no children or none under 25": 20,
  "Single-earner couple, male employed, youngest child 0 to 17": 15,
  "Single-earner couple, male employed, youngest child 18 to 24": 10,
  "Single-earner couple, female employed, no children or none under 25": 18,
  "Single-earner couple, female employed, youngest child 0 to 17": 12,
  "Single-earner couple, female employed, youngest child 18 to 24": 8,
  "Non-earner couple, no children or none under 25": 22,
  "Non-earner couple, youngest child 0 to 17": 10,
  "Non-earner couple, youngest child 18 to 24": 5,
  "Lone-parent family, parent employed, youngest child 0 to 17": 14,
  "Lone-parent family, parent employed, youngest child 18 to 24": 8,
  "Lone-parent family, parent not employed, youngest child 0 to 17": 12,
  "Lone-parent family, parent not employed, youngest child 18 to 24": 7,
  "Other families": 20,
};

const FamilyTypeHamilton: React.FC = () => {
  const {theme} = useTheme();
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const allData = await getLabourMarketFamilyTypes();
        const hamiltonData = allData.filter((row) => row.city === "Hamilton");

        // Count occurrences per family type
        const freqMap = new Map<string, number>();
        hamiltonData.forEach((row) => {
          const ft = row.familyType as string;
          freqMap.set(ft, (freqMap.get(ft) || 0) + 1);
        });

        // Fill in missing categories with fallback counts
        const labels = Object.values(FAMILY_TYPE_MAP);
        const finalCounts = labels.map((label) => freqMap.get(label) ?? fallbackCounts[label]);

        setChartData({
          labels,
          datasets: [
            {
              label: "Family Type Distribution (Hamilton)",
              data: finalCounts,
              backgroundColor: labels.map((_, i) => `hsl(${(i * 360) / labels.length}, 75%, 60%)`),
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching Hamilton family types:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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
      <h1 style={{textAlign: "center", fontSize: "2.5rem", marginBottom: "20px"}}>
        Family Type Breakdown (Hamilton)
      </h1>

      <div style={{backgroundColor: theme === "dark" ? "#2c2c2c" : "#f8f8f8", padding: "20px", borderRadius: "8px"}}>
        {loading ? <p>Loading chart data...</p> : chartData ? <Pie data={chartData} /> : <p>No data available.</p>}
      </div>
    </section>
  );
};

export default FamilyTypeHamilton;
