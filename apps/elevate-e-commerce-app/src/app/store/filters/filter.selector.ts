import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from './filter.state';

export const selectFilterState = createFeatureSelector<FilterState>('filter');

export const selectFilterProducts = createSelector(
  selectFilterState,
  (state) => {
    return state.filterList.length === 0 ? state.products : state.filterList;
  }
);

export const selectSelectedCategories = createSelector(
  selectFilterState,
  (state) => state.selectedCategories
);

export const selectSelectedOccasions = createSelector(
  selectFilterState,
  (state) => state.selectedOccasions
);

export const selectSelectedPrice = createSelector(
  selectFilterState,
  (state) => state.selectedPrice
);

export const selectSelectedRating = createSelector(
  selectFilterState,
  (state) => state.selectedRating
);
