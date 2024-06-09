import { Button } from "@mui/material";
import { logout } from "./authService";

function Logout() {
  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
