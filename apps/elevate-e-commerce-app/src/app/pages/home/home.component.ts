import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesComponent } from '../components/categories/categories.component';
import { SpecialGiftsComponent } from '../components/special-gifts/special-gifts.component';
import { BestSellerComponent } from '../components/best-seller/best-seller.component';
import { TrustedByComponent } from '../components/trusted-by/trusted-by.component';
import { FeaturesComponent } from '../components/features/features.component';
<<<<<<< HEAD
import { GalleryComponent } from '../components/gallery/gallery.component';
=======
import { PopularItemsComponent } from '../components/popular-items/popular-items.component';
import { AboutUsComponent } from '../../shared/ui/about-us/about-us.component';
>>>>>>> b49b5bb91f7b7323622306152287ff9640c70b2f

@Component({
  selector: 'app-home',
  imports: [
    CategoriesComponent,
    CommonModule,
    SpecialGiftsComponent,
    TrustedByComponent,
    BestSellerComponent,
    FeaturesComponent,
<<<<<<< HEAD
    GalleryComponent
=======
    PopularItemsComponent,
    AboutUsComponent,
>>>>>>> b49b5bb91f7b7323622306152287ff9640c70b2f
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
