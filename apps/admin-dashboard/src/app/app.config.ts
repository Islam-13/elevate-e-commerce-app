import { BASE_URL } from 'auth-apis';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { environment } from '@elevate-e-commerce-app/shared-env';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token/token.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl },
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])),
    providePrimeNG({ theme: { preset: Aura } }),
    MessageService,
    ConfirmationService,
  ],
};
