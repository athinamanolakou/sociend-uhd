import { render, screen } from "@testing-library/react";
import HousingStartsCompletionsHamilton from "../components/HousingStartsCompletionsHamilton";
import { ThemeProvider } from "../ThemeContext";

test("HousingStartsCompletionsHamilton updates based on theme", () => {
  render(
    <ThemeProvider>
      <HousingStartsCompletionsHamilton />
    </ThemeProvider>
  );

  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: white");

  document.documentElement.setAttribute("data-theme", "dark");
  expect(screen.getByTestId("chart-container")).toHaveStyle("background-color: #1c1c1c");
});
