import {
  ApplicationConfig,
  importProvidersFrom,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { appInit } from '@shared/utils/app.utils';
import { provideStore } from '@ngrx/store';
import { filterReduser } from './store/filter.reducer';
import { provideEffects } from '@ngrx/effects';
import { FilterEffects } from './store/filter.effect';
import { BASE_URL } from 'auth-apis';
import { env } from '@env/env';

import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => appInit()),
    provideHttpClient(withFetch()),
    { provide: BASE_URL, useValue: env.baseURL },
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    MessageService,
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    provideStore({ filter: filterReduser }),
    provideEffects(FilterEffects),
  ],
};
