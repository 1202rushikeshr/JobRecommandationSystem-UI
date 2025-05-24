import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { oktaAuth } from './okta-config';

// Standalone components
import { LandingComponent } from './features/landing/landing.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { AdminDashboardComponent } from './features/dashboards/admin-dashboard/admin-dashboard.component';
import { EmployerDashboardComponent } from './features/dashboards/employer-dashboard/employer-dashboard.component';
import { JobSeekerDashboardComponent } from './features/dashboards/job-seeker-dashboard/job-seeker-dashboard.component';
import { UnauthorizedComponent } from './features/unauthorized/unauthorized.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    OktaAuthModule,
    LandingComponent,
    UserProfileComponent,
    AdminDashboardComponent,
    EmployerDashboardComponent,  
    JobSeekerDashboardComponent,
    UnauthorizedComponent
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  //bootstrap: [AppComponent]
})
export class AppModule {}
