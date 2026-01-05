import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDirections } from "./directionsThunks";
import {
  IDirectionsState,
  IActiveDirection,
} from "@/interfaces/directionsInterfacec";

const initialState: IDirectionsState = {
  directions: [],
  years: [],
  active: null,
};

const directionsSlice = createSlice({
  name: "directions",
  initialState,
  reducers: {
    setActiveDirection(state, { payload }: PayloadAction<IActiveDirection>) {
      state.active = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDirections.fulfilled, (state, { payload }) => {
      const { directions, years } = payload.payload;
      state.directions = directions.filter(
        (d: string) => typeof d === "string" && d.length > 0
      );

      state.years = years.filter((y: number) => y !== null && y !== undefined);

      // ініціалізація active ТІЛЬКИ якщо ще не заданий
      if (!state.active && state.directions.length && state.years.length) {
        state.active = {
          direction: state.directions[0],
          year: state.years[0],
        };
      }
    });
  },
});

export const { setActiveDirection } = directionsSlice.actions;
export default directionsSlice.reducer;
