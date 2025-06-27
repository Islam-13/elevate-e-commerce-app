import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { NavLink } from '@shared/interfaces/navbar';
import { ThemeService } from '@shared/services/theme/theme.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navLinks: NavLink[] = [
    { name: 'Home', url: '/' },
    { name: 'All Category', url: '/category' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' },
  ];

  isOpen = signal<boolean>(false);
  lang = signal<string>('en');

  _theme = inject(ThemeService);

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.lang.set(language);
  }

  toggleTheme() {
    this._theme.toggleTheme();
  }

  toggleMenu() {
    this.isOpen.update((cur) => !cur);
  }
}
