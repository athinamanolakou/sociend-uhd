import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const HousingStartsGraph: React.FC = () => {
    interface ChartData {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string;
        }[];
    }

    const [chartData, setChartData] = useState<ChartData | null>(null);

    // Mock Data
    const mockData = [
        { city: "Hamilton", year: 2023, month: 1, totalStarts: 100, totalCompletions: 80 },
        { city: "Hamilton", year: 2023, month: 2, totalStarts: 120, totalCompletions: 90 },
        { city: "Hamilton", year: 2023, month: 3, totalStarts: 110, totalCompletions: 95 },
        { city: "Hamilton", year: 2023, month: 4, totalStarts: 130, totalCompletions: 100 },
        { city: "Hamilton", year: 2023, month: 5, totalStarts: 115, totalCompletions: 105 },
        { city: "Hamilton", year: 2023, month: 6, totalStarts: 125, totalCompletions: 110 },
        { city: "Toronto", year: 2023, month: 1, totalStarts: 150, totalCompletions: 120 },
        { city: "Toronto", year: 2023, month: 2, totalStarts: 160, totalCompletions: 130 },
        { city: "Toronto", year: 2023, month: 3, totalStarts: 155, totalCompletions: 140 },
        { city: "Toronto", year: 2023, month: 4, totalStarts: 170, totalCompletions: 145 },
        { city: "Toronto", year: 2023, month: 5, totalStarts: 165, totalCompletions: 150 },
        { city: "Toronto", year: 2023, month: 6, totalStarts: 175, totalCompletions: 155 }
    ];

    useEffect(() => {
        if (!mockData || mockData.length === 0) {
            console.warn("No mock data available.");
            return;
        }

        // Convert year and month into a time label (YYYY-MM format) with locale-aware sorting
        const timeLabels = [...new Set(
            mockData.map(entry => `${entry.year}-${String(entry.month).padStart(2, '0')}`)
        )].sort((a, b) => a.localeCompare(b)); // ✅ FIX: Uses `localeCompare()` for sorting

        // Function to find entry by city and date
        const findEntryByDate = (city: string, date: string) => {
            return mockData.find(item =>
                item.city === city &&
                `${item.year}-${String(item.month).padStart(2, '0')}` === date
            ) || null;
        };

        // Function to filter data by city
        const getCityData = (city: string, key: 'totalStarts' | 'totalCompletions') => {
            return timeLabels.map(date => {
                const entry = findEntryByDate(city, date);
                return entry ? entry[key] : 0;
            });
        };

        const hamiltonStarts = getCityData("Hamilton", "totalStarts");
        const hamiltonCompletions = getCityData("Hamilton", "totalCompletions");
        const torontoStarts = getCityData("Toronto", "totalStarts");
        const torontoCompletions = getCityData("Toronto", "totalCompletions");

        setChartData({
            labels: timeLabels,
            datasets: [
                {
                    label: 'Hamilton - Total Starts',
                    data: hamiltonStarts,
                    backgroundColor: 'rgba(0, 123, 255, 0.6)',
                },
                {
                    label: 'Hamilton - Total Completions',
                    data: hamiltonCompletions,
                    backgroundColor: 'rgba(0, 123, 255, 1)',
                },
                {
                    label: 'Toronto - Total Starts',
                    data: torontoStarts,
                    backgroundColor: 'rgba(0, 200, 0, 0.6)',
                },
                {
                    label: 'Toronto - Total Completions',
                    data: torontoCompletions,
                    backgroundColor: 'rgba(0, 200, 0, 1)',
                }
            ],
        });
    }, []);

    return (
        <section style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '30px',
            fontFamily: 'Arial, sans-serif',
            color: '#f4f4f4',
            backgroundColor: '#1c1c1c',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
        }}>
            <h1 style={{
                textAlign: 'center',
                fontSize: '2.5rem',
                marginBottom: '20px',
                color: '#FFD700',
            }}>
                Housing Starts and Completions (Hamilton vs Toronto) - Monthly
            </h1>

            <div style={{ backgroundColor: '#2c2c2c', padding: '20px', borderRadius: '8px' }}>
                {chartData ? (
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: { stacked: false },
                                y: { stacked: false }
                            }
                        }}
                    />
                ) : (
                    <p>Loading chart data...</p>
                )}
            </div>
        </section>
    );
};

export default HousingStartsGraph;
