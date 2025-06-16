import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from '@shared/ui/navbar/navbar.component';
import { FooterComponent } from '@shared/ui/footer/footer.component';
import { ThemeService } from '@shared/services/theme/theme.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavbarComponent, FooterComponent, HomeComponent, TranslateModule],
})
export class AppComponent {
  title = 'elevate-e-commerce-app';

  _theme = inject(ThemeService);

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');
  }

  toggleTheme() {
    this._theme.toggleTheme();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
