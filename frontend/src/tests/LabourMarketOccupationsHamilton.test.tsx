import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {ThemeProvider} from "../ThemeContext";
import LabourMarketHamilton from "../components/LabourMarketOccupationsHamilton";

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

describe("LabourMarketOccupationsHamilton", () => {
  test("renders in dark theme from localStorage", () => {
    // 2) Mock localStorage => "dark"
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "dark"),
        setItem: jest.fn(),
      },
      writable: true,
    });

    // 3) Render with the real ThemeProvider
    render(
      <ThemeProvider>
        <LabourMarketHamilton />
      </ThemeProvider>
    );

    // 4) Check container for dark background
    const container = screen.getByTestId("labour-occupations-hamilton");
    expect(container).toHaveStyle("background-color: #1c1c1c");
  });

  test("renders in light theme from localStorage", () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "light"),
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <LabourMarketHamilton />
      </ThemeProvider>
    );

    const container = screen.getByTestId("labour-occupations-hamilton");
    // Should have light background
    expect(container).toHaveStyle("background-color: #ffffff");
  });
});
