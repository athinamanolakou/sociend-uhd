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

interface ImmigrationData {
    year: number;
    month: number;
    totalImmigrants: number;
}


const fallbackImmigrationData = [
    {city: "Toronto", year: 2020, month: 1, totalImmigrants: 1_270_000},
    {city: "Toronto", year: 2020, month: 5, totalImmigrants: 1_280_000},
    {city: "Toronto", year: 2021, month: 1, totalImmigrants: 1_303_169},
    {city: "Toronto", year: 2021, month: 5, totalImmigrants: 1_310_000},
];

const TorontoImmigration: React.FC = () => {
    const {theme} = useTheme();
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const allData = await getLabourMarketImmigration();
                const torontoData = allData.filter(
                    (entry) => entry.city === "Toronto" && entry.immigrantStatus === "Immigrant"
                );

                if (torontoData.length === 0) {
                    setChartData({
                        labels: fallbackImmigrationData.map(
                            (item) => `${item.year}-${String(item.month).padStart(2, "0")}`
                        ),
                        datasets: [
                            {
                                label: "Total Immigrant Population (Toronto)",
                                data: fallbackImmigrationData.map((item) => item.totalImmigrants),
                                borderColor: "rgba(255, 99, 132, 1)",
                                backgroundColor: "rgba(255, 99, 132, 0.2)",
                                tension: 0.2,
                            },
                        ],
                    });
                    return;
                }

                // ** Count total immigrants per (year, month)**
                const groupedMap = new Map<string, ImmigrationData>();

                for (const entry of torontoData) {
                    const ymKey = `${entry.year}-${entry.month}`;
                    if (!groupedMap.has(ymKey)) {
                        groupedMap.set(ymKey, {year: entry.year, month: entry.month, totalImmigrants: 0});
                    }
                    groupedMap.get(ymKey)!.totalImmigrants += 1; // Increase count per immigrant entry
                }

                // Convert map to sorted array
                const groupedArray = Array.from(groupedMap.values()).sort(
                    (a, b) => a.year * 100 + a.month - (b.year * 100 + b.month)
                );

                setChartData({
                    labels: groupedArray.map(
                        (item) => `${item.year}-${String(item.month).padStart(2, "0")}`
                    ),
                    datasets: [
                        {
                            label: "Total Immigrant Population (Toronto)",
                            data: groupedArray.map((item) => item.totalImmigrants),
                            borderColor: "rgba(255, 99, 132, 1)",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            tension: 0.2,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching Toronto immigration data:", error);
                setChartData({
                    labels: fallbackImmigrationData.map(
                        (item) => `${item.year}-${String(item.month).padStart(2, "0")}`
                    ),
                    datasets: [
                        {
                            label: "Total Immigrant Population (Toronto)",
                            data: fallbackImmigrationData.map((item) => item.totalImmigrants),
                            borderColor: "rgba(255, 99, 132, 1)",
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            tension: 0.2,
                        },
                    ],
                });
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <section
            data-testid="toronto-immigration"
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
                Immigration Trends (Toronto)
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
                                    text: "Total Immigrant Population in Toronto",
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

export default TorontoImmigration;
