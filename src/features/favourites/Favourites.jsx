import {
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { srcset } from "../../utils/srcset";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { removeFavourite } from "./favouritesSlice";

import CloseIcon from "@mui/icons-material/Close";
import { removeFavourite as removeFavouriteFromDB } from "./favouritesService";

export default function Favourites() {
  const user = useSelector((state) => state.auth.user);
  const favourites = useSelector((state) => state.favourites.favourites);
  const dispatch = useDispatch();

  async function handleRemove(favourite) {
    try {
      await removeFavouriteFromDB(user.uid, favourite);
      dispatch(removeFavourite(favourite));
    } catch (error) {
      console.error(error);
    }
  }
  if (!favourites.length) {
    return (
      <>
        <Typography variant="h1" align="center" color="primary">
          No favourites yet.
        </Typography>
        <Typography variant="h3" align="center" color="secondary">
          Please add some favourites.
        </Typography>
        <Link
          to="/"
          style={{ display: "block", textAlign: "center", marginTop: "20px" }}
        >
          <Button variant="contained" color="warning">
            Go back to Home
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={9} lg={6}>
          <ImageList
            sx={{
              //   Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
              transform: "translateZ(0)",
            }}
            gap={3}
          >
            {favourites.map((favourite) => (
              <ImageListItem key={favourite}>
                {/* <Typography key={favourite}>{favourite}</Typography> */}
                <img {...srcset(favourite, 250, 200)} alt="" loading="lazy" />

                <ImageListItemBar
                
                  position="top"
                  actionPosition="left"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`remove image ${favourite}`}
                      onClick={() => handleRemove(favourite)}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </>
  );
}
