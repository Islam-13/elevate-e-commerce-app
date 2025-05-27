import { Component } from '@angular/core';

 featurs/categories-b
import { HomeComponent } from "./pages/home/home.component";

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
