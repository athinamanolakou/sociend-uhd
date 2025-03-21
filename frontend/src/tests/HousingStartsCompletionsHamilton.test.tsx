import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"; // For toHaveStyle, etc.
import HousingStartsHamilton from "../components/HousingStartsCompletionsHamilton";
import {ThemeProvider} from "../ThemeContext";

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

describe("HousingStartsCompletionsHamilton", () => {
  test("renders with dark theme from localStorage", () => {
    // 2) Force localStorage to always return "dark" for 'theme'
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "dark"),   // pretend stored theme is "dark"
        setItem: jest.fn(),
      },
      writable: true,
    });

    // 3) Render with the real ThemeProvider (it will read localStorage => "dark")
    render(
      <ThemeProvider>
        <HousingStartsHamilton />
      </ThemeProvider>
    );

    // 4) The container should have a dark background
    const container = screen.getByTestId("housing-starts-hamilton");
    expect(container).toHaveStyle("background-color: #1c1c1c");
  });

  test("renders with light theme from localStorage", () => {
    // Force localStorage to always return "light"
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "light"),  // pretend stored theme is "light"
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <HousingStartsHamilton />
      </ThemeProvider>
    );

    const container = screen.getByTestId("housing-starts-hamilton");
    expect(container).toHaveStyle("background-color: #ffffff");
  });
});
