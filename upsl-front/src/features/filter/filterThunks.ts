import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { getBearer } from "@/lib/api";
import {
  IFetchFiltersProps,
  IFilterPayload,
} from "@/interfaces/filtersInterfaces";

export const fetchFilters = createAsyncThunk(
  "plans/fetchFilters",
  async ({ direction, year }: IFetchFiltersProps, { rejectWithValue }) => {
    try {
      // const bearer = getBearer();
      // if (!bearer) {
      //   getToken(); // Dispatch getToken to fetch a new token
      // }

      const response = await api.get("/helpers/filters", {
        params: { direction, year },
      });
      //   return response.data;
      const res: IFilterPayload = {
        payload: response.data,
      };

      return res;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);
