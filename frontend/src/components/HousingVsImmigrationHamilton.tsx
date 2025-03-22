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
import {useTheme} from "../ThemeContext"; // same pattern as your other files

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DataEntry {
    year: number;
    month: number;
    totalStarts?: number;
    total_immigrants?: number;
}

const HousingVsImmigration: React.FC = () => {
    const {theme} = useTheme(); // Dark/Light theme
    const [chartData, setChartData] = useState<any>(null);

    // Mock data for demonstration
    const mockHousingData: DataEntry[] = [
        {year: 2020, month: 1, totalStarts: 120},
        {year: 2020, month: 2, totalStarts: 135},
        {year: 2020, month: 3, totalStarts: 150},
        {year: 2020, month: 4, totalStarts: 165},
        {year: 2020, month: 5, totalStarts: 180},
    ];
    const mockImmigrationData: DataEntry[] = [
        {year: 2020, month: 1, total_immigrants: 80},
        {year: 2020, month: 2, total_immigrants: 95},
        {year: 2020, month: 3, total_immigrants: 110},
        {year: 2020, month: 4, total_immigrants: 125},
        {year: 2020, month: 5, total_immigrants: 140},
    ];

    useEffect(() => {
        // 1) Gather all possible months (YYYY-MM) from both data sets
        const allMonths = [
            ...new Set(
                [...mockHousingData, ...mockImmigrationData].map(
                    (entry) => `${entry.year}-${String(entry.month).padStart(2, "0")}`
                )
            ),
        ].sort();

        // 2) For each month, find housing starts and immigrants, then compute ratio
        const ratioData = allMonths.map((label) => {
            const foundHousing = mockHousingData.find(
                (d) => `${d.year}-${String(d.month).padStart(2, "0")}` === label
            );
            const foundImmigration = mockImmigrationData.find(
                (d) => `${d.year}-${String(d.month).padStart(2, "0")}` === label
            );
            const housing = foundHousing?.totalStarts ?? 0;
            const immigrants = foundImmigration?.total_immigrants ?? 0;

            // Houses built per 5 immigrants
            return immigrants === 0 ? 0 : (housing * 5) / immigrants;
        });

        // 3) Construct the chart data with one dataset
        setChartData({
            labels: allMonths,
            datasets: [
                {
                    label: "Houses Built per 5 Immigrants",
                    data: ratioData,
                    borderColor: "rgba(0, 123, 255, 1)",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    tension: 0.2,
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
                    color: theme === "dark" ? "#ffffff" : "#000000",
                }}
            >
                Houses Built per 5 Immigrants - Hamilton
            </h1>

            <div
                style={{
                    backgroundColor: theme === "dark" ? "#2c2c2c" : "#f8f8f8",
                    padding: "20px",
                    borderRadius: "8px",
                    height: "500px",
                }}
            >
                {chartData ? (
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
                                    text: "Houses Built per 5 Immigrants",
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
                    <p>Loading chart data...</p>
                )}
            </div>
        </section>
    );
};

export default HousingVsImmigration;
