import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../components/data";
import Cookies from "js-cookie";


// ---------------- GET MONTHLY SALARY LIST ----------------
export const getMonthlySalaryEntries = createAsyncThunk(
  "monthlySalary/getAll",
  async ({ page = 1, rows = 10, filters = {} } = {}, { rejectWithValue }) => {
    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const params = {
        page: page,
        page_size: rows,
        ...filters, // Spread filters object to include all filter parameters
      };

      const res = await axios.get(`${baseURL}/hr/monthly-summaries/`, {
        params: params,
        headers: { Authorization: `Token ${token}` },
      });   

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching monthly salary entries");
    }
  }
);


// ---------------- GET PAID SALARY LIST ----------------
export const getPaidSalaryEntries = createAsyncThunk(
  "monthlySalary/getPaid",
  async ({ page = 1, rows = 10 } = {}, { rejectWithValue }) => {
    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/monthly-summaries/`, {
        params: {
          page: page,
          page_size: rows,
          is_paid: true,
        },
        headers: { Authorization: `Token ${token}` },
      });   

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching paid salary entries");
    }
  }
);

// ---------------- FILTER MONTHLY SALARY ----------------
export const filterMonthlySalaryEntries = createAsyncThunk(
  "monthlySalary/filter",
  async (params, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/monthly-summaries/`, {
        params: params,
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Filter failed");
    }
  }
);

// ---------------- DELETE MONTHLY SALARY ----------------
export const deleteMonthlySalaryEntry = createAsyncThunk(
  "monthlySalary/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.delete(`${baseURL}/hr/monthly-summaries/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  }
);

// ---------------- UPDATE MONTHLY SALARY ----------------
export const updateMonthlySalaryEntry = createAsyncThunk(
  "monthlySalary/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.patch(`${baseURL}/hr/monthly-summaries/${id}/`, data, {
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

// ---------------- GET MONTHLY SALARY BY ID ----------------
export const getMonthlySalaryById = createAsyncThunk(
  "monthlySalary/getById",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/monthly-summaries/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  }
);


const monthlySalarySlice = createSlice({
  name: "monthlySalary",
  initialState: {
    monthlySalaryEntries: null,
    paidSalaryEntries: null,
    singleMonthlySalary: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonthlySalaryEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthlySalaryEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlySalaryEntries = action.payload;
      })
      .addCase(getMonthlySalaryEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(filterMonthlySalaryEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterMonthlySalaryEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlySalaryEntries = action.payload;
      })
      .addCase(filterMonthlySalaryEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMonthlySalaryEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMonthlySalaryEntry.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, remove the deleted item from the list
      })
      .addCase(deleteMonthlySalaryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMonthlySalaryEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMonthlySalaryEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.singleMonthlySalary = action.payload;
      })
      .addCase(updateMonthlySalaryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMonthlySalaryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthlySalaryById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleMonthlySalary = action.payload;
      })
      .addCase(getMonthlySalaryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPaidSalaryEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaidSalaryEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.paidSalaryEntries = action.payload;
      })
      .addCase(getPaidSalaryEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default monthlySalarySlice.reducer;