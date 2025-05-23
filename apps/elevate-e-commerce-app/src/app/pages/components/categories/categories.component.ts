import { CategoriesInterfaces } from './../../../shared/interfaces/categories-interfaces/categories-interfaces';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, CategoryCardComponent, CarouselModule, ButtonModule, TagModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {

  private readonly _categoriesService = inject(CategoriesService);
  categories: WritableSignal<CategoriesInterfaces> = signal({} as CategoriesInterfaces);

  responsiveOptions: any[] = [];

  ngOnInit(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        const slicedCategories = res.categories;
        this.categories.set({
          ...res,
          categories: slicedCategories
        });
      }
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  

}
