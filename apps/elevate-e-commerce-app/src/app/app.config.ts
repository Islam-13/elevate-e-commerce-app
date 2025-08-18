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
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { appInit } from '@shared/utils/app.utils';
import { provideStore } from '@ngrx/store';
import { filterReduser } from './store/filter.reducer';
import { provideEffects } from '@ngrx/effects';
import { FilterEffects } from './store/filter.effect';
import { BASE_URL } from 'auth-apis';
import { env } from '@env/env';

import Aura from '@primeng/themes/aura';
import { MessageService, ConfirmationService } from 'primeng/api';
import { checkoutReducers } from './store/checkout/checkout.reducers';
import { newAddressReducers } from './store/new-address/new-address.reducers';
import { tokenInterceptor } from './interceptors/token.interceptor';


import { CartEffects } from './store/cart-data/cart.effect';
import { cartReducer } from './store/cart-data/cart.reducer';


const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => appInit()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    { provide: BASE_URL, useValue: env.baseURL },
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    MessageService,
    ConfirmationService,
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    provideStore({
      filter: filterReduser,
      checkout: checkoutReducers,
      newAddress: newAddressReducers,
    }),
    provideEffects(FilterEffects),
     provideStore({
      total:cartReducer // لازم يطابق الاسم في cart.selector.ts
    }),

    // تسجيل الـ Effects
    provideEffects([CartEffects])
  ],
};
