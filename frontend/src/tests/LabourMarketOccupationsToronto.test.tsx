import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {ThemeProvider} from "../ThemeContext";
import LabourMarketToronto from "../components/LabourMarketOccupationsToronto";

/**
 * 1) Mock ResizeObserver so Chart.js doesn't crash in JSDOM
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

describe("LabourMarketOccupationsToronto", () => {
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
        <LabourMarketToronto />
      </ThemeProvider>
    );

    // 4) Check container for dark background
    const container = screen.getByTestId("labour-occupations-toronto");
    expect(container).toHaveStyle("background-color: #1c1c1c");
  });

  test("renders in light theme from localStorage", () => {
    // Return "light"
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "light"),
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <LabourMarketToronto />
      </ThemeProvider>
    );

    const container = screen.getByTestId("labour-occupations-toronto");
    // Should have light background
    expect(container).toHaveStyle("background-color: #ffffff");
  });
});
