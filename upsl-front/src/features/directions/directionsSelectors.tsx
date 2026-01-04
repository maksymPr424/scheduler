import { RootState } from "@/lib/store";

export const selectDirections = (state: RootState) => state.directions.directions;
export const selectYears = (state: RootState) => state.directions.years;
export const selectActiveDirection = (state: RootState) => state.directions.active;