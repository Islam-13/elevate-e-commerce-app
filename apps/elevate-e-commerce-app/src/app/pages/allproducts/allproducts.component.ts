import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/ui/card/card.component';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { selectFilterProducts, selectSelectedCategories, selectSelectedOccasions, selectSelectedPrice, selectSelectedRating } from '../../store/filter.selector';

@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css',
})
export class AllproductsComponent  {
  private readonly store = inject(Store);

  selectedSortOption = 'priceAsc';

  categories = this.store.selectSignal(selectSelectedCategories);
  occasions = this.store.selectSignal(selectSelectedOccasions);
  rating = this.store.selectSignal(selectSelectedRating);
  price = this.store.selectSignal(selectSelectedPrice);

  filteredProducts = this.store.selectSignal(selectFilterProducts);

  allProducts = computed(() => {
    let result = [...this.filteredProducts()];

    const selectedCategories = this.categories();
    const selectedOccasions = this.occasions();
    const selectedRating = this.rating();
    const selectedPrice = this.price();

    if (selectedCategories.length > 0) {
      const catIds = selectedCategories.map((c) => c._id);
      result = result.filter((p) => catIds.includes(p.category));
    }

    if (selectedOccasions.length > 0) {
      const occIds = selectedOccasions.map((o) => o._id);
      result = result.filter((p) => occIds.includes(p.occasion));
    }

    if (selectedPrice) {
      result = result.filter(
        (p) =>
          p.priceAfterDiscount >= selectedPrice.minPrice &&
          p.priceAfterDiscount <= selectedPrice.maxPrice
      );
    }

    if (selectedRating.length > 0) {
      const ratingValues = selectedRating.map((r) => r.rating || 0);
      result = result.filter((p) => ratingValues.includes(Math.round(p.rateAvg)));
    }

    if (this.selectedSortOption === 'priceAsc') {
      result.sort((a, b) => a.priceAfterDiscount - b.priceAfterDiscount);
    } else if (this.selectedSortOption === 'priceDesc') {
      result.sort((a, b) => b.priceAfterDiscount - a.priceAfterDiscount);
    }

    return result;
  });

  sortProducts(option: string): void {
  this.selectedSortOption = option;
}


}
