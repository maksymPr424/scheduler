import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDirectionsPayload } from "@/interfaces/directionsInterfacec";
import api from "@/lib/api";

export const fetchDirections = createAsyncThunk(
  "plans/fetchDirections",
  async (_, { rejectWithValue }) => {
    try {
      // const bearer = getBearer();
      // if (!bearer) {
      //   getToken(); // Dispatch getToken to fetch a new token
      // }

      const response = await api.get("/helpers/directions_years");
      //   return response.data;
      const res: IDirectionsPayload = {
        payload: response.data,
      };

      console.log(res);

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
