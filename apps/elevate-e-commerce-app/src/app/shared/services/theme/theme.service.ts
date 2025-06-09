import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal<boolean>(false);

  private readonly THEME_KEY = 'theme';
  private _localStorage = inject(LocalStorageService);

  constructor() {
    this.themeInit();
  }

  private themeInit() {
    if (this._localStorage.isBrowser) {
      const storedTheme = this._localStorage.get(this.THEME_KEY);
      const deviceTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      const isDrak = storedTheme ? storedTheme == 'dark' : deviceTheme;

      this.setTheme(isDrak);
    }
  }

  private setTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.isDark.set(true);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.isDark.set(false);
    }
  }

  toggleTheme() {
    this.setTheme(!this.isDark());

    this._localStorage.set(this.THEME_KEY, !this.isDark() ? 'light' : 'dark');
  }
}
