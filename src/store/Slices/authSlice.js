import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuth: false, token: "", email: "" },
  reducers: {
    loginHandler(state, action) {
      state.isAuth = !!action.payload.token;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logoutHandler(state) {
      state.isAuth = false;
      state.token = "";
      state.email = "";
    },
  },
});

export const { loginHandler, logoutHandler } = authSlice.actions;

export default authSlice.reducer;
