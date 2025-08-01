import { createAction, props } from "@ngrx/store";
import { selectedItem } from "@shared/interfaces/filter-items-interfaces";
import { Product } from "@shared/interfaces/popular-items-interface/popular-items-interface";


export const loadProductsToFilter = createAction(
  "[FILTER] Load Products",
  props<{ products: Product[] }>()
);

export const loadSelectedCategories = createAction(
  "[FILTER] Load Selected Categories",
  props<{ selectedCategories: selectedItem[] }>()
);

export const loadSelectedOccasions = createAction(
  "[FILTER] Load Selected Occasions",
  props<{ selectedOccasions: selectedItem[] }>()
);

export const loadSelectedPrice= createAction(
  "[FILTER] Load Selected Price",
  props<{ maxPrice: number , minPrice: number }>()
);

export const loadSelectedName= createAction(
  "[FILTER] Load Selected Name",
  props<{name:string}>()
);

export const loadSelectedRating= createAction(
  "[FILTER] Load Selected Rating",
  props<{selectedRating:selectedItem[]}>()
);

export const ApplyFilters = createAction("[FILTER] Apply Filters");

export const clearAllFilters = createAction("[FILTER] Clear All Filters");

