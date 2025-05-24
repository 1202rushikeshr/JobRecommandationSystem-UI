import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/user/user.service';
import { AuthService } from '../../core/auth/auth.service'; // ✅ your wrapper service

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'] // ✅ fixed typo (styleUrl → styleUrls)
})
export class LandingComponent implements OnInit {
   private email: string = '';
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService // ✅ inject Auth0 wrapper
   
  ) 
  {
      
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/unauthorized']);
        return;
      }
      this.authService.getAuth0User$().subscribe(user => {
      console.log('user is: ', user);
      if (user) {
        this.email = user.email;
      }
     }
   );

      
      
      // Only call user service after confirming auth
      this.userService.getUserFromUserApi$(this.email).subscribe({
        next: (user: any) => {
          console.log('User from API:', user);

          if (!user || !user.role) {
            this.router.navigate(['/user-profile']);
          } else {
            switch (user.role.toLowerCase()) {
              case 'system admin':
                this.router.navigate(['/admin-dashboard']);
                break;
              case 'job-seeker':
                this.router.navigate(['/job-seeker-dashboard']);
                break;
              case 'employer':
                this.router.navigate(['/employer-dashboard']);
                break;
              default:
                this.router.navigate(['/unauthorized']);
            }
          }
        },
        error: () => {
          this.router.navigate(['/user-profile']); // fallback in case of error
        }
      });
    });
  }
}
