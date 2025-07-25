import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NavLink } from '@shared/interfaces/navbar';
import { ThemeService } from '@shared/services/theme/theme.service';
import { LogoComponent } from '../logo/logo.component';
import { TranslateMangerService } from '@shared/services/translate/translate.service';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  navLinks: NavLink[] = [
    { name: 'navbar.navLink.home', url: '/' },
    { name: 'navbar.navLink.category', url: '/category' },
    { name: 'navbar.navLink.about', url: '/about' },
    { name: 'navbar.navLink.contact', url: '/contact' },
  ];

  isOpen = signal<boolean>(false);
  token = signal<boolean>(false);

  private header = viewChild<ElementRef<HTMLElement>>('header');

  _theme = inject(ThemeService);
  _lang = inject(TranslateMangerService);

  private readonly _localStorage = inject(LocalStorageService);

  ngOnInit(): void {
    this.token.set(this._localStorage.get('userToken') ? true : false);
  }

  @HostListener('document:click', ['$event']) detectClick(e: Event) {
    if (!this.header()?.nativeElement.contains(e.target as HTMLElement)) {
      this.isOpen.set(false);
    }
  }

  toggleTheme() {
    this._theme.toggleTheme();
  }

  toggleMenu() {
    this.isOpen.update((cur) => !cur);
  }
}
