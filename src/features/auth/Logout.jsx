import { Button } from "@mui/material";
import { logout } from "./authService";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logout();
      navigate("/");
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
