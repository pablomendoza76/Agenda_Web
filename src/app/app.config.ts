import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

import { alertInterceptor } from './interceptor/alert.interceptor';
import { routes } from './app.routes';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from '../environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes, withHashLocation()),

    provideAnimationsAsync(),

    provideToastr({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      timeOut: 2000,
    }),

    provideHttpClient(
      withInterceptors([alertInterceptor])
    ),

    // ==========================
    // Firebase App + Storage
    // ==========================
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage())
  ],
};
