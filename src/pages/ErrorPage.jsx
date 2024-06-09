import {  Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <Typography variant="h1" align="center" color="primary">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="h3" align="center" color="secondary">
        Please try again later.
      </Typography>
      <Link
        to="/"
        style={{ display: "block", textAlign: "center", marginTop: "20px" }}
      >
        <Button variant="contained" color="primary">
          Go back to Home
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
