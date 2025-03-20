import { render, screen } from "@testing-library/react";
import LabourMarketFamilyTypesHamilton from "../components/LabourMarketFamilyTypesHamilton";
import { ThemeProvider } from "../ThemeContext";

test("LabourMarketFamilyTypesHamilton follows theme updates", () => {
  render(
    <ThemeProvider>
      <LabourMarketFamilyTypesHamilton />
    </ThemeProvider>
  );

  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: white");

  document.documentElement.setAttribute("data-theme", "dark");
  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: #1c1c1c");
});
