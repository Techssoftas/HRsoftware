import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../components/data";
import Cookies from "js-cookie";

// ---------------- GET ALL DESIGNATIONS ----------------
export const getDesignations = createAsyncThunk(
  "designations/getAll",
  async ({ page = 1, rows = 10 } = {}, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/designations/`, {
        params: {
          page: page,
          page_size: rows,
        },
        headers: { Authorization: `Token ${token}` },
      });

      console.log("Designations :", res.data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching designations");
    }
  }
);

// ---------------- CREATE DESIGNATION ----------------
export const createDesignation = createAsyncThunk(
  "designations/create",
  async (data, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const config = {
        headers: { Authorization: `Token ${token}` },
      };

      const res = await axios.post(`${baseURL}/hr/designations/`, data, config);

      console.log("Designation Created:", res.data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Create failed");
    }
  }
);

// ---------------- UPDATE DESIGNATION ----------------
export const updateDesignation = createAsyncThunk(
  "designations/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const config = {
        headers: { Authorization: `Token ${token}` },
      };

      const res = await axios.patch(
        `${baseURL}/hr/designations/${id}/`,
        data,
        config
      );

      console.log("Designation Updated:", res.data);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);

// ---------------- DELETE DESIGNATION ----------------
export const deleteDesignation = createAsyncThunk(
  "designations/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const config = {
        headers: { Authorization: `Token ${token}` },
      };

      await axios.delete(`${baseURL}/hr/designations/${id}/`, config);

      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete failed");
    }
  }
);

// ---------------- GET SINGLE DESIGNATION ----------------
export const getDesignationById = createAsyncThunk(
  "designations/getOne",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const res = await axios.get(`${baseURL}/hr/designations/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching designation");
    }
  }
);

// ---------------- SLICE ----------------
const designationSlice = createSlice({
  name: "designations",

  initialState: {
    loading: false,
    designations: { count: 0, results: [] },
    singleDesignation: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getDesignations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDesignations.fulfilled, (state, action) => {
        state.loading = false;
        state.designations = action.payload;
      })
      .addCase(getDesignations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createDesignation.fulfilled, (state, action) => {
        state.designations.results.push(action.payload);
        state.designations.count += 1;
      })

      // UPDATE
      .addCase(updateDesignation.fulfilled, (state, action) => {
        const index = state.designations.results.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.designations.results[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.designations.results = state.designations.results.filter(
          (item) => item.id !== action.payload
        );

        state.designations.count -= 1;
      })

      // GET ONE
      .addCase(getDesignationById.fulfilled, (state, action) => {
        state.singleDesignation = action.payload;
      });
  },
});

export default designationSlice.reducer;