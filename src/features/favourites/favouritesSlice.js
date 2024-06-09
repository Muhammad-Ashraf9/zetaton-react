import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      //check if the photo is already in the favourites array
      if (state.favourites.some((favourite) => favourite === action.payload)) {
        return;
      }
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        (favourite) => favourite.url !== action.payload.url
      );
    },
    clearFavourites: (state) => {
      state.favourites = [];
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
