import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HousingGraph: React.FC = () => {
    interface ChartData {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string;
            backgroundColor: string;
        }[];
    }

    const [chartData, setChartData] = useState<ChartData | null>(null);

    // Mock Data
    const mockData = [
        {city: "Hamilton", year: 2023, month: 1, ratio: 0.75},
        {city: "Hamilton", year: 2023, month: 2, ratio: 0.80},
        {city: "Hamilton", year: 2023, month: 3, ratio: 0.85},
        {city: "Hamilton", year: 2023, month: 4, ratio: 0.78},
        {city: "Hamilton", year: 2023, month: 5, ratio: 0.82},
        {city: "Hamilton", year: 2023, month: 6, ratio: 0.88},
        {city: "Toronto", year: 2023, month: 1, ratio: 0.70},
        {city: "Toronto", year: 2023, month: 2, ratio: 0.72},
        {city: "Toronto", year: 2023, month: 3, ratio: 0.76},
        {city: "Toronto", year: 2023, month: 4, ratio: 0.74},
        {city: "Toronto", year: 2023, month: 5, ratio: 0.78},
        {city: "Toronto", year: 2023, month: 6, ratio: 0.81}
    ];

    useEffect(() => {
        // Process mock data instead of fetching from API
        if (!mockData || mockData.length === 0) {
            console.warn("No mock data available.");
            return;
        }

        // Convert year and month into a time label (YYYY-MM format)
        const timeLabels = [...new Set(
            mockData.map(entry => `${entry.year}-${String(entry.month).padStart(2, '0')}`)
        )].sort();

        const getCityCompletionRates = (city: string) => {
            return timeLabels.map(date => {
                const entry = mockData.find(item =>
                    item.city === city &&
                    `${item.year}-${String(item.month).padStart(2, '0')}` === date
                );
                return entry ? entry.ratio * 100 : 0; // Convert to percentage
            });
        };

        const hamiltonCompletionRate = getCityCompletionRates("Hamilton");
        const torontoCompletionRate = getCityCompletionRates("Toronto");

        setChartData({
            labels: timeLabels,
            datasets: [
                {
                    label: 'Hamilton Completion Rate (%)',
                    data: hamiltonCompletionRate,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                },
                {
                    label: 'Toronto Completion Rate (%)',
                    data: torontoCompletionRate,
                    borderColor: 'rgba(255,99,132,1)',
                    backgroundColor: 'rgba(255,99,132,0.2)',
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
                Housing Completion Rate (Hamilton vs Toronto) - Monthly
            </h1>

            <div style={{backgroundColor: '#2c2c2c', padding: '20px', borderRadius: '8px'}}>
                {chartData ? (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false
                        }}
                    />
                ) : (
                    <p>Loading chart data...</p>
                )}
            </div>
        </section>
    );
};

export default HousingGraph;
