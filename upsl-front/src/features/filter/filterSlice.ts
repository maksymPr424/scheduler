import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFilters } from "./filterThunks";
import { IFiltersState } from "@/interfaces/filtersInterfaces";

const initialState: IFiltersState = {
  filters: [],
  active: [],
  loading: false,
  error: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveGroups(state, { payload }: PayloadAction<string[]>) {
      state.active = payload;
    },

    resetMajorData(state) {
      state.active = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilters.fulfilled, (state, { payload }) => {
        state.filters = payload.payload;
        state.loading = false;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching filters";
      });
  },
});

export const { setActiveGroups, resetMajorData } = filterSlice.actions;
export default filterSlice.reducer;
