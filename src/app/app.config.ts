import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router'; // withInMemoryScrolling importieren
import { routes } from './app.routes';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // Diese Zeile übernimmt das automatische Hochscrollen für dich:
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // Scrollt bei Navigation automatisch nach oben
        anchorScrolling: 'enabled'            // Ermöglicht das Springen zu ID-Ankern (#contact)
      })
    ),
    provideHttpClient(),
    provideAnimations(),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    })
  ]
};