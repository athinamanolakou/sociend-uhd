import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"; // Needed for toHaveStyle, etc.
import {ThemeProvider} from "../ThemeContext";
import HousingCompletionRatio from "../components/HousingCompletionRatio";

/**
 * Mock ResizeObserver globally so that Chart.js doesn't crash in Jest + jsdom.
 * You can also place this in a jest.setup.js if you prefer.
 */
beforeAll(() => {
  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }
  // @ts-ignore
  global.ResizeObserver = ResizeObserver;
});

describe("HousingCompletionRatio Component", () => {
  it("renders the chart container and updates theme context without crashing", () => {
    // Render with a mock 'light' theme
    const {rerender} = render(
      <ThemeProvider value={{theme: "light"}}>
        <HousingCompletionRatio />
      </ThemeProvider>
    );

    // Check that the main container is in the DOM
    const container = screen.getByTestId("housing-completion-ratio");
    expect(container).toBeInTheDocument();

    // Optionally, check if chart data loaded (no "Loading..." text):
    expect(screen.queryByText(/Loading chart data/i)).not.toBeInTheDocument();

    // Re-render with a 'dark' theme
    rerender(
      <ThemeProvider value={{theme: "dark"}}>
        <HousingCompletionRatio />
      </ThemeProvider>
    );

    // Container should still be present
    expect(screen.getByTestId("housing-completion-ratio")).toBeInTheDocument();
    // The chart should render as well

    // If you want to test actual style changes, you must mock the CSS variables:
    document.documentElement.style.setProperty("--background-color", "#1c1c1c");
    // Then check (keeping in mind jsdom doesn't fully compute var() expressions)
    expect(container).toHaveStyle("background-color: var(--background-color)");
  });
});
