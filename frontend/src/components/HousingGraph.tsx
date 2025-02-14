import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
import {getHousingDataByType} from '../services/housingService';

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
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        console.log("Attempting to fetch data from API...");
        getHousingDataByType("Single Family")
            .then(data => {
                console.log('Fetched Housing Data:', data);

                // Generate a unique sorted list of time labels (YYYY-MM format)
                const timeLabels = [...new Set(
                    data.map((entry: any) => `${entry.year}-${String(entry.month).padStart(2, '0')}`)
                )].sort();

                // Get Hamilton's completion rate per month
                const hamiltonCompletionRate = timeLabels.map(date => {
                    const entry = data.find((item: any) =>
                        item.city === 'Hamilton' && `${item.year}-${String(item.month).padStart(2, '0')}` === date
                    );
                    return entry && entry.singlesStarts > 0
                        ? (entry.singlesComplete / entry.singlesStarts) * 100
                        : 0;
                });

                // Get Toronto's completion rate per month
                const torontoCompletionRate = timeLabels.map(date => {
                    const entry = data.find((item: any) =>
                        item.city === 'Toronto' && `${item.year}-${String(item.month).padStart(2, '0')}` === date
                    );
                    return entry && entry.singlesStarts > 0
                        ? (entry.singlesComplete / entry.singlesStarts) * 100
                        : 0;
                });

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
            })
            .catch(error => console.error('Error fetching housing data:', error));
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
                    <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}} />
                ) : (
                    <p>Loading chart data...</p>
                )}
            </div>
        </section>
    );
};

export default HousingGraph;
