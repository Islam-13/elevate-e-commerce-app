import { Component, input, OnInit } from '@angular/core';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { CategoryCardComponent } from '../category-card/category-card.component';
import { Category } from '@shared/interfaces/categories-interfaces/categories-interfaces';

@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent, CarouselModule, ButtonModule, TagModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories = input.required<Category[]>();
  responsiveOptions: any[] = [];

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
