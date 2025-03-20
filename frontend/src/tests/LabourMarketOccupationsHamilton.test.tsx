import { render, screen } from "@testing-library/react";
import LabourMarketOccupationsHamilton from "../components/LabourMarketOccupationsHamilton";
import { ThemeProvider } from "../ThemeContext";

test("LabourMarketOccupationsHamilton updates according to theme", () => {
  render(
    <ThemeProvider>
      <LabourMarketOccupationsHamilton />
    </ThemeProvider>
  );

  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: white");

  document.documentElement.setAttribute("data-theme", "dark");
  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: #1c1c1c");
});
