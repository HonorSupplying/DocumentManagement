// ThemeContext.js
import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme or default to dark mode
    return localStorage.getItem("theme") === "light" ? false : true;
  });

  useEffect(() => {
    // Save the selected theme to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    // Apply the theme to the document body
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
