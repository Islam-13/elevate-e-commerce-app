import Aura from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from "@angular/core";
import { BrowserModule, provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { env } from "@env/env";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { appInit } from "@shared/utils/app.utils";
import { BASE_URL } from "auth-apis";
import { appRoutes } from './app.routes';
import { provideRouter } from '@angular/router';
import { filterReduser } from './store/filters/filter.reducer';
import { provideEffects } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { tokenInterceptor } from './core/interceptors/token/token.interceptor';
import { provideState, provideStore, Store } from '@ngrx/store';
import { FilterEffects } from './store/filters/filter.effect';
import { SessionEffects } from './store/auth-session/session.effects';
import { sessionFeatureKey, sessionReducer } from './store/auth-session/session.reducer';
import { SessionActions } from './store/auth-session/session.actions';


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
    provideState( sessionFeatureKey, sessionReducer),
    provideEffects(FilterEffects),
    provideEffects([SessionEffects]), 
    provideAppInitializer(() => {
    const store = inject(Store);
    store.dispatch(SessionActions.restoreFromStorage());
  }),
  ],
};