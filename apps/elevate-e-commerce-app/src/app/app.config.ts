import Aura from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, provideAppInitializer, provideZoneChangeDetection } from "@angular/core";
import { BrowserModule, provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { env } from "@env/env";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { appInit } from "@shared/utils/app.utils";
import { BASE_URL } from "auth-apis";
import { appRoutes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { filterReduser } from './store/filter.reducer';
import { FilterEffects } from './store/filter.effect';
import { provideEffects } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';


const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => appInit()),
    importProvidersFrom(BrowserModule),
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