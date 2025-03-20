import { render, screen } from "@testing-library/react";
import LabourMarketOccupationsToronto from "../components/LabourMarketOccupationsToronto";
import { ThemeProvider } from "../ThemeContext";

test("LabourMarketOccupationsToronto updates according to theme", () => {
  render(
    <ThemeProvider>
      <LabourMarketOccupationsToronto />
    </ThemeProvider>
  );

  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: white");

  document.documentElement.setAttribute("data-theme", "dark");
  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: #1c1c1c");
});
