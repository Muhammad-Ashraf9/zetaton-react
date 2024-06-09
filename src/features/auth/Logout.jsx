import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "./authService";
import { clearUser } from "./authSlice";

function Logout() {
  const dispatch = useDispatch();
  async function handleLogout() {
    try {
      await logout();
      dispatch(clearUser());
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
