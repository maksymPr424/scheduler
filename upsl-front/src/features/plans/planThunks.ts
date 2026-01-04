import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../lib/api";
import { IFetchPlanForm } from "../../app/validations/searchPlanValidation";
// import test from "../../../test.json";
import { IDay } from "@/interfaces/planInterfaces";
import api, { getBearer } from "@/lib/api";
import { getToken } from "../auth/authThunks";

export const fetchPlans = createAsyncThunk(
  "plans/fetchPlans",
  async ({ year, direction, day }: IFetchPlanForm, { rejectWithValue }) => {
    try {
      // const bearer = getBearer();
      // if (!bearer) {
      //   getToken(); // Dispatch getToken to fetch a new token
      // }

      console.log({ params: { year, direction, day } });
      const response = await api.get("/schedule/week", {
        params: { section_name: direction, year, date: day },
      });
      //   return response.data;
      const res: IDay[] = response.data;

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
