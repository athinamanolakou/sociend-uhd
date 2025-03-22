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
  "Legislative and senior management": 20,
  "Specialized middle management": 40,
  "Retail and customer service management": 60,
  "Trades, transport, production management": 70,
  "Professional occupations in finance": 50,
  "Professional occupations in business": 55,
  "Administrative and financial supervisors": 48,
  "Administrative and logistics occupations": 42,
  "Administrative support and supply chain": 65,
  "Professional occupations in sciences": 35,
  "Applied sciences professionals": 30,
  "Engineering professionals": 40,
  "Technical occupations in applied sciences": 32,
  "Health treating and consultation services": 75,
  "Therapy and assessment professionals": 25,
  "Nursing and allied health professionals": 70,
  "Technical occupations in health": 40,
  "Assisting occupations in health services": 38,
  "Professional occupations in law": 20,
  "Professional occupations in education": 65,
  "Community and social services": 55,
  "Government services professionals": 45,
  "Public protection services": 30,
  "Paraprofessional occupations": 25,
  "Legal and public protection assistants": 15,
  "Care providers and public protection": 55,
  "Professional occupations in art & culture": 20,
  "Technical occupations in art & sport": 22,
  "Occupations in art, culture, and sport": 28,
  "Support occupations in art & sport": 25,
};

const LabourMarketToronto: React.FC = () => {
  const {theme} = useTheme();
  const [occupationCounts, setOccupationCounts] = useState<Record<string, number>>(fallbackOccupationCounts);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const allData: OccupationEntry[] = await getLabourMarketOccupations();
        const torontoData = allData.filter((entry) => entry.city === "Toronto");

        if (torontoData.length === 0) {
          console.warn("No API data for Toronto occupations, using fallback data.");
          setOccupationCounts(fallbackOccupationCounts);
        } else {
          // Count occurrences of each occupation
          const countedOccupations: Record<string, number> = {};
          torontoData.forEach((entry) => {
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
        console.error("Error fetching Toronto occupations data:", error);
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
        label: "Occupation Distribution (Toronto)",
        data: Object.values(occupationCounts),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
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
        text: "Occupation Breakdown (Toronto)",
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
      data-testid="labour-occupations-toronto"
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
        Occupation Breakdown (Toronto)
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

export default LabourMarketToronto;
