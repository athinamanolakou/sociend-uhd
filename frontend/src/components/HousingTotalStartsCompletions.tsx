import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getHousingTotalStartsCompletions } from '../services/housingService';

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

    useEffect(() => {
        getHousingTotalStartsCompletions().then(data => {
            if (!data || data.length === 0) {
                console.warn("No data received from API.");
                return;
            }

            // Convert year and month into a time label (YYYY-MM format)
            const timeLabels = [...new Set(
                data.map(entry => `${entry.year}-${String(entry.month).padStart(2, '0')}`)
            )].sort();

            // Function to filter data by city
            const getCityData = (city: string, key: 'totalStarts' | 'totalCompletions') => {
                return timeLabels.map(date => {
                    const entry = data.find(item => 
                        item.city === city &&
                        `${item.year}-${String(item.month).padStart(2, '0')}` === date
                    );
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
                        backgroundColor: 'rgba(0, 123, 255, 0.6)', // 🔵 Blue for Hamilton Starts
                    },
                    {
                        label: 'Hamilton - Total Completions',
                        data: hamiltonCompletions,
                        backgroundColor: 'rgba(0, 123, 255, 1)', // 🔵 Darker Blue for Hamilton Completions
                    },
                    {
                        label: 'Toronto - Total Starts',
                        data: torontoStarts,
                        backgroundColor: 'rgba(0, 200, 0, 0.6)', // 🟢 Green for Toronto Starts
                    },
                    {
                        label: 'Toronto - Total Completions',
                        data: torontoCompletions,
                        backgroundColor: 'rgba(0, 200, 0, 1)', // 🟢 Darker Green for Toronto Completions
                    }
                ],
            });                        
        }).catch(error => {
            console.error('Error fetching housing starts and completions:', error);
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
