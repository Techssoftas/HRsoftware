import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../components/data";
import Cookies from "js-cookie";


// GET CERTIFICATES
export const getCertificates = createAsyncThunk(
  "certificates/getCertificates",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const response = await axios.get(`${baseURL}/hr/certificates/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// CREATE CERTIFICATE
export const createCertificate = createAsyncThunk(
  "certificates/createCertificate",
  async (data, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const response = await axios.post(
        `${baseURL}/hr/certificates/`,
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// UPDATE CERTIFICATE
export const updateCertificate = createAsyncThunk(
  "certificates/updateCertificate",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      const response = await axios.patch(
        `${baseURL}/hr/certificates/${id}/`,
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// DELETE CERTIFICATE
export const deleteCertificate = createAsyncThunk(
  "certificates/deleteCertificate",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token") || Cookies.get("Token");

      await axios.delete(`${baseURL}/hr/certificates/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const certificateSlice = createSlice({
  name: "certificates",
  initialState: {
    certificates: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // GET
      .addCase(getCertificates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload.results || action.payload;
      })
      .addCase(getCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // CREATE
      .addCase(createCertificate.fulfilled, (state, action) => {
        state.certificates.unshift(action.payload);
      })


      // UPDATE
      .addCase(updateCertificate.fulfilled, (state, action) => {
        const index = state.certificates.findIndex(
          (c) => c.id === action.payload.id
        );

        if (index !== -1) {
          state.certificates[index] = action.payload;
        }
      })


      // DELETE
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.certificates = state.certificates.filter(
          (c) => c.id !== action.payload
        );
      });

  },
});

export default certificateSlice.reducer;