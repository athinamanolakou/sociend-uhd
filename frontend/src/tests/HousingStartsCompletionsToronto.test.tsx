import { render, screen } from "@testing-library/react";
import HousingStartsCompletionsToronto from "../components/HousingStartsCompletionsToronto";
import { ThemeProvider } from "../ThemeContext";

test("HousingStartsCompletionsToronto updates based on theme", () => {
  render(
    <ThemeProvider>
      <HousingStartsCompletionsToronto />
    </ThemeProvider>
  );

  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: white");

  document.documentElement.setAttribute("data-theme", "dark");
  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: #1c1c1c");
});
