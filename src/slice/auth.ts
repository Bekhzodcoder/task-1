import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../types/type";

const initialState: AuthState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: JSON.parse(sessionStorage.getItem("token") || "null"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserStart: (state) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      const userData = action.payload;

      if (userData) {
        state.loggedIn = true;
        state.isLoading = false;
        state.user = userData;
        sessionStorage.setItem("token", JSON.stringify(userData));
      } else {
        console.error("Invalid response structure:", action.payload);
      }
    },
    loginUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loggedIn = false;
      sessionStorage.removeItem("token");
    },
  },
});

export const { loginUserStart, loginUserSuccess, loginUserFailure, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
