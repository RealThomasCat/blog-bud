import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

// Create a store using the configureStore function
const store = configureStore({
  reducer: {
    auth: {
      auth: authSlice,
    },
  },
});

export default store;
