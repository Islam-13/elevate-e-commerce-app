import { inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CookiesService } from '../cookies/cookies.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateMangerService {
  lang = signal<string>('en');
  private readonly langKey = 'lang';

  private readonly cookies = inject(CookiesService);
  private readonly root = inject(DOCUMENT);

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');
  }

  initTranslate() {
    const lang = this.cookies.getCookie(this.langKey);

    if (lang) {
      this.changeLang(lang);
    }

    return this.translate.use(lang || 'en').pipe(
      tap(() => {
        console.log(`Init Lang is  ==> ${lang}`);
      })
    );
  }

  changeLang(language: string): void {
    this.translate.use(language);
    this.setHTMLLang(language);
    this.lang.set(language);

    this.cookies.setCookie(this.langKey, language, { expireNum: 400 });
  }

  setHTMLLang(lang: string): void {
    if (lang == 'ar') {
      this.root.documentElement.lang = 'ar';
      this.root.documentElement.dir = 'rtl';
    } else {
      this.root.documentElement.lang = 'en';
      this.root.documentElement.dir = 'ltr';
    }
  }
}
