import { Component } from '@angular/core';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-sign-in-sign-up',
  imports: [],
  templateUrl: './sign-in-sign-up.component.html',
  styleUrl: './sign-in-sign-up.component.scss'
})
export class SignInSignUpComponent {

  constructor(private auth:AuthService) { }


  signup():void {
    this.auth.signup();
  }


  login():void{
    this.auth.login().subscribe({
      next: () => {
        console.log('Login successful');
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });  
  }

  // Add any methods or properties needed for the component

}
