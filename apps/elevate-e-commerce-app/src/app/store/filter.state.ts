import { Product } from "@shared/interfaces/carditem-interfaces";
import { selectedItem } from "@shared/interfaces/filter-items-interfaces";

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
