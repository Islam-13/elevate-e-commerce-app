import { Component } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/ui/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@shared/ui/navbar/navbar.component';

@Component({
  imports: [HomeComponent, FooterComponent,RouterOutlet,NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'elevate-e-commerce-app';
}
