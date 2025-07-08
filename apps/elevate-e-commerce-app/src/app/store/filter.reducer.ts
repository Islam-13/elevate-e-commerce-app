import { createReducer, on } from "@ngrx/store";
import { FilterState } from "./filter.state";
import {
  ApplyFilters,
  clearFilter,
  loadProductsToFilter,
  loadSelectedCategories,
  loadSelectedName,
  loadSelectedOccasions,
  loadSelectedPrice,
  loadSelectedRating,
} from "./filter.actions";

export const initalState: FilterState = {
  products: [],
  filterList: [],
  selectedCategories: [],
  selectedOccasions: [],
  selectedPrice: {
    minPrice: 0,
    maxPrice: 9999999,
  },
  selectedName: "",
  selectedRating: [],
};

export const filterReduser = createReducer(
  initalState,

  on(loadProductsToFilter, (state, { products }) => ({
    ...state,
    products,
  })),

  on(loadSelectedCategories, (state, { selectedCategories }) => ({
    ...state,
    selectedCategories,
  })),

  on(loadSelectedOccasions, (state, { selectedOccasions }) => ({
    ...state,
    selectedOccasions,
  })),

  on(loadSelectedName, (state, { name }) => ({
    ...state,
    selectedName: name,
  })),

  on(loadSelectedPrice, (state, { minPrice, maxPrice }) => ({
    ...state,
    selectedPrice: {
      minPrice,
      maxPrice,
    },
  })),

  on(loadSelectedRating, (state, { selectedRating }) => ({
    ...state,
    selectedRating,
  })),

  on(ApplyFilters, (state) => {
    let filtered = state.products;

    // Filter by Categories
    if (state.selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        state.selectedCategories.some((cat) => product.category === cat._id)
      );
    }

    // Filter by Occasions
    if (state.selectedOccasions.length > 0) {
      filtered = filtered.filter((product) =>
        state.selectedOccasions.some((occ) => product.occasion === occ._id)
      );
    }

    // Filter by Name
    if (state.selectedName) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(state.selectedName.toLowerCase())
      );
    }

    // Filter by Rating
    if (state.selectedRating.length > 0) {
      filtered = filtered.filter((product) =>
        state.selectedRating.some(
          (rating) => product.rateAvg === Number(rating.rateAvg)
        )
      );
    }

    // Filter by Price
    filtered = filtered.filter(
      (product) =>
        Number(product.price) <= Number(state.selectedPrice.maxPrice) &&
        Number(product.price) >= Number(state.selectedPrice.minPrice)
    );

    return {
      ...state,
      filterList: filtered,
    };
  }),

  on(clearFilter, (state) => ({
    ...initalState,
    products: state.products,
  }))
);
