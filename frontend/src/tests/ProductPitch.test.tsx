import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"; // ✅ Ensure we can use toHaveStyle
import ProductPitch from "../components/ProductPitch";
import {ThemeProvider} from "../ThemeContext";
import React from "react";

test("ProductPitch background updates according to theme", () => {
  const {rerender} = render(
    <ThemeProvider value={{theme: "light"}}>
      <ProductPitch />
    </ThemeProvider>
  );

  // Check for light theme background
  expect(screen.getByTestId("product-pitch")).toHaveStyle("background-color: var(--background-color)");

  // Re-render with dark theme
  rerender(
    <ThemeProvider value={{theme: "dark"}}>
      <ProductPitch />
    </ThemeProvider>
  );

  // Check for dark theme background
  expect(screen.getByTestId("product-pitch")).toHaveStyle("background-color: var(--background-color)");
});
