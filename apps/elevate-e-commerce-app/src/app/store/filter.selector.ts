import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilterState } from "./filter.state";

export const selectFilterState = createFeatureSelector<FilterState>("filter");

export const selectFilterProducts = createSelector(
  selectFilterState,
  (state) => {
    return state.filterList.length === 0 ? state.products : state.filterList;
  }
);
