import { render, screen } from "@testing-library/react";
import HousingCompletionRatio from "../components/HousingCompletionRatio";
import { ThemeProvider } from "../ThemeContext";

test("HousingCompletionRatio follows theme updates", () => {
  render(
    <ThemeProvider>
      <HousingCompletionRatio />
    </ThemeProvider>
  );

  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: white");

  document.documentElement.setAttribute("data-theme", "dark");
  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: #1c1c1c");
});
