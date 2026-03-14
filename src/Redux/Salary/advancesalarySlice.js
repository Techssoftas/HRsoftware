import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../components/data";
import Cookies from "js-cookie";


// ---------------- GET ADVANCE SALARY LIST ----------------
export const getAdvanceSalaries = createAsyncThunk(
  "advanceSalary/getAll",
  async ({ page = 1, rows = 10 } = {}, { rejectWithValue }) => {
    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/advances/`, {
        params: {
          page: page,
          page_size: rows,
        },
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching advance salaries");
    }
  }
);


// ---------------- CREATE ADVANCE SALARY ----------------
export const createAdvanceSalary = createAsyncThunk(
  "advanceSalary/create",
  async (data, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.post(
        `${baseURL}/hr/advances/`,
        data,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Create failed");
    }

  }
);


// ---------------- UPDATE ADVANCE SALARY ----------------
export const updateAdvanceSalary = createAsyncThunk(
  "advanceSalary/update",
  async ({ id, data }, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.patch(
        `${baseURL}/hr/advances/${id}/`,
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


// ---------------- DELETE ADVANCE SALARY ----------------
export const deleteAdvanceSalary = createAsyncThunk(
  "advanceSalary/delete",
  async (id, { rejectWithValue }) => {

    try {

      const token = Cookies.get("token") || Cookies.get("Token");

      await axios.delete(
        `${baseURL}/hr/advances/${id}/`,
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


// ---------------- SLICE ----------------
const advanceSalarySlice = createSlice({

  name: "advanceSalary",

  initialState: {
    loading: false,
    advanceSalaries: { count: 0, results: [] },
    error: null,
    success: false,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // LIST
      .addCase(getAdvanceSalaries.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAdvanceSalaries.fulfilled, (state, action) => {
        state.loading = false;
        state.advanceSalaries = action.payload;
      })

      .addCase(getAdvanceSalaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // CREATE
      .addCase(createAdvanceSalary.fulfilled, (state, action) => {

        state.success = true;

        state.advanceSalaries.results.unshift(action.payload);

        state.advanceSalaries.count += 1;

      })


      // UPDATE
      .addCase(updateAdvanceSalary.fulfilled, (state, action) => {

        const index = state.advanceSalaries.results.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.advanceSalaries.results[index] = action.payload;
        }

      })


      // DELETE
      .addCase(deleteAdvanceSalary.fulfilled, (state, action) => {

        state.advanceSalaries.results =
          state.advanceSalaries.results.filter(
            (item) => item.id !== action.payload
          );

        state.advanceSalaries.count -= 1;

      });

  },

});

export default advanceSalarySlice.reducer;