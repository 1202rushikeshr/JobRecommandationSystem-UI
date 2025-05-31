import { Injectable } from '@angular/core';
import { Observable,switchMap} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService { 

  constructor(private auth: AuthService, private http:HttpClient) { }

 

     getUserFromUserApi$(email:string): Observable<any> {
    return this.auth.getAuth0User$().pipe(
      switchMap((token) =>
        this.http.get('https://api.example.com/getUser', {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    );
  }

 addUserToBackend(formData: any): Observable<any> {
  return this.auth.getOrRenewAccessToken$().pipe(
    switchMap((token) =>
      this.http.post('https://api.example.com/addUser', formData, {
        headers: {
          Authorization: `Bearer ${token}`
          // Do NOT set Content-Type manually for FormData — browser sets it automatically
        }
      })
    )
  );
}

}

