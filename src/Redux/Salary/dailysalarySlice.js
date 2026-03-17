import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../components/data";
import Cookies from "js-cookie";


// ---------------- GET DAILY SALARY LIST ----------------
export const getDailySalaryEntries = createAsyncThunk(
  "dailySalary/getAll",
  async ({ page = 1, rows = 10, filters = {} } = {}, { rejectWithValue }) => {
    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const params = {
        page: page,
        page_size: rows,
        ...filters, // Spread filters object to include all filter parameters
      };

      const res = await axios.get(`${baseURL}/hr/daily-salary-entries/`, {
        params: params,
        headers: { Authorization: `Token ${token}` },
      });   

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching salary entries");
    }
  }
);


// ---------------- FILTER DAILY SALARY ----------------
export const filterDailySalaryEntries = createAsyncThunk(
  "dailySalary/filter",
  async (params, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/daily-salary-entries/`, {
        params: params,
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Filter failed");
    }

  }
);


// ---------------- CREATE DAILY SALARY ----------------
export const createDailySalaryEntry = createAsyncThunk(
  "dailySalary/create",
  async (data, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.post(
        `${baseURL}/hr/daily-salary-entries/`,
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Create failed");
    }

  }
);


// ---------------- UPDATE DAILY SALARY ----------------
export const updateDailySalaryEntry = createAsyncThunk(
  "dailySalary/update",
  async ({ id, data }, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.patch(
        `${baseURL}/hr/daily-salary-entries/${id}/`,
        data,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }

  }
);


// ---------------- DELETE DAILY SALARY ----------------
export const deleteDailySalaryEntry = createAsyncThunk(
  "dailySalary/delete",
  async (id, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      await axios.delete(
        `${baseURL}/hr/daily-salary-entries/${id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      return id;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }

  }
);


export const getDailySalaryById = createAsyncThunk(
  "dailySalary/getById",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");
      const res = await axios.get(`${baseURL}/hr/daily-salary-entries/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching daily salary");
    }
  }
);

// ---------------- SLICE ----------------
const dailySalarySlice = createSlice({

  name: "dailySalary",

  initialState: {
    loading: false,
    dailySalaryEntries: { count: 0, results: [] },
    error: null,
    success: false,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // LIST
      .addCase(getDailySalaryEntries.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDailySalaryEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.dailySalaryEntries = action.payload;
      })

      .addCase(getDailySalaryEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // FILTER
      .addCase(filterDailySalaryEntries.fulfilled, (state, action) => {
        state.dailySalaryEntries = action.payload;
      })


      // CREATE
      .addCase(createDailySalaryEntry.fulfilled, (state, action) => {

        state.success = true;

        state.dailySalaryEntries.results.unshift(action.payload);

        state.dailySalaryEntries.count += 1;

      })


      // UPDATE
      .addCase(updateDailySalaryEntry.fulfilled, (state, action) => {

        const index = state.dailySalaryEntries.results.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.dailySalaryEntries.results[index] = action.payload;
        }

      })


      // DELETE
      .addCase(deleteDailySalaryEntry.fulfilled, (state, action) => {

        state.dailySalaryEntries.results =
          state.dailySalaryEntries.results.filter(
            (item) => item.id !== action.payload
          );

        state.dailySalaryEntries.count -= 1;

      })

      .addCase(getDailySalaryById.fulfilled, (state, action) => {
  state.dailySalaryById = action.payload;
});

  },

});

export default dailySalarySlice.reducer;