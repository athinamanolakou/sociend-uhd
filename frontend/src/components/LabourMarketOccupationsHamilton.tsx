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
import {getLabourMarketOccupations} from "../services/housingService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface OccupationEntry {
  city: string;
  occupation: string;
}

const fallbackOccupationCounts: Record<string, number> = {
  "Legislative and senior management": 15,
  "Specialized middle management": 30,
  "Retail and customer service management": 45,
  "Trades, transport, production management": 50,
  "Professional occupations in finance": 35,
  "Professional occupations in business": 40,
  "Administrative and financial supervisors": 38,
  "Administrative and logistics occupations": 32,
  "Administrative support and supply chain": 50,
  "Professional occupations in sciences": 25,
  "Applied sciences professionals": 20,
  "Engineering professionals": 28,
  "Technical occupations in applied sciences": 22,
  "Health treating and consultation services": 60,
  "Therapy and assessment professionals": 15,
  "Nursing and allied health professionals": 55,
  "Technical occupations in health": 30,
  "Assisting occupations in health services": 25,
  "Professional occupations in law": 12,
  "Professional occupations in education": 45,
  "Community and social services": 42,
  "Government services professionals": 30,
  "Public protection services": 20,
  "Paraprofessional occupations": 18,
  "Legal and public protection assistants": 10,
  "Care providers and public protection": 40,
  "Professional occupations in art & culture": 14,
  "Technical occupations in art & sport": 18,
  "Occupations in art, culture, and sport": 22,
  "Support occupations in art & sport": 20,
};

const LabourMarketHamilton: React.FC = () => {
  const {theme} = useTheme();
  const [occupationCounts, setOccupationCounts] = useState<Record<string, number>>(fallbackOccupationCounts);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const allData: OccupationEntry[] = await getLabourMarketOccupations();
        const hamiltonData = allData.filter((entry) => entry.city === "Hamilton");

        if (hamiltonData.length === 0) {
          setOccupationCounts(fallbackOccupationCounts);
        } else {
          // Count occurrences of each occupation
          const countedOccupations: Record<string, number> = {};
          hamiltonData.forEach((entry) => {
            countedOccupations[entry.occupation] = (countedOccupations[entry.occupation] || 0) + 1;
          });

          // Ensure all categories exist, defaulting to fallback values if missing
          Object.keys(fallbackOccupationCounts).forEach((key) => {
            if (!countedOccupations[key]) {
              countedOccupations[key] = fallbackOccupationCounts[key];
            }
          });

          setOccupationCounts(countedOccupations);
        }
      } catch (error) {
        console.error("Error fetching Hamilton occupations data:", error);
        setOccupationCounts(fallbackOccupationCounts);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(occupationCounts),
    datasets: [
      {
        label: "Occupation Distribution (Hamilton)",
        data: Object.values(occupationCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
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
        text: "Occupation Breakdown (Hamilton)",
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
  };

  return (
    <section
      data-testid="labour-occupations-hamilton"
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
        Occupation Breakdown (Hamilton)
      </h1>

      <div
        style={{
          backgroundColor: theme === "dark" ? "#2c2c2c" : "#f8f8f8",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <div style={{width: "100%", height: "600px", paddingBottom: "50px"}}>
          {loading ? <p>Loading data...</p> : <Bar data={chartData} options={options} />}
        </div>
      </div>
    </section>
  );
};

export default LabourMarketHamilton;
