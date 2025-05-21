import { CategoriesInterfaces } from './../../../shared/interfaces/categories-interfaces/categories-interfaces';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../shared/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly _categoriesService = inject(CategoriesService);
  categories: WritableSignal<CategoriesInterfaces> = signal ({} as CategoriesInterfaces);


getAllCategories(): void {
  this._categoriesService.getAllCategories().subscribe({
    next: (res) => {
      const slicedCategories = res.categories.slice(0, 5); 
      this.categories.set({
        ...res,
        categories: slicedCategories
      });
    },
  });
}

  ngOnInit(): void {
      this.getAllCategories();
  }
}
