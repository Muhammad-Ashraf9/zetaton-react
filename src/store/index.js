import { configureStore } from "@reduxjs/toolkit";
import { pexelsApiSlice } from "../features/photos/pexelsApiSlice";
import authReducer from "../features/auth/authSlice";
import favouritesReducer from "../features/favourites/favouritesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favourites: favouritesReducer,
    [pexelsApiSlice.reducerPath]: pexelsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pexelsApiSlice.middleware),
});

export default store;
