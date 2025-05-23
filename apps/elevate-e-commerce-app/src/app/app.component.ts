import { Component } from '@angular/core';
import { HomeComponent } from "./pages/home/home.component";
import { CategoriesComponent } from "./pages/components/categories/categories.component";
import { PopularItemsComponent } from "./pages/components/popular-items/popular-items.component";

@Component({
  imports: [HomeComponent, CategoriesComponent, PopularItemsComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'elevate-e-commerce-app';
}
