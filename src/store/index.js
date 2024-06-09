import { configureStore } from "@reduxjs/toolkit";
import { pexelsApiSlice } from "../features/photos/pexelsApiSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [pexelsApiSlice.reducerPath]: pexelsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pexelsApiSlice.middleware),
});

export default store;
