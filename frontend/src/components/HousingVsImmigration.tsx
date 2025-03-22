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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DataEntry {
    city: string;
    year: number;
    month: number;
    totalStarts?: number;
    total_immigrants?: number;
}

// Mock data for demonstration: Hamilton and Toronto in the same arrays
const mockHousingData: DataEntry[] = [
    // Hamilton Housing
    {city: "Hamilton", year: 2020, month: 1, totalStarts: 120},
    {city: "Hamilton", year: 2020, month: 2, totalStarts: 135},
    {city: "Hamilton", year: 2020, month: 3, totalStarts: 150},
    {city: "Hamilton", year: 2020, month: 4, totalStarts: 165},
    {city: "Hamilton", year: 2020, month: 5, totalStarts: 180},
    // Toronto Housing
    {city: "Toronto", year: 2020, month: 1, totalStarts: 100},
    {city: "Toronto", year: 2020, month: 2, totalStarts: 115},
    {city: "Toronto", year: 2020, month: 3, totalStarts: 125},
    {city: "Toronto", year: 2020, month: 4, totalStarts: 140},
    {city: "Toronto", year: 2020, month: 5, totalStarts: 160},
];

const mockImmigrationData: DataEntry[] = [
    // Hamilton Immigration
    {city: "Hamilton", year: 2020, month: 1, total_immigrants: 80},
    {city: "Hamilton", year: 2020, month: 2, total_immigrants: 95},
    {city: "Hamilton", year: 2020, month: 3, total_immigrants: 110},
    {city: "Hamilton", year: 2020, month: 4, total_immigrants: 125},
    {city: "Hamilton", year: 2020, month: 5, total_immigrants: 140},
    // Toronto Immigration
    {city: "Toronto", year: 2020, month: 1, total_immigrants: 70},
    {city: "Toronto", year: 2020, month: 2, total_immigrants: 90},
    {city: "Toronto", year: 2020, month: 3, total_immigrants: 100},
    {city: "Toronto", year: 2020, month: 4, total_immigrants: 115},
    {city: "Toronto", year: 2020, month: 5, total_immigrants: 130},
];

const HousingVsImmigration: React.FC = () => {
    const {theme} = useTheme(); // Dark/Light theme from your context
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        // Gather all possible YYYY-MM labels from both data sets
        const allMonths = [
            ...new Set(
                [...mockHousingData, ...mockImmigrationData].map(
                    (entry) => `${entry.year}-${String(entry.month).padStart(2, "0")}`
                )
            ),
        ].sort();

        // Helper: Get the ratio of (housingStarts * 5) / immigrants for a city in a given month
        const getRatioForMonth = (city: string, label: string) => {
            // Find housing starts for that city & label
            const foundHousing = mockHousingData.find(
                (d) => d.city === city && `${d.year}-${String(d.month).padStart(2, "0")}` === label
            );
            const housing = foundHousing?.totalStarts ?? 0;

            // Find immigration for that city & label
            const foundImm = mockImmigrationData.find(
                (d) => d.city === city && `${d.year}-${String(d.month).padStart(2, "0")}` === label
            );
            const immigrants = foundImm?.total_immigrants ?? 0;

            return immigrants === 0 ? 0 : (housing * 5) / immigrants;
        };

        // Build ratio arrays for Hamilton and Toronto
        const hamiltonRatios = allMonths.map((label) => getRatioForMonth("Hamilton", label));
        const torontoRatios = allMonths.map((label) => getRatioForMonth("Toronto", label));

        // Construct chart data with 2 lines
        setChartData({
            labels: allMonths,
            datasets: [
                {
                    label: "Hamilton",
                    data: hamiltonRatios,
                    borderColor: "rgba(0, 123, 255, 1)",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    tension: 0.2,
                },
                {
                    label: "Toronto",
                    data: torontoRatios,
                    borderColor: "rgba(40, 167, 69, 1)",
                    backgroundColor: "rgba(40, 167, 69, 0.2)",
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
                Houses Built per 5 Immigrants (Hamilton vs Toronto)
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
