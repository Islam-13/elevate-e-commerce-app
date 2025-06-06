import { Component, inject, OnInit, signal } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from '@shared/ui/footer/footer.component';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';

@Component({
  imports: [HomeComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'elevate-e-commerce-app';
  isDark = signal<boolean>(false);

  private _localStorage = inject(LocalStorageService);

  ngOnInit(): void {
    this.themeMode();
  }

  themeMode() {
    if (this._localStorage.isBrowser) {
      const theme = this._localStorage.get('theme');

      if (theme) {
        if (theme === 'dark') {
          this.dark();
        } else this.light();
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.dark();
        } else {
          this.light();
        }
      }
    }
  }

  light() {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');

    this.isDark.set(false);

    this._localStorage.set('theme', 'light');
  }

  dark() {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');

    this.isDark.set(true);

    this._localStorage.set('theme', 'dark');
  }
}
