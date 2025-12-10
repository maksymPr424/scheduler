import { RootState } from "@/lib/store";

export const selectFilters = (state: RootState) => state.filter.filters;
export const selectActiveFilters = (state: RootState) => state.filter.active;
export const selectLoading = (state: RootState) => state.filter.loading;
export const selectError = (state: RootState) => state.filter.error;
