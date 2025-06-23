import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from '../components/categories/categories.component';
import { SpecialGiftsComponent } from '../components/special-gifts/special-gifts.component';
import { BestSellerComponent } from '../components/best-seller/best-seller.component';
import { TrustedByComponent } from '../components/trusted-by/trusted-by.component';
import { FeaturesComponent } from '../components/features/features.component';
import { PopularItemsComponent } from '../components/popular-items/popular-items.component';
import { AboutUsComponent } from '../../shared/ui/about-us/about-us.component';
import { Category } from '@shared/interfaces/categories-interfaces/categories-interfaces';
import { CategoriesService } from '@shared/services/categories/categories.service';

@Component({
  selector: 'app-home',
  imports: [
    CategoriesComponent,
    CommonModule,
    SpecialGiftsComponent,
    TrustedByComponent,
    BestSellerComponent,
    PopularItemsComponent,
    FeaturesComponent,
    AboutUsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories = signal<Category[]>([]);

  private readonly _categoriesService = inject(CategoriesService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    const subscription = this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories.set(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('categories complated');
      },
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
