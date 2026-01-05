import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { resetBearer, setBearer } from "@/lib/api";

interface TokenResponse {
  token: string;
}

export const getToken = createAsyncThunk<
  TokenResponse, // return type (fulfilled)
  void, // argument type
  { rejectValue: string } // rejectWithValue type
>("auth/getToken", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/token");
    setBearer(response.data.token);

    return response.data;
  } catch (error: unknown) {
    resetBearer();

    return rejectWithValue("Unexpected error");
  }
});
