import { Component } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';


@Component({
  imports: [HomeComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'elevate-e-commerce-app';
}
