import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavLink } from '@shared/interfaces/navbar';
import { ThemeService } from '@shared/services/theme/theme.service';
import { LogoComponent } from '../logo/logo.component';
import { TranslateMangerService } from '@shared/services/translate/translate.service';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../../store/auth-session/session.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule, LogoComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navLinks: NavLink[] = [
    { name: 'navbar.navLink.home', url: '/' },
    { name: 'navbar.navLink.category', url: '/category' },
    { name: 'navbar.navLink.about', url: '/about' },
    { name: 'navbar.navLink.contact', url: '/contact' },
  ];


  _theme = inject(ThemeService);
  _lang = inject(TranslateMangerService);
  
  private readonly store = inject(Store)
  private header = viewChild<ElementRef<HTMLElement>>('header');
  isOpen = signal<boolean>(false);


  isLoggedIn = toSignal(this.store.select(selectIsLoggedIn), {
    initialValue: !!localStorage.getItem('userToken'),
  });


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
