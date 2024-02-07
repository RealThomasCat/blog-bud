import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  status: false, // User is not authenticated by default
  userData: null, // No user data by default
};

// To track the authentication state of the user, we can create a slice called authSlice.
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login action
    login: (state, action) => {
      state.status = true; // Set the status to true
      state.userData = action.payload.userData; // Set the user data
    },
    // Logout action
    logout: (state) => {
      state.status = false; // Set the status to false
      state.userData = null; // Clear the user data
    },
  },
});

// Export the actions
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
