import { createSlice } from "@reduxjs/toolkit";
import { fetchPlans } from "./planThunks";
import { IPlanState } from "@/interfaces/planInterfaces";

const initialState: IPlanState = {
  plans: [],
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
        console.log(payload);

        state.plans = payload;
      })
      .addCase(fetchPlans.rejected, (state, _) => {
        state.loading = false;
        state.error =
          "Sorry, we have not schedule for this direction and year yet.";
      });
  },
});

export default planSlice.reducer;
