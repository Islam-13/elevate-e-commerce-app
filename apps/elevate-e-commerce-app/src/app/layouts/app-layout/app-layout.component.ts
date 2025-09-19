import { Component } from '@angular/core';
import { NavbarComponent } from '@shared/ui/navbar/navbar.component';
import { FooterComponent } from '@shared/ui/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent {}
