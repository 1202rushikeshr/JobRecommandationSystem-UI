import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const config = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    // Optional: add server-side transfer state here
  ]
};
