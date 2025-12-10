import { createSlice } from "@reduxjs/toolkit";
import { fetchPlans, fetchPlansById } from "./planThunks";
import { IPlanState } from "@/interfaces/planInterfaces";

const initialState: IPlanState = {
  plans: [],
  id: null,
  loading: false,
  error: null,
};

const planSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.plans = payload.schedules;

        state.id = payload.id;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching plans";
      })
      .addCase(fetchPlansById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlansById.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.plans = payload.schedules;
        state.id = payload.id;
      })
      .addCase(fetchPlansById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching plans";
      });
  },
});

export default planSlice.reducer;
