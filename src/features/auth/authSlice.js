import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import store from "../../store";

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(setUser(user));
  } else {
    store.dispatch(setUser(null));
  }
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
