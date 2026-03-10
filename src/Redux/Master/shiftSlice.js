import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../components/data";
import Cookies from "js-cookie";

// ---------------- GET ALL SHIFTS ----------------
export const getShifts = createAsyncThunk(
  "shifts/getAll",
  async ({ page = 1, rows = 10 } = {}, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/shifts/`, {
        params: {
          page: page,
          page_size: rows,
        },
        headers: { Authorization: `Token ${token}` },
      });

      console.log("shifts :", res.data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching shifts");
    }
  }
);

// ---------------- CREATE SHIFT ----------------
export const createShift = createAsyncThunk(
  "shifts/create",
  async (data, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const config = {
        headers: { Authorization: `Token ${token}` },
      };

      const res = await axios.post(`${baseURL}/hr/shifts/`, data, config);

      console.log("Shift Created:", res.data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Create failed");
    }
  }
);

// ---------------- UPDATE SHIFT ----------------
export const updateShift = createAsyncThunk(
  "shifts/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const config = {
        headers: { Authorization: `Token ${token}` },
      };

      const res = await axios.patch(
        `${baseURL}/hr/shifts/${id}/`,
        data,
        config
      );

      console.log("Shift Updated:", res.data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

// ---------------- DELETE SHIFT ----------------
export const deleteShift = createAsyncThunk(
  "shifts/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const config = {
        headers: { Authorization: `Token ${token}` },
      };

      await axios.delete(`${baseURL}/hr/shifts/${id}/`, config);

      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  }
);

// ---------------- SLICE ----------------
const ShiftSlice = createSlice({
  name: "shifts",

  initialState: {
    loading: false,
    shifts: { count: 0, results: [] },
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getShifts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShifts.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts = action.payload;
      })
      .addCase(getShifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createShift.fulfilled, (state, action) => {
        state.shifts.results.push(action.payload);
        state.shifts.count += 1;
      })

      // UPDATE
      .addCase(updateShift.fulfilled, (state, action) => {
        const index = state.shifts.results.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.shifts.results[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.shifts.results = state.shifts.results.filter(
          (item) => item.id !== action.payload
        );

        state.shifts.count -= 1;
      });
  },
});

export default ShiftSlice.reducer;