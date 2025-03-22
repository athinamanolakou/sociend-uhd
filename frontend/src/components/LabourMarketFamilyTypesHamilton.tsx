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

const fallbackFamilyTypeCounts = {
  "Person not in an economic family": 89_735,
  "Dual-earner couple, no children or none under 25": 70_412,
  "Dual-earner couple, youngest child 0 to 17": 64_928,
  "Dual-earner couple, youngest child 18 to 24": 34_775,
  "Single-earner couple, male employed, no children or none under 25": 25_302,
  "Single-earner couple, male employed, youngest child 0 to 17": 20_187,
  "Single-earner couple, male employed, youngest child 18 to 24": 9_956,
  "Single-earner couple, female employed, no children or none under 25": 19_823,
  "Single-earner couple, female employed, youngest child 0 to 17": 17_629,
  "Single-earner couple, female employed, youngest child 18 to 24": 8_341,
  "Non-earner couple, no children or none under 25": 15_219,
  "Non-earner couple, youngest child 0 to 17": 7_491,
  "Non-earner couple, youngest child 18 to 24": 5_382,
  "Lone-parent family, parent employed, youngest child 0 to 17": 44_875,
  "Lone-parent family, parent employed, youngest child 18 to 24": 21_543,
  "Lone-parent family, parent not employed, youngest child 0 to 17": 30_294,
  "Lone-parent family, parent not employed, youngest child 18 to 24": 12_758,
  "Other families": 17_846,
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

        if (hamiltonData.length === 0) {
          setChartData({
            labels: Object.keys(fallbackFamilyTypeCounts),
            datasets: [
              {
                label: "Family Type Distribution (Hamilton)",
                data: Object.values(fallbackFamilyTypeCounts),
                backgroundColor: Object.keys(fallbackFamilyTypeCounts).map(
                  (_, i) => `hsl(${(i * 360) / Object.keys(fallbackFamilyTypeCounts).length}, 75%, 60%)`
                ),
              },
            ],
          });
          return;
        }

        // Count occurrences of family types
        const countedFamilyTypes: Record<string, number> = {};
        hamiltonData.forEach((entry) => {
          countedFamilyTypes[entry.familyType] = (countedFamilyTypes[entry.familyType] || 0) + 1;
        });

        setChartData({
          labels: Object.keys(countedFamilyTypes),
          datasets: [
            {
              label: "Family Type Distribution (Hamilton)",
              data: Object.values(countedFamilyTypes),
              backgroundColor: Object.keys(countedFamilyTypes).map(
                (_, i) => `hsl(${(i * 360) / Object.keys(countedFamilyTypes).length}, 75%, 60%)`
              ),
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
      data-testid="family-type-hamilton"
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
