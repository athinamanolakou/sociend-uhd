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
import {useTheme} from "../ThemeContext";
import {getLabourMarketImmigration} from "../services/housingService";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ImmigrationEntry {
    city: string;
    year: number;
    month: number;
    immigrantStatus: string;
}

const fallbackImmigrationData = [
    {city: "Hamilton", year: 2020, month: 1, totalImmigrants: 143_500},
    {city: "Hamilton", year: 2020, month: 5, totalImmigrants: 145_000},
    {city: "Hamilton", year: 2021, month: 1, totalImmigrants: 146_032},
    {city: "Hamilton", year: 2021, month: 5, totalImmigrants: 149_500},
];


const HamiltonImmigration: React.FC = () => {
    const {theme} = useTheme();
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const allData: ImmigrationEntry[] = await getLabourMarketImmigration();
                const hamiltonData = allData.filter((entry) => entry.city === "Hamilton");

                if (hamiltonData.length === 0) {
                    setChartData(formatChartData(fallbackImmigrationData));
                } else {
                    // **Count Total Existing Immigrants Per (Year, Month)**
                    const groupedMap = new Map<string, {year: number; month: number; totalImmigrants: number}>();

                    for (const entry of hamiltonData) {
                        if (entry.immigrantStatus !== "Immigrant") continue;
                        const ymKey = `${entry.year}-${entry.month}`;

                        if (!groupedMap.has(ymKey)) {
                            groupedMap.set(ymKey, {year: entry.year, month: entry.month, totalImmigrants: 0});
                        }
                        groupedMap.get(ymKey)!.totalImmigrants += 1;
                    }

                    // **Convert Map to Sorted Array**
                    const groupedArray = Array.from(groupedMap.values()).sort((a, b) => {
                        return a.year * 100 + a.month - (b.year * 100 + b.month);
                    });

                    setChartData(formatChartData(groupedArray));
                }
            } catch (error) {
                console.error("Error fetching Hamilton immigration data:", error);
                setChartData(formatChartData(fallbackImmigrationData));
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // **Helper Function to Format Chart Data**
    const formatChartData = (data: {year: number; month: number; totalImmigrants: number}[]) => ({
        labels: data.map((item) => `${item.year}-${String(item.month).padStart(2, "0")}`),
        datasets: [
            {
                label: "Total Immigrants (Hamilton)",
                data: data.map((item) => item.totalImmigrants),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.2,
            },
        ],
    });

    return (
        <section
            data-testid="hamilton-immigration"
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
                Immigration Trends (Hamilton)
            </h1>

            <div
                style={{
                    backgroundColor: theme === "dark" ? "#2c2c2c" : "#f8f8f8",
                    padding: "20px",
                    borderRadius: "8px",
                    height: "500px",
                }}
            >
                {loading ? (
                    <p>Loading chart data...</p>
                ) : chartData ? (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {labels: {color: theme === "dark" ? "#ffffff" : "#000000"}},
                                title: {
                                    display: true,
                                    text: "Total Immigrants in Hamilton",
                                    color: theme === "dark" ? "#ffffff" : "#000000",
                                },
                            },
                            scales: {
                                x: {ticks: {color: theme === "dark" ? "#ffffff" : "#000000"}},
                                y: {ticks: {color: theme === "dark" ? "#ffffff" : "#000000"}},
                            },
                        }}
                    />
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </section>
    );
};

export default HamiltonImmigration;
