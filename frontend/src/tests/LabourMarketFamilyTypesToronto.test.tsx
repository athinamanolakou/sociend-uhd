import { render, screen } from "@testing-library/react";
import LabourMarketFamilyTypesToronto from "../components/LabourMarketFamilyTypesToronto";
import { ThemeProvider } from "../ThemeContext";

test("LabourMarketFamilyTypesToronto follows theme updates", () => {
  render(
    <ThemeProvider>
      <LabourMarketFamilyTypesToronto />
    </ThemeProvider>
  );

  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: white");

  document.documentElement.setAttribute("data-theme", "dark");
  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: #1c1c1c");
});
