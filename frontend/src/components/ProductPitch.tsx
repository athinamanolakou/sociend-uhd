import React from 'react';

const ProductPitch: React.FC = () => {
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
            textAlign: 'left',
        }}>
            <h1 style={{
                textAlign: 'center',
                fontSize: '2.5rem',
                marginBottom: '20px',
                color: '#FFD700',
            }}>
                Urban Housing Demand in Hamilton vs. Toronto
            </h1>

            <h2 style={{
                fontSize: '1.8rem',
                borderBottom: '2px solid #FFD700',
                paddingBottom: '5px',
                marginBottom: '15px',
            }}>Project Overview</h2>
            <p style={{lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '20px'}}>
                This project aims to analyze the differences in housing requirements for various demographic groups
                (singles, families, single-income households, unemployed individuals) and compare them with actual housing
                developments in Hamilton and Toronto. The findings will guide real estate investors by providing insights into
                how well housing developments meet the evolving needs of these groups.
            </p>

            <h2 style={{
                fontSize: '1.8rem',
                borderBottom: '2px solid #FFD700',
                paddingBottom: '5px',
                marginBottom: '15px',
            }}>Epics</h2>

            <div style={{marginBottom: '25px'}}>
                <h3 style={{fontSize: '1.5rem', color: '#FFD700', marginBottom: '10px'}}>1. Data Integration and Analysis Framework</h3>
                <p style={{lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '15px'}}>
                    <strong>Goal:</strong> Develop a robust framework for integrating and analyzing housing and employment data
                    specific to Hamilton and Toronto.
                </p>
                <p style={{lineHeight: '1.8', fontSize: '1.1rem'}}>
                    This involves establishing data pipelines from multiple sources, ensuring data quality, and setting up a
                    foundational analysis environment for further studies.
                </p>
            </div>

            <div style={{marginBottom: '25px'}}>
                <h3 style={{fontSize: '1.5rem', color: '#FFD700', marginBottom: '10px'}}>2. Demographic and Housing Needs Analysis</h3>
                <p style={{lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '15px'}}>
                    <strong>Goal:</strong> Analyze housing demands versus supply for different demographic groups in Hamilton and Toronto.
                </p>
                <p style={{lineHeight: '1.8', fontSize: '1.1rem'}}>
                    This focuses on identifying and comparing the housing needs of various demographic groups (singles, families,
                    single-income households, unemployed) against actual housing starts and completions.
                    The analysis will help pinpoint discrepancies and opportunities to aid targeted real estate development and investment strategies.
                </p>
            </div>

            <div style={{marginBottom: '25px'}}>
                <h3 style={{fontSize: '1.5rem', color: '#FFD700', marginBottom: '10px'}}>3. Visualization and Decision Support Tool Development</h3>
                <p style={{lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '15px'}}>
                    <strong>Goal:</strong> Create intuitive visual tools to represent housing data analysis and aid stakeholders in making informed decisions.
                </p>
                <p style={{lineHeight: '1.8', fontSize: '1.1rem'}}>
                    This will include interactive data visualizations like grouped stacked bar charts and sunburst charts,
                    making it easier for investors and policymakers to assess trends and align their strategies accordingly.
                </p>
            </div>

            <h2 style={{
                fontSize: '1.8rem',
                borderBottom: '2px solid #FFD700',
                paddingBottom: '5px',
                marginBottom: '15px',
            }}>Target Persona: David Martinez</h2>

            <div style={{marginBottom: '15px', paddingLeft: '20px'}}>
                <h3 style={{fontSize: '1.3rem', marginBottom: '10px'}}>Background:</h3>
                <ul style={{lineHeight: '1.8', fontSize: '1.1rem', marginLeft: '20px'}}>
                    <li><strong>Age:</strong> 35</li>
                    <li><strong>Occupation:</strong> Real Estate Investment Analyst</li>
                    <li><strong>Location:</strong> Toronto, Ontario</li>
                    <li><strong>Education:</strong> Master’s Degree in Urban Planning and Development</li>
                </ul>
            </div>

            <div style={{marginBottom: '15px', paddingLeft: '20px'}}>
                <h3 style={{fontSize: '1.3rem', marginBottom: '10px'}}>Demographics:</h3>
                <ul style={{lineHeight: '1.8', fontSize: '1.1rem', marginLeft: '20px'}}>
                    <li><strong>Family Status:</strong> Married, planning to start a family</li>
                    <li><strong>Income:</strong> Upper middle class</li>
                </ul>
            </div>

            <div style={{marginBottom: '15px', paddingLeft: '20px'}}>
                <h3 style={{fontSize: '1.3rem', marginBottom: '10px'}}>Behavioral Traits:</h3>
                <ul style={{lineHeight: '1.8', fontSize: '1.1rem', marginLeft: '20px'}}>
                    <li><strong>Tech-savvy:</strong> Comfortable using advanced data analysis tools and platforms.</li>
                    <li><strong>Detail-oriented:</strong> Focuses on precision and accuracy in data and reports.</li>
                    <li><strong>Proactive:</strong> Always looking for new investment opportunities and ways to optimize portfolio performance.</li>
                </ul>
            </div>
        </section>
    );
};

export default ProductPitch;
