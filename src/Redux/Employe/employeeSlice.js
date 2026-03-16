import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../components/data";
import Cookies from "js-cookie";


// ---------------- GET EMPLOYEE LIST ----------------
export const getEmployees = createAsyncThunk(
  "employees/getAll",
  async (
    { page = 1, rows = 10, filters = {} } = {},
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/employees/lists/`, {
        params: {
          page: page,
          page_size: rows,
          ...filters
        },
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching employees");
    }
  }
);


// ---------------- GET EMPLOYEE DETAILS BY ID ----------------
export const getEmployeeById = createAsyncThunk(
  "employees/getOne",
  async (id, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/employees/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching employee");
    }

  }
);


// ---------------- GET EMPLOYEE BY EMPLOYEE_ID ----------------
export const getEmployeeByEmployeeId = createAsyncThunk(
  "employees/getByEmployeeId",
  async (employeeId, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/employees/`, {
        params: { employee_id: employeeId },
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching employee");
    }

  }
);


// ---------------- CREATE EMPLOYEE ----------------
export const createEmployee = createAsyncThunk(
  "employees/create",
  async (data, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const config = {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data"
        },
      };

      const res = await axios.post(`${baseURL}/hr/employees/`, data, config);

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Create failed");
    }

  }
);


// ---------------- UPDATE EMPLOYEE ----------------
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, data }, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const config = {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data"
        },
      };

      const res = await axios.patch(
        `${baseURL}/hr/employees/${id}/`,
        data,
        config
      );

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }

  }
);


// ---------------- DELETE EMPLOYEE ----------------
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const config = {
        headers: { Authorization: `Token ${token}` },
      };

      await axios.delete(`${baseURL}/hr/employees/${id}/`, config);
     
      return id;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }

  }
);


// ---------------- SLICE ----------------
const employeeSlice = createSlice({

  name: "employees",

  initialState: {
    loading: false,
    employees: { count: 0, results: [] },
    singleEmployee: null,
    employeeByEmployeeId: null,
    error: null,
    success: false,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // LIST
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
      })

      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })

      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // GET ONE
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.singleEmployee = action.payload;
      })


      // GET BY EMPLOYEE ID
      .addCase(getEmployeeByEmployeeId.fulfilled, (state, action) => {
        state.employeeByEmployeeId = action.payload;
      })


      // CREATE
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.success = true;
        state.employees.results.push(action.payload);
        state.employees.count += 1;
      })

      


      // UPDATE
      .addCase(updateEmployee.fulfilled, (state, action) => {

        const index = state.employees.results.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.employees.results[index] = action.payload;
        }

      })


      // DELETE
      .addCase(deleteEmployee.fulfilled, (state, action) => {

        state.employees.results = state.employees.results.filter(
          (item) => item.id !== action.payload
        );

        state.employees.count -= 1;

      });

  },

});

export default employeeSlice.reducer;