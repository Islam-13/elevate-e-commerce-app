import { Component } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from "./pages/components/features/features.component";
import { NavbarComponent } from '@shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  imports: [HomeComponent, FeaturesComponent,NavbarComponent,RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'elevate-e-commerce-app';
}
