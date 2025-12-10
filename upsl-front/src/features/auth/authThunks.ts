import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { resetBearer, setBearer } from "@/lib/api";

export const getToken = createAsyncThunk(
  "auth/getToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/token");
      setBearer(response.data.token);

      return response.data;
    } catch (error) {
      resetBearer();

      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
