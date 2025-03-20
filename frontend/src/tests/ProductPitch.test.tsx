import { render, screen } from "@testing-library/react";
import ProductPitch from "../components/ProductPitch";
import { ThemeProvider } from "../ThemeContext";

test("ProductPitch background updates according to theme", () => {
  render(
    <ThemeProvider>
      <ProductPitch />
    </ThemeProvider>
  );

  // Check for light theme background
  expect(screen.getByTestId("product-pitch")).toHaveStyle("background-color: white");

  // Change to dark theme and check background color
  document.documentElement.setAttribute("data-theme", "dark");
  expect(screen.getByTestId("product-pitch")).toHaveStyle("background-color: #1c1c1c");
});
