import { configureStore } from "@reduxjs/toolkit";
import weatherApiReducer from "./witherApiSlice"; // Replace with the correct path to your reducer

const store = configureStore({
  reducer: {
    weatherApi: weatherApiReducer, // Replace with the correct slice name
  },
});

export default store;

// ./witherApiSlice
