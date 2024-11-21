import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import noteSlice from "./Slices/noteSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    note: noteSlice,
  },
});

export default store;
