import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CategoriesComponent } from "../components/categories/categories.component";
import { PopularItemsComponent } from "../components/popular-items/popular-items.component";
import { SpecialGiftsComponent } from "../components/special-gifts/special-gifts.component";
import { TrustedByComponent } from '../components/trusted-by/trusted-by.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TrustedByComponent,  CategoriesComponent, PopularItemsComponent, SpecialGiftsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
