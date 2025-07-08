import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilterState } from "./filter.state";

export const selectFilterState = createFeatureSelector<FilterState>("filter");

function isFilterEmpty(state: FilterState): boolean {
  return (
    state.selectedCategories.length === 0 &&
    state.selectedOccasions.length === 0 &&
    state.selectedRating.length === 0 &&
    state.selectedName.trim() === ""
  );
}

export const selectFilterProducts = createSelector(
  selectFilterState,
  (state) => {
    return isFilterEmpty(state) ? state.products : state.filterList;
  }
);
