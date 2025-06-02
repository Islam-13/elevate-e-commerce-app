import { Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularItemsService } from '../../../shared/services/popular-items/popular-items.service';
import { Product } from '../../../shared/interfaces/popular-items-interface/popular-items-interface';
import { Subscription } from 'rxjs';
import { CardComponent } from '@shared/ui/card/card.component';
import { CategoriesService } from '@shared/services/categories/categories.service';
import { Category } from '@shared/interfaces/categories-interfaces/categories-interfaces';

@Component({
  selector: 'app-popular-items',
  imports: [CommonModule , CardComponent],
  templateUrl: './popular-items.component.html',
  styleUrl: './popular-items.component.css',
})export class PopularItemsComponent implements OnInit, OnDestroy {
  private readonly _popularItemsService = inject(PopularItemsService);
  private readonly _categoriesService = inject(CategoriesService);

  allProducts = signal<Product[]>([]);
  products = signal<Product[]>([]);
  currentCategory = signal<string>('');
  categories = signal<Category[]>([]);
  private subscription!: Subscription;



filterByCategory(id: string): void {
  this.currentCategory.set(id);
  const filtered = this.allProducts().filter(
    (product) => product.category === id
  );
  this.products.set(filtered);
}

  getAllProducts(): void {
    this.subscription = this._popularItemsService.getAllProducts({
      limit: 10,
      sort: '-price'
    }).subscribe((data) => {
      this.allProducts.set(data.products);
      this.products.set(data.products);
    });
  }


  getAllCategories():void{
  this.subscription = this._categoriesService.getAllCategories(
    ).subscribe((data) =>{
      this.categories.set(data.categories.slice(0,4));
    })
  }


  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
