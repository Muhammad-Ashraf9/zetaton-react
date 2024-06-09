/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addFavourite as addFavouriteToDB,
  removeFavourite as removeFavouriteFromDB,
} from "./favouritesService";
import { addFavourite, removeFavourite } from "./favouritesSlice";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function FavouriteBtn({ item }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const favourites = useSelector((state) => state.favourites.favourites);
  const isFavourite = favourites.some(
    (favourite) => favourite === item.src.original
  );

  const navigate = useNavigate();

  async function handleFavouriteClick() {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (isFavourite) {
        // remove from favourites
        await removeFavouriteFromDB(user.uid, item.src.original);
        dispatch(removeFavourite(item.src.original));
        return;
      }
      await addFavouriteToDB(user.uid, item.src.original);
      dispatch(addFavourite(item.src.original));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <IconButton
      sx={{ color: "white" }}
      aria-label={`star ${item.alt}`}
      onClick={handleFavouriteClick}
    >
      {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}
