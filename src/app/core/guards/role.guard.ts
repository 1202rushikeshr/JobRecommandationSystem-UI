import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable,map,tap } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' }) 
export class RoleGuard {
  constructor(private userService: UserService,private router:Router) {}
 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const expectedRoles = route.data['roles'] as string[];

    return this.userService.getUserFromUserApi$().pipe(
      map(user => user && expectedRoles.includes(user.role)),
      tap(allowed => {
        if (!allowed) {
          this.router.navigate(['/unauthorized']);
        }
      })
    );
  }
}

