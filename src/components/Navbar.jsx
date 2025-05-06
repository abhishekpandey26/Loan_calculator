import React from "react";
import { AppBar, Toolbar, Typography, Button, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";

const Navbar = () => {
  const { darkMode, setDarkMode } = useGlobalContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Loan App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/exchange">
          Exchange
        </Button>
        <Button color="inherit" component={Link} to="/error_page">Error Page</Button>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="default"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
