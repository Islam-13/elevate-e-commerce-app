import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '@shared/interfaces/categories-interfaces/categories-interfaces';
import { Occasion } from '@shared/interfaces/occasions';
import { CategoriesService } from '@shared/services/categories/categories.service';
import { OccasionsService } from '@shared/services/occasions/occasions.service';
import { AllproductsComponent } from "../allproducts/allproducts.component";
import { Store } from '@ngrx/store';
import { ApplyFilters, clearAllFilters, loadSelectedCategories, loadSelectedOccasions, loadSelectedPrice, loadSelectedRating } from '../../../store/filters/filter.actions';



  @Component({
  selector: 'app-category',
  imports: [FormsModule, AllproductsComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  minVal = 0;
  maxVal = 5000;
  maxRate = new Array(5);
  searchTerm = '';
  categories = signal<Category[]>([]);
  occasions = signal<Occasion[]>([]);

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);

  selectedCategories: Category[] = [];
  selectedOccasions: Occasion[] = [];
  selectedRatings: number[] = [];

  private priceEffect = effect(() => {
    this.store.dispatch(
      loadSelectedPrice({ minPrice: this.minVal, maxPrice: this.maxVal })
    );
    this.store.dispatch(ApplyFilters());
  });

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllOccasions();
  }

  getAllCategories() {
    const subscription = this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('fetch categories done');
      },
    });
    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  getAllOccasions() {
    const subscription = this._occasionsService.getOccasions().subscribe({
      next: (data) => {
        this.occasions.set(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('fetch occasions done');
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
}
  onCategoryChange(event: Event, category: Category) {
    const checked = (event.target as HTMLInputElement)?.checked ?? false;
    if (checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c._id !== category._id);
    }
    const selectedCategories = this.selectedCategories.map((cat) => ({
      _id: cat._id,
      type: 'category'
    }));
    this.store.dispatch(loadSelectedCategories({ selectedCategories }));
  }

  onOccasionChange(event: Event, occasion: Occasion) {
    const checked = (event.target as HTMLInputElement)?.checked ?? false;
    if (checked) {
      this.selectedOccasions.push(occasion);
    } else {
      this.selectedOccasions = this.selectedOccasions.filter(o => o._id !== occasion._id);
    }
    const selectedOccasions = this.selectedOccasions.map((occ) => ({
      _id: occ._id,
      type: 'occasion'
    }));
    this.store.dispatch(loadSelectedOccasions({ selectedOccasions }));
  }

  onRateChange(event: Event, rating: number) {
    const checked = (event.target as HTMLInputElement)?.checked ?? false;
    if (checked) {
      this.selectedRatings.push(rating);
    } else {
      this.selectedRatings = this.selectedRatings.filter(r => r !== rating);
    }
    const selectedRating = this.selectedRatings.map((r) => ({
      _id: r.toString(),
      rating: r,
      type: 'rating'
    }));
    this.store.dispatch(loadSelectedRating({ selectedRating }));
  }

  onPriceChange() {
    this.store.dispatch(loadSelectedPrice({ minPrice: this.minVal, maxPrice: this.maxVal }));
  }

  clearFilters() {
    this.selectedCategories = [];
    this.selectedOccasions = [];
    this.selectedRatings = [];
    this.minVal = 0;
    this.maxVal = 5000;
    this.searchTerm = '';
    this.store.dispatch(clearAllFilters());
  }

onSearchChange() {
  const term = this.searchTerm.trim().toLowerCase();

  if (term !== '') {
    this.selectedCategories = this.categories().filter(c =>
      c.name.toLowerCase().includes(term)
    );

    const selectedCategories = this.selectedCategories.map((cat) => ({
      _id: cat._id,
      type: 'category'
    }));
    this.store.dispatch(loadSelectedCategories({ selectedCategories }));

    this.selectedOccasions = this.occasions().filter(o =>
      o.name.toLowerCase().includes(term)
    );

    const selectedOccasions = this.selectedOccasions.map((occ) => ({
      _id: occ._id,
      type: 'occasion'
    }));
    this.store.dispatch(loadSelectedOccasions({ selectedOccasions }));
    this.selectedRatings = [1, 2, 3, 4, 5].filter((r) => {
      const label = 'rating ' + r + ' star' + (r > 1 ? 's' : '');
      return label.toLowerCase().includes(term);
    });

    const selectedRating = this.selectedRatings.map((r) => ({
      _id: r.toString(),
      rating: r,
      type: 'rating'
    }));
    this.store.dispatch(loadSelectedRating({ selectedRating }));
    this.store.dispatch(ApplyFilters());

  } else {
    this.selectedCategories = [];
    this.selectedOccasions = [];
    this.selectedRatings = [];

    this.store.dispatch(loadSelectedCategories({ selectedCategories: [] }));
    this.store.dispatch(loadSelectedOccasions({ selectedOccasions: [] }));
    this.store.dispatch(loadSelectedRating({ selectedRating: [] }));
    this.store.dispatch(ApplyFilters());
  }
}

  isCategorySelected(id: string): boolean {
    return this.selectedCategories.some(c => c._id === id);
  }

  isOccasionSelected(id: string): boolean {
    return this.selectedOccasions.some(o => o._id === id);
  }

  isRatingSelected(rating: number): boolean {
    return this.selectedRatings.includes(rating);
  }
}
