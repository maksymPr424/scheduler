import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../lib/api";
import { Ischema as IFetchPlansProps } from "../../app/validations/searchPlanValidation";
import test from "../../../test.json";
import { IPlan, IPlanById } from "@/interfaces/planInterfaces";
import api, { getBearer } from "@/lib/api";
import { getToken } from "../auth/authThunks";

export const fetchPlans = createAsyncThunk(
  "plans/fetchPlans",
  async ({ year, major }: IFetchPlansProps, { rejectWithValue }) => {
    try {
      // const bearer = getBearer();
      // if (!bearer) {
      //   getToken(); // Dispatch getToken to fetch a new token
      // }

      console.log({ params: { year, major } });
      console.log("Sasamba");
      //   const response = await api.get("/plans", { params: { year, major } });
      //   return response.data;
      const res: IPlan = {
        schedules: test,
        id: "1fca215asa2",
      };

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchPlansById = createAsyncThunk(
  "plans/fetchPlansById",
  async (id: string, { rejectWithValue }) => {
    try {
      // console.log({ params: { id } });
      console.log("Sasamba 2");
      //   const response = await api.get(`/plans/${id}`);
      //   return response.data;
      const res: IPlanById = {
        schedules: test,
        id: id,
        metaData: {
          major: "Informatyka",
          year: "III",
        },
      };

      // console.log(res);

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
