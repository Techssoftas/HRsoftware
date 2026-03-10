import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import baseURL from "../components/data";

// LOGIN API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/accounts/login/`,
        credentials,
        { withCredentials: true }
      );

      // Save token
      Cookies.set("Token", response.data.token);

      // Save user data
      const userData = {
        username: response.data.username,
      };

      Cookies.set("user", JSON.stringify(userData));

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login Failed");
    }
  }
);

// SIGNUP API
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/accounts/signup/`,
        userData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Signup Failed");
    }
  }
);

// LOGOUT API
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("Token");

      await axios.post(
        `${baseURL}/accounts/logout/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Logout Failed");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: Cookies.get("Token") || null,
    loading: false,
    error: null,
    role: null,
  },
  reducers: {
    logout: (state) => {
      Cookies.remove("Token");
      Cookies.remove("user");

      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.username;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;

        Cookies.remove("Token");
        Cookies.remove("user");
      })

      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.token = null;

        Cookies.remove("Token");
        Cookies.remove("user");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;