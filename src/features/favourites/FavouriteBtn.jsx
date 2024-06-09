import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavourite as addFavouriteToDB } from "./favouritesService";
import { addFavourite } from "./favouritesSlice";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function FavouriteBtn({ item }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const favourites = useSelector((state) => state.favourites.favourites);
  console.log("favourites :>> ", favourites);
  console.log("item :>> ", item);

  const isFavourite = favourites.some((favourite) => favourite === item.url);
  console.log("isFavourite :>> ", isFavourite);

  const navigate = useNavigate();

  async function handleAddToFavorites() {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addFavouriteToDB(user.uid, item.url);
      dispatch(addFavourite(item.url));
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <IconButton
      sx={{ color: "white" }}
      aria-label={`star ${item.alt}`}
      onClick={handleAddToFavorites}
    >
      {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}
