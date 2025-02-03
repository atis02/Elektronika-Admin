import React, { createContext, useContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "dark"; // Get theme from localStorage or default to light
  });

  useEffect(() => {
    localStorage.setItem("theme", mode); // Store the theme mode whenever it changes
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "dark" && {
        background: {
          //   default: "#1f1f1f",
          default: "#1e2128",
          paper: "#1e1e1e",
        },
        text: {
          primary: "#ffffff",
        },
      }),
    },
  });

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
