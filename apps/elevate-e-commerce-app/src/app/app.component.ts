import { Component, inject } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from '@shared/ui/footer/footer.component';
import { ThemeService } from '@shared/services/theme/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CategoryComponent } from './pages/category/category.component';

@Component({
  imports: [HomeComponent, FooterComponent, TranslateModule, CategoryComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'elevate-e-commerce-app';

  _theme = inject(ThemeService);

  toggleTheme() {
    this._theme.toggleTheme();
  }
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');
  }
  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
