import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, switchMap, map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const expectedRoles = route.data['roles'] as string[];

    return this.auth.getAuth0User$().pipe(
      switchMap((authUser) => {
        const email = authUser?.email;
        if (!email) {
          this.router.navigate(['/unauthorized']);
          return of(false);
        }
        return this.userService.getUserFromUserApi$(email).pipe(
          map(user => user && expectedRoles.includes(user.role)),
          tap(allowed => {
            if (!allowed) {
              this.router.navigate(['/unauthorized']);
            }
          })
        );
      })
    );
  }
}
