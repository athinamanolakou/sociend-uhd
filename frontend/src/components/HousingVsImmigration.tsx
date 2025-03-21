import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const HousingVsImmigration: React.FC = () => {
    // using mock data temporarily 
    const mockHousingData = [
        { year: 2020, month: 1, totalStarts: 120 },
        { year: 2020, month: 2, totalStarts: 135 },
        { year: 2020, month: 3, totalStarts: 150 },
        { year: 2020, month: 4, totalStarts: 165 },
        { year: 2020, month: 5, totalStarts: 180 },
    ];

    const mockImmigrationData = [
        { year: 2020, month: 1, total_immigrants: 80 },
        { year: 2020, month: 2, total_immigrants: 95 },
        { year: 2020, month: 3, total_immigrants: 110 },
        { year: 2020, month: 4, total_immigrants: 125 },
        { year: 2020, month: 5, total_immigrants: 140 },
    ];

    const chartData = {
        labels: mockHousingData.map((e) => `${e.year}-${e.month}`),
        datasets: [
            {
                label: "Housing Starts",
                data: mockHousingData.map((e) => e.totalStarts),
                borderColor: "pink",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
            },
            {
                label: "Total Immigrants",
                data: mockImmigrationData.map((e) => e.total_immigrants),
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
            }
        ]
    };

    return (
        <section
            style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "30px",
                fontFamily: "Arial, sans-serif",
                color: "var(--text-color)",
                backgroundColor: "var(--background-color)",
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
                    color: "var(--text-color)",
                }}
            >
                Comparing Housing and Labour Data
            </h1>

            <p style={{ lineHeight: "1.8", fontSize: "1.2rem", marginBottom: "20px" }}>
                This page compares housing starts with labour market data to analyze housing demand.
            </p>

            <div style={{ height: "400px" }}>
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </section>
    );
};

export default HousingVsImmigration;
