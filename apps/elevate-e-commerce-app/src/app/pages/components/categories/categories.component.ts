import { CategoriesInterfaces } from './../../../shared/interfaces/categories-interfaces/categories-interfaces';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-categories',
  imports: [CommonModule, CategoryCardComponent, CarouselModule, ButtonModule, TagModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit , OnDestroy {

  private readonly _categoriesService = inject(CategoriesService);
  categories: WritableSignal<CategoriesInterfaces> = signal({} as CategoriesInterfaces);

  responsiveOptions: any[] = [];
  private subscription!: Subscription


    getAllCategories(): void{
    this.subscription = this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        const slicedCategories = res.categories;
        this.categories.set({
          ...res,
          categories: slicedCategories
        });
      }
    });
  }


      ngOnInit(): void {
    this.getAllCategories();
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
  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}


