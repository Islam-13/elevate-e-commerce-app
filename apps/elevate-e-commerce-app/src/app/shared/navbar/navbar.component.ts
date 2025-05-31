import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar',
   imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
})
export class NavbarComponent {
  menuOpen = false;
  isDarkMode = false;
  currentLang = 'en';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const root = document.documentElement;
    if (this.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    
  }
}
