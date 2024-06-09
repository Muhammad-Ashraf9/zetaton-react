import { AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Zetaton</Typography>
      </Toolbar>

      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
    </AppBar>
  );
}

export default Navbar;
