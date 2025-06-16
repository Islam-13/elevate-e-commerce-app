import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from '../components/categories/categories.component';
import { SpecialGiftsComponent } from '../components/special-gifts/special-gifts.component';
import { BestSellerComponent } from '../components/best-seller/best-seller.component';
import { TrustedByComponent } from '../components/trusted-by/trusted-by.component';
import { FeaturesComponent } from '../components/features/features.component';

import { PopularItemsComponent } from '../components/popular-items/popular-items.component';
import { AboutUsComponent } from '../../shared/ui/about-us/about-us.component';

@Component({
  selector: 'app-home',
  imports: [
    CategoriesComponent,
    CommonModule,
    SpecialGiftsComponent,
    TrustedByComponent,
    BestSellerComponent,
    FeaturesComponent,
    PopularItemsComponent,
    AboutUsComponent,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
