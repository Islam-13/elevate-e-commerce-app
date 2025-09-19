import  Aura  from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideState, provideStore, Store } from "@ngrx/store";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SessionActions } from "./store/auth-session/session.actions";
import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from "@angular/core";
import { appInit } from "@shared/utils/app.utils";
import { env } from "@env/env";
import { BrowserModule, provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { tokenInterceptor } from "./core/interceptors/token/token.interceptor";
import { BASE_URL } from "auth-apis";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { filterReduser } from './store/filters/filter.reducer';
import { checkoutReducers } from './store/checkout/checkout.reducers';
import { newAddressReducers } from './store/address/address.reducers';
import { cartReducer } from './store/cart-data/cart.reducer';
import { sessionFeatureKey, sessionReducer } from './store/auth-session/session.reducer';
import { SessionEffects } from './store/auth-session/session.effects';
import { provideEffects } from '@ngrx/effects';
import { FilterEffects } from './store/filters/filter.effect';
import { CartEffects } from './store/cart-data/cart.effect';


const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json');

function restoreFactory(store: Store) {
  return () => store.dispatch(SessionActions.restoreFromStorage());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => appInit()),
    importProvidersFrom(BrowserModule),
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
      total: cartReducer,
    }),
    provideState( sessionFeatureKey, sessionReducer),
    provideEffects(FilterEffects),
    provideEffects([SessionEffects]), 
    provideAppInitializer(() => {
    const store = inject(Store);
    store.dispatch(SessionActions.restoreFromStorage());
  }),
  provideEffects([CartEffects, FilterEffects]),
  ],
};

