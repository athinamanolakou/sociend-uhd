import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const ProductPitch: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        color: "var(--text-color)", // Use theme color
        backgroundColor: "var(--background-color)", // Use theme background
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "left",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "var(--text-color)", // Title follows text color
        }}
      >
        Urban Housing Demand in Hamilton vs. Toronto
      </h1>

      <p style={{ lineHeight: "1.8", fontSize: "1.2rem", marginBottom: "20px", textAlign: "center" }}>
        This project aims to analyze the differences in housing requirements for various demographic groups
        (singles, families, single-income households, unemployed individuals) and compare them with actual housing
        developments in Hamilton and Toronto. Our goal is to guide real estate investors and developers in making
        data-driven decisions by identifying gaps between housing demand and supply.
      </p>

      {/* Themed Section */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "var(--button-bg)", // Background follows theme
          borderRadius: "8px",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            color: "var(--text-color)", // Follows theme text color
            marginBottom: "15px",
          }}
        >
          Key Objectives
        </h2>
        <ul style={{ lineHeight: "1.8", fontSize: "1.1rem", marginLeft: "20px" }}>
          <li>Integrate and analyze housing and employment data specific to Hamilton and Toronto.</li>
          <li>Identify gaps between housing demand and supply for various demographic groups.</li>
          <li>Develop intuitive visual tools to assist stakeholders in making informed decisions.</li>
        </ul>
      </div>

      {/* Another Themed Section */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "var(--button-bg)", // Background changes with theme
          borderRadius: "8px",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            color: "var(--text-color)", // Follow text theme color
            marginBottom: "15px",
          }}
        >
          Our Approach
        </h2>
        <p style={{ lineHeight: "1.8", fontSize: "1.1rem", marginBottom: "15px" }}>
          By analyzing housing data, employment statistics, and demographic trends, we aim to provide actionable insights
          for real estate investors, developers, and policymakers. Our visual tools, including interactive charts and
          graphs, make it easy to understand complex data and identify opportunities in the housing market.
        </p>
        <p style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
          With a focus on Hamilton and Toronto, we target diverse demographic groups, ensuring housing developments
          meet the needs of singles, families, and underrepresented populations.
        </p>
      </div>
    </section>
  );
};

export default ProductPitch;
