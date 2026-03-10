import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shiftReducer from "../Redux/Master/shiftSlice"

export const store = configureStore({
  reducer: {
    //MASTER

    auth: authReducer,
    shifts: shiftReducer,

},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});