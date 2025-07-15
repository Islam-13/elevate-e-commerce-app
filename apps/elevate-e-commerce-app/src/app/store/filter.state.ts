import { selectedItem } from "@shared/interfaces/filter-items-interfaces";
import { Product } from "@shared/interfaces/popular-items-interface/popular-items-interface";

export interface FilterState {
  products: Product[];
  filterList: Product[];
  selectedCategories: selectedItem[];
  selectedOccasions: selectedItem[];
  selectedPrice:{
      maxPrice: number;
      minPrice: number;
  }
  selectedName:string
  selectedRating:selectedItem[]
}
