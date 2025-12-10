import { RootState } from "@/lib/store";

export const selectMajor = (state: RootState) => state.major.major;
export const selectYear = (state: RootState) => state.major.year;
