import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,from,of } from 'rxjs';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { console } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth0:Auth0Service) { }

  login(): Observable<void> {
    return from(this.auth0.loginWithRedirect());
  }
  logout(): Observable<void> {
    return from(this.auth0.logout());
  }
  isAuthenticated$(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }
   getAuth0User$(): Observable<any> {
    return this.auth0.user$;
  }
  getOrRenewAccessToken$(): Observable<any> {
    console.log('getOrRenewAccessToken$ called');
    return of(this.auth0.getAccessTokenSilently);
  }

   /** Triggers signup redirect */
  signup(): void {
    this.auth0.loginWithRedirect({
      appState: { target: '/' },
      authorizationParams: { screen_hint: 'signup' },
    });
  }
 




}
