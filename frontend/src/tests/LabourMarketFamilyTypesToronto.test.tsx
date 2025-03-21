import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {ThemeProvider} from "../ThemeContext";
import FamilyTypeToronto from "../components/LabourMarketFamilyTypesToronto";

beforeAll(() => {
  // 1) Mock ResizeObserver so Chart.js doesn't crash in JSDOM
  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }
  // @ts-ignore
  global.ResizeObserver = ResizeObserver;

  // 2) Mock 'window.crypto.getRandomValues'
  if (!window.crypto) {
    // @ts-ignore
    window.crypto = {};
  }
  if (!window.crypto.getRandomValues) {
    window.crypto.getRandomValues = (array: Uint32Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 2 ** 32);
      }
      return array;
    };
  }
});

describe("LabourMarketFamilyTypesToronto", () => {
  test("renders with dark theme from localStorage", () => {
    // 3) Force localStorage to return "dark"
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "dark"),
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <FamilyTypeToronto />
      </ThemeProvider>
    );

    const container = screen.getByTestId("family-types-toronto");
    // Should have dark background
    expect(container).toHaveStyle("background-color: #1c1c1c");
  });

  test("renders with light theme from localStorage", () => {
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
        <FamilyTypeToronto />
      </ThemeProvider>
    );

    const container = screen.getByTestId("family-types-toronto");
    // Should have light background
    expect(container).toHaveStyle("background-color: #ffffff");
  });
});
