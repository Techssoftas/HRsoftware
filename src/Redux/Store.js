import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shiftReducer from "../Redux/Master/shiftSlice"
import designationsReducer from "../Redux/Master/designationSlice"
import employeeReducer from "../Redux/Employe/employeeSlice"
import dailySalaryReducer from "../Redux/Salary/dailysalarySlice"
import advancesalaryReducer from "../Redux/Salary/advancesalarySlice"
import monthlysalaryReducer from "../Redux/Salary/monthlysalarySlice"
import certificatesReducer from "../Redux/Maintanance/certificateSlice"

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
    // maintanance
    certificates: certificatesReducer,
    

},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});