import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import {getAllHousingStartsCompletions} from '../services/housingService';
import {HousingStartsCompletions} from '../types/Housing';

// 🔹 Fix: Register CategoryScale for x-axis (labels like "YYYY-MM")
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

    useEffect(() => {
        console.log("Fetching starts and completions data for graph...");

        getAllHousingStartsCompletions().then(data => {
            if (!data || data.length === 0) {
                console.warn("No data received from API.");
                return;
            }

            console.log("Received data:", data);

            // Convert year and month into a time label (YYYY-MM format)
            const timeLabels = [...new Set(
                data.map((entry: HousingStartsCompletions) =>
                    `${entry.year}-${String(entry.month).padStart(2, '0')}`
                )
            )].sort();

            const calculateCompletionRate = (city: string) => {
                return timeLabels.map(date => {
                    const entry = data.find((item: HousingStartsCompletions) =>
                        item.city === city &&
                        `${item.year}-${String(item.month).padStart(2, '0')}` === date
                    );

                    return entry && entry.totalStarts > 0
                        ? (entry.totalComplete / entry.totalStarts) * 100
                        : 0;
                });
            };

            const hamiltonCompletionRate = calculateCompletionRate("Hamilton");
            const torontoCompletionRate = calculateCompletionRate("Toronto");

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
        }).catch(error => {
            console.error('Error fetching or processing housing data:', error);
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
