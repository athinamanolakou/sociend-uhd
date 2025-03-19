import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

interface NavbarProps {
  setPage: (page: "pitch" | "starts" | "labour") => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    console.error("ThemeContext is not available");
    return null; // Prevent crashes if ThemeContext isn't available
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "var(--background-color)" }}>
      <div>
        <button onClick={() => setPage("pitch")}>Product Pitch</button>
        <button onClick={() => setPage("starts")}>Starts & Completions</button>
        <button onClick={() => setPage("labour")}>Labour Market</button>
      </div>
      <button onClick={toggleTheme} style={{ padding: "8px 16px", borderRadius: "5px" }}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
