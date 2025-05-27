import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
 featurs/categories-b

import { CategoriesComponent } from "../components/categories/categories.component";
import { PopularItemsComponent } from "../components/popular-items/popular-items.component";
import { SpecialGiftsComponent } from "../components/special-gifts/special-gifts.component";
import { CategoriesComponent } from "../components/categories/categories.component";
import { SpecialGiftsComponent } from '../components/special-gifts/special-gifts.component';
import { BestSellerComponent } from '../components/best-seller/best-seller.component';
import { PopularItemsComponent } from "../components/popular-items/popular-items.component";

import { TrustedByComponent } from '../components/trusted-by/trusted-by.component';
import { FeaturesComponent } from "../components/features/features.component";


@Component({
  selector: 'app-home',
featurs/categories-b
  imports: [CommonModule, TrustedByComponent,  CategoriesComponent, PopularItemsComponent, SpecialGiftsComponent],
  imports: [
    CategoriesComponent,
    PopularItemsComponent,
    CommonModule,
    SpecialGiftsComponent,
    TrustedByComponent,
    BestSellerComponent,
    FeaturesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
