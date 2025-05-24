import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { AdminDashboardComponent } from './features/dashboards/admin-dashboard/admin-dashboard.component';
import { RoleGuard } from './core/guards/role.guard';
import { JobSeekerDashboardComponent } from './features/dashboards/job-seeker-dashboard/job-seeker-dashboard.component';
import { EmployerDashboardComponent } from './features/dashboards/employer-dashboard/employer-dashboard.component';
import { UnauthorizedComponent } from './features/unauthorized/unauthorized.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { OktaCallbackComponent } from '@okta/okta-angular';
import{ SignInSignUpComponent } from './features/auth/sign-in-sign-up/sign-in-sign-up.component';
export const routes: Routes = [
    {path:'landing', component:LandingComponent},
    {path:'user-profile', component:UserProfileComponent},
    {path:'admin-dashboard', component:AdminDashboardComponent, canActivate:[RoleGuard],data: { roles: ['admin'] } },
    {path:'job-seeker-dashboard', component:JobSeekerDashboardComponent, canActivate:[RoleGuard],data: { roles: ['job-seeker'] } },
    {path:'employer-dashboard', component:EmployerDashboardComponent, canActivate:[RoleGuard],data: { roles: ['employer'] } },
    {path:'unauthorized', component:UnauthorizedComponent},    
   // {path:'login/callback',component:OktaCallbackComponent},
   { path:'login/callback',component:LandingComponent},
    {path:'',component:SignInSignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
 