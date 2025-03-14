import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
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

const HousingStartsHamilton: React.FC = () => {
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
        {city: "Hamilton", year: 2023, month: 1, totalStarts: 100, totalCompletions: 80},
        {city: "Hamilton", year: 2023, month: 2, totalStarts: 120, totalCompletions: 90},
        {city: "Hamilton", year: 2023, month: 3, totalStarts: 110, totalCompletions: 95},
        {city: "Hamilton", year: 2023, month: 4, totalStarts: 130, totalCompletions: 100},
        {city: "Hamilton", year: 2023, month: 5, totalStarts: 115, totalCompletions: 105},
        {city: "Hamilton", year: 2023, month: 6, totalStarts: 125, totalCompletions: 110},
    ];

    useEffect(() => {
        const timeLabels = mockData.map(entry => `${entry.year}-${String(entry.month).padStart(2, '0')}`);
        const starts = mockData.map(entry => entry.totalStarts);
        const completions = mockData.map(entry => entry.totalCompletions);

        setChartData({
            labels: timeLabels,
            datasets: [
                {
                    label: 'Hamilton - Total Starts',
                    data: starts,
                    backgroundColor: 'rgba(0, 123, 255, 0.6)',
                },
                {
                    label: 'Hamilton - Total Completions',
                    data: completions,
                    backgroundColor: 'rgba(0, 123, 255, 1)',
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
                Housing Starts and Completions - Hamilton
            </h1>

            <div style={{backgroundColor: '#2c2c2c', padding: '20px', borderRadius: '8px'}}>
                {chartData ? (
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                x: {stacked: false},
                                y: {stacked: false}
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

export default HousingStartsHamilton;
