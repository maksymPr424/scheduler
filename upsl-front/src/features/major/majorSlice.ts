import { IMajorState } from "@/interfaces/planInterfaces";
import { createSlice } from "@reduxjs/toolkit";
import { fetchPlansById } from "../plans/planThunks";

const initialState: IMajorState = {
  major: "",
  year: "",
};

const majorSlice = createSlice({
  name: "major",
  initialState,
  reducers: {
    setMajorData(state, { payload }) {
      state.major = payload.major;
      state.year = payload.year;
    },
    resetMajorData() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlansById.fulfilled, (state, { payload }) => {
        state.major = payload.metaData.major;
        state.year = payload.metaData.year;
      })
      .addCase(fetchPlansById.rejected, (state) => {
        state.major = "";
        state.year = "";
      });
  },
});

export const { setMajorData, resetMajorData } = majorSlice.actions;

export default majorSlice.reducer;
