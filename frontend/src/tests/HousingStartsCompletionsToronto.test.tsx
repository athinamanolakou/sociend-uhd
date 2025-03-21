import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import HousingStartsToronto from "../components/HousingStartsCompletionsToronto";
import {ThemeProvider} from "../ThemeContext";

/**
 * 1) Mock ResizeObserver so Chart.js doesn't crash in JSDOM.
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

describe("HousingStartsCompletionsToronto", () => {
  test("renders dark theme from localStorage", () => {
    // Force localStorage to return "dark"
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "dark"),
        setItem: jest.fn(),
      },
      writable: true,
    });

    // Render with real ThemeProvider
    render(
      <ThemeProvider>
        <HousingStartsToronto />
      </ThemeProvider>
    );

    // Should pick up "dark" from localStorage
    const container = screen.getByTestId("housing-starts-toronto");
    // Expect dark background
    expect(container).toHaveStyle("background-color: #1c1c1c");
  });

  test("renders light theme from localStorage", () => {
    // Force localStorage to return "light"
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "light"),
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <HousingStartsToronto />
      </ThemeProvider>
    );

    // Should pick up "light" from localStorage
    const container = screen.getByTestId("housing-starts-toronto");
    // Expect light background
    expect(container).toHaveStyle("background-color: #ffffff");
  });
});
