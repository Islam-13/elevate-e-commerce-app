import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@shared/ui/footer/footer.component';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';

@Component({
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'elevate-e-commerce';
}
