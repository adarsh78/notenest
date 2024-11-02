import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {

  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("darkTheme");
    return savedTheme === "true" || false;
});

const handleDarkMode = () => {
    setDarkTheme(true);
    localStorage.setItem("darkTheme", "true");
};

const handleLightMode = () => {
    setDarkTheme(false);
    localStorage.setItem("darkTheme", "false");
};

// Apply the stored theme on mount
useEffect(() => {
    const savedTheme = localStorage.getItem("darkTheme");
    if (savedTheme === "true") {
        setDarkTheme(true);
    }
}, []);


  return (
    <ThemeContext.Provider value={{ handleDarkMode, handleLightMode, darkTheme }}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider