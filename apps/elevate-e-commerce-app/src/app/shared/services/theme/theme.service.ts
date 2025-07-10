import { inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { of, tap } from 'rxjs';
import { CookiesService } from '../cookies/cookies.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = signal<boolean>(false);

  private readonly THEME_KEY = 'theme';
  private readonly cookies = inject(CookiesService);
  private readonly root = inject(DOCUMENT);

  constructor() {
    this.themeInit();
  }

  themeInit() {
    const storedTheme = this.cookies.getCookie(this.THEME_KEY);

    if (storedTheme) {
      this.setTheme(storedTheme);
    }

    return of(storedTheme).pipe(
      tap(() => {
        console.log(`Init Theme is  ==> ${storedTheme}`);
      })
    );
  }

  private setTheme(theme: string) {
    this.root.documentElement.setAttribute('data-theme', theme);

    if (theme == 'dark') {
      this.isDark.set(true);
    } else this.isDark.set(false);
  }

  toggleTheme() {
    const currentTheme = this.cookies.getCookie(this.THEME_KEY);

    const newTheme =
      currentTheme == 'light' || currentTheme == '' ? 'dark' : 'light';

    this.setTheme(newTheme);

    this.cookies.setCookie(this.THEME_KEY, newTheme, { expireNum: 400 });
  }
}
