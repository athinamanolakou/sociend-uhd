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

const HousingStartsToronto: React.FC = () => {
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
        {city: "Toronto", year: 2023, month: 1, totalStarts: 150, totalCompletions: 120},
        {city: "Toronto", year: 2023, month: 2, totalStarts: 160, totalCompletions: 130},
        {city: "Toronto", year: 2023, month: 3, totalStarts: 155, totalCompletions: 140},
        {city: "Toronto", year: 2023, month: 4, totalStarts: 170, totalCompletions: 145},
        {city: "Toronto", year: 2023, month: 5, totalStarts: 165, totalCompletions: 150},
        {city: "Toronto", year: 2023, month: 6, totalStarts: 175, totalCompletions: 155},
    ];

    useEffect(() => {
        const timeLabels = mockData.map(entry => `${entry.year}-${String(entry.month).padStart(2, '0')}`);
        const starts = mockData.map(entry => entry.totalStarts);
        const completions = mockData.map(entry => entry.totalCompletions);

        setChartData({
            labels: timeLabels,
            datasets: [
                {
                    label: 'Toronto - Total Starts',
                    data: starts,
                    backgroundColor: 'rgba(0, 200, 0, 0.6)',
                },
                {
                    label: 'Toronto - Total Completions',
                    data: completions,
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
                Housing Starts and Completions - Toronto
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

export default HousingStartsToronto;
