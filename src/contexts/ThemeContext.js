import React, { createContext, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
export const ThemeContext = createContext();
const ThemeContextProvider = () => {
  const [isDarkMode, SetIsDarkMode] = useState(false);

  return (
    <ThemeContextProvider
      value={{ ...SetIsDarkMode, ...isDarkMode }}
    ></ThemeContextProvider>
  );
};

export default ThemeContextProvider;
