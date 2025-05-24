
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes'; // ✅ use app.routes.ts not app-routing.module.ts
import { AuthModule } from '@auth0/auth0-angular';
import { auth0Config } from './app/auth0.config'; // ✅ your Auth0 settings

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(AuthModule.forRoot(auth0Config)) // ✅ Auth0, not Okta
  ]
});

