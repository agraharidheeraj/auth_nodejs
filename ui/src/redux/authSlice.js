import  { createSlice } from "@reduxjs/toolkit";
import { isTokenPresent } from "./authToken";

const initialState = {
  user: null,
  isAuthenticated: isTokenPresent(),
  loading: false,
  isVerified: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action) {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.isVerified = user.isVerified;
       state.loading = false;
    },
    verifyOtpSuccess(state) {
      state.isVerified = true;
      if (state.user) {
        state.user.isVerified = true;
      }
    },
    authFailure(state, action) {
        state.error = action.payload;
        state.loading= false;
    },
    logoutSuccess(state){
        state.user=null;
        state.isAuthenticated=false;
    }
  },
});

export const {authFailure,authRequest,authSuccess,logoutSuccess,verifyOtpSuccess}= authSlice.actions;
export default authSlice.reducer;