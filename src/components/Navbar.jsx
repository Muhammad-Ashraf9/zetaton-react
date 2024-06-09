import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";

const style = {
  color: "white",
  textDecoration: "none",
};

function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="error" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Zetaton
          </Typography>
          <Button color="inherit">
            <NavLink to="/login" style={style}>
              Login
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink to="/signup" style={style}>
              Signup
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
