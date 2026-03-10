import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shiftReducer from "../Redux/Master/shiftSlice"
import designationsReducer from "../Redux/Master/designationSlice"
import employeeReducer from "../Redux/Employe/employeeSlice"
import sidebarReducer from "../core/redux/sidebarSlice";

export const store = configureStore({
  reducer: {
    
    auth: authReducer,
    //MASTER
    shifts: shiftReducer,
    designations: designationsReducer,
    //employee details
    employees: employeeReducer,
    

},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});