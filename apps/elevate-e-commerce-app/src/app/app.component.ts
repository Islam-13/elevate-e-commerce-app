import { Component } from '@angular/core';
import { CategoriesComponent } from "./pages/components/categories/categories.component";
import { PopularItemsComponent } from "./pages/components/popular-items/popular-items.component";
import { HomeComponent } from './pages/home/home.component';

@Component({
  imports: [HomeComponent, CategoriesComponent, PopularItemsComponent],

import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from "./pages/components/features/features.component";


@Component({
  imports: [HomeComponent, FeaturesComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'elevate-e-commerce-app';
}
