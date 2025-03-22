import React, {createContext, useEffect, useState} from "react";

/** The shape of the data we store in ThemeContext. */
interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

/** Props for our custom ThemeProvider. */
interface ThemeProviderProps {
  children: React.ReactNode;
  /** Allows passing an initial theme in tests or anywhere else. */
  value?: {
    theme: string;
  };
}

/**
 * Create the ThemeContext with default values.
 */
export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => { },
});

/**
 * A custom ThemeProvider that:
 * 1) Uses an internal state for the current theme.
 * 2) Exposes `theme` and `toggleTheme`.
 * 3) Allows you to supply an initial theme via `value`.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({children, value}) => {
  // Start with either `value.theme` (if provided) or default to "light"
  const [theme, setTheme] = useState(value?.theme ?? "light");

  // Whenever `theme` changes, update the data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
