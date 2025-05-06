import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ExchangeRates from "./pages/ExchangeRates.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/Navbar.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { useGlobalContext } from "./context/GlobalContext.jsx";

function App() {
  const { darkMode } = useGlobalContext();
  const theme = createTheme({ palette: { mode: darkMode ? "dark" : "light" } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/exchange" element={<ExchangeRates />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
