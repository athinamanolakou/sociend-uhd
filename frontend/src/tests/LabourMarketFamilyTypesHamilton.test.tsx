import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {ThemeProvider} from "../ThemeContext";
import FamilyTypeHamilton from "../components/LabourMarketFamilyTypesHamilton";

beforeAll(() => {
  // 1) Mock ResizeObserver so Chart.js doesn't crash in JSDOM
  class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }
  // @ts-ignore
  global.ResizeObserver = ResizeObserver;

  // 2) Mock 'window.crypto.getRandomValues' with a generic signature
  if (!window.crypto) {
    // @ts-ignore
    window.crypto = {};
  }

  // if (!window.crypto.getRandomValues) {
  window.crypto.getRandomValues = <T extends ArrayBufferView | null>(array: T): T => {
    if (array === null) {
      return array;
    }

    // Convert the provided ArrayBufferView into a Uint8Array,
    // using the same underlying buffer, offset, and length in bytes
    const typedArray = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);

    // Randomize each byte
    for (let i = 0; i < typedArray.length; i++) {
      typedArray[i] = Math.floor(Math.random() * 256);
    }

    // Return the original array (still referencing the same buffer)
    return array;
  };

});

describe("LabourMarketFamilyTypesHamilton", () => {
  test("renders with dark theme from localStorage", () => {
    // 3) Mock localStorage to return "dark"
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "dark"),
        setItem: jest.fn(),
      },
      writable: true,
    });

    // 4) Render with the real ThemeProvider
    render(
      <ThemeProvider>
        <FamilyTypeHamilton />
      </ThemeProvider>
    );

    // 5) container => test ID from the component
    const container = screen.getByTestId("family-type-hamilton");

    // Should be dark background
    expect(container).toHaveStyle("background-color: #1c1c1c");
  });

  test("renders with light theme from localStorage", () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "light"),
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(
      <ThemeProvider>
        <FamilyTypeHamilton />
      </ThemeProvider>
    );

    const container = screen.getByTestId("family-type-hamilton");
    // Should be light background
    expect(container).toHaveStyle("background-color: #ffffff");
  });
});
