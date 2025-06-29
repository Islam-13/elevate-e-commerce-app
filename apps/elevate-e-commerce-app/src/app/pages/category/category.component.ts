import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '@shared/interfaces/categories-interfaces/categories-interfaces';
import { Occasion } from '@shared/interfaces/occasions';
import { CategoriesService } from '@shared/services/categories/categories.service';
import { OccasionsService } from '@shared/services/occasions/occasions.service';

@Component({
  selector: 'app-category',
  imports: [FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  minVal = 0;
  maxVal = 5000;

  maxRate = new Array(5);

  categories = signal<Category[]>([]);
  occasions = signal<Occasion[]>([]);

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _occasionsService = inject(OccasionsService);
  private readonly _destroyRef = inject(DestroyRef);

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
        console.log(data);
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
}
