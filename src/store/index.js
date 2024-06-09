import { configureStore } from "@reduxjs/toolkit";
import { pexelsApiSlice } from "../features/photos/pexelsApiSlice";
import authReducer from "../features/auth/authSlice";
import favoritesReducer from "../features/favourites/favouritesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    [pexelsApiSlice.reducerPath]: pexelsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pexelsApiSlice.middleware),
});

export default store;
