
import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { AdminDashboardComponent } from './features/dashboards/admin-dashboard/admin-dashboard.component';
import { JobSeekerDashboardComponent } from './features/dashboards/job-seeker-dashboard/job-seeker-dashboard.component';
import { EmployerDashboardComponent } from './features/dashboards/employer-dashboard/employer-dashboard.component';
import { UnauthorizedComponent } from './features/unauthorized/unauthorized.component';
//import { OktaCallbackComponent } from '@okta/okta-angular';
import { RoleGuard } from './core/guards/role.guard';
import{ SignInSignUpComponent } from './features/auth/sign-in-sign-up/sign-in-sign-up.component';

export const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [RoleGuard], data: { roles: ['System Admin'] } },
  { path: 'employer-dashboard', component: EmployerDashboardComponent, canActivate: [RoleGuard], data: { roles: ['Employer'] } },
  { path: 'job-seeker-dashboard', component: JobSeekerDashboardComponent, canActivate: [RoleGuard], data: { roles: ['Job-seeker'] } },
  { path: 'unauthorized', component: UnauthorizedComponent },
 // { path: 'login/callback', component: AuthCallbackComponent },
  { path:'login/callback',component:LandingComponent},
   {path:'',component:SignInSignUpComponent}
];
