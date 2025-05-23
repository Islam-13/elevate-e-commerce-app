import { Component } from '@angular/core';
<<<<<<< HEAD
import { HomeComponent } from "./pages/home/home.component";
import { CategoriesComponent } from "./pages/components/categories/categories.component";
import { PopularItemsComponent } from "./pages/components/popular-items/popular-items.component";
=======
import { HomeComponent } from './pages/home/home.component';
>>>>>>> ea97fdb691afe9b86c0eb2622fad8efb1f5daca1

@Component({
  imports: [HomeComponent, CategoriesComponent, PopularItemsComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'elevate-e-commerce-app';
}
