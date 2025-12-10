import { createAsyncThunk } from "@reduxjs/toolkit";
import filters from "../../../filters.json";
// import api, { getBearer } from "@/lib/api";
import {
  IFetchFiltersProps,
  IFilterPayload,
} from "@/interfaces/filtersInterfaces";

export const fetchFilters = createAsyncThunk(
  "plans/fetchFilters",
  async ({ id }: IFetchFiltersProps, { rejectWithValue }) => {
    try {
      // const bearer = getBearer();
      // if (!bearer) {
      //   getToken(); // Dispatch getToken to fetch a new token
      // }

      console.log({ params: { id } });
      console.log("Sasamba filter thunk");
      //   const response = await api.get("/plans", { params: { year, major } });
      //   return response.data;
      const res: IFilterPayload = {
        payload: filters,
      };

      return res;
    } catch (error) {
      // return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
