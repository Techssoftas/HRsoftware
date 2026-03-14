import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shiftReducer from "../Redux/Master/shiftSlice"
import designationsReducer from "../Redux/Master/designationSlice"
import employeeReducer from "../Redux/Employe/employeeSlice"
import sidebarReducer from "../core/redux/sidebarSlice";
import dailySalaryReducer from "../Redux/Salary/dailysalarySlice"
import advancesalaryReducer from "../Redux/Salary/advancesalarySlice"
import monthlysalaryReducer from "../Redux/Salary/monthlysalarySlice"

export const store = configureStore({
  reducer: {
    
    auth: authReducer,
    //MASTER
    shifts: shiftReducer,
    designations: designationsReducer,
    //employee details
    employees: employeeReducer,
    //salary
    dailySalary: dailySalaryReducer,
    advanceSalary: advancesalaryReducer,
    monthlySalary: monthlysalaryReducer,
    

},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});