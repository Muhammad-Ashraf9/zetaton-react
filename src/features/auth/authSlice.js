import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import store from "../../store";
import { fetchFavourites } from "../favourites/favouritesService";
import { addFavourite, clearFavourites } from "../favourites/favouritesSlice";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    store.dispatch(setUser(user));
    const favourites = await fetchFavourites(user.uid);

    favourites.forEach((favourite) => {
      store.dispatch(addFavourite(favourite));
    });
  } else {
    store.dispatch(clearUser());
    store.dispatch(clearFavourites());
  }
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
