import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";
import { IDay, ILesson } from "@/interfaces/planInterfaces";

export const selectPlans = (state: RootState) => state.plans.plans;
export const selectLoading = (state: RootState) => state.plans.loading;
export const selectError = (state: RootState) => state.plans.error;
export const selectActiveFilters = (state: RootState) => state.filter.active;

export const selectFilteredPlans = createSelector(
  [selectPlans, selectActiveFilters],
  (plans, activeFilters) => {
    if (!activeFilters || activeFilters.length === 0) {
      return plans;
    }

    return plans
      .map((day: IDay) => {
        const filteredLessons = day.lessons
          .filter((lesson: ILesson) => {
            if (lesson.groups == "all" || activeFilters.includes(lesson.groups))
              return true;
          })
          .sort((a, b) => {
            const [ha, ma] = a.time_start.split(":").map(Number);
            const [hb, mb] = b.time_start.split(":").map(Number);

            return ha * 60 + ma - (hb * 60 + mb);
          });

        return { ...day, lessons: filteredLessons };
      })
      .filter((day: IDay) => day.lessons.length > 0);
  }
);
