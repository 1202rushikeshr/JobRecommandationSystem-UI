import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
   user: any = {};
  resumeFile!: File;

  email: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private auth:AuthService,private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
      this.auth.getAuth0User$().subscribe(user => {
      console.log('Logged-in user:', user);
      if (user) {
        this.email = user.email || '';
        this.firstName = user.given_name || '';
        this.lastName = user.family_name || '';
      }
      });
      this.auth.getOrRenewAccessToken$().subscribe(token => {
      console.log('Access Token:', token);  
      });

      
    }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.resumeFile = file;
    } else {
      alert('Please upload a valid PDF file.');
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(this.user)], { type: 'application/json' }));
    if (this.resumeFile) {
      formData.append('resume', this.resumeFile);
    }

    this.userService.addUserToBackend$(formData).subscribe({
      next: () => {
        alert('User profile saved successfully!');
        this.router.navigate(['/landing']);
      },
      error: () => alert('Failed to save user profile.')
    });
  }
}