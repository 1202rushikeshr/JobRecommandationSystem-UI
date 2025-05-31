import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
   user: any = {};
  resumeFile!: File;
  profileForm: boolean = false;
  uploadSection: boolean = false;

  email: string = '';
  firstName: string = '';
  lastName: string = '';
  selectedFile:any;
  fileUpload = new FormGroup({
    uploadResume: new FormControl('', Validators.required),
  });
  userProfileForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    currentLocation: new FormControl('', Validators.required),
    skills: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required), 
    relocate: new FormControl('', Validators.required),
    workAuthorization: new FormControl('', Validators.required),
    totalExperience: new FormControl('', Validators.required),
  });

  constructor(private auth:AuthService,private userService: UserService, private router: Router) {}
  
  ngOnInit(): void {
      this.auth.getAuth0User$().subscribe(user => {
      console.log('Logged-in user:', user);
      if (user) {
        console.log(user)
        this.userProfileForm.patchValue({
          email: user.email,
        })
        // this.userProfileForm[this.email] = 'vallapu@gamil.com';
        // this.email = user.email || '';
        // this.firstName = user.given_name || '';
        // this.lastName = user.family_name || '';
      }
      });
      this.auth.getOrRenewAccessToken$().subscribe(token => {
      console.log('Access Token:', token);  
      }); 
    }
    submitResume(){
      console.log(this.fileUpload.value)
      this.profileForm = true;
      this.uploadSection = true;
    }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.resumeFile = file;
    } else {
      alert('Please upload a valid PDF file.');
    }
  }

  test(){
    const formData = this.userProfileForm.value;
    console.log(formData);
  }
  onSubmit(){
    if(this.userProfileForm.valid){
      let formData = this.userProfileForm.value;
    // formData.append('user', new Blob([JSON.stringify(this.user)], { type: 'application/json' }));
    // if (this.resumeFile) {
    //   formData.append('resume', this.resumeFile);
    // }
    
    this.userService.addUserToBackend(this.userProfileForm.value).subscribe({
      next: () => {
        alert('User profile saved successfully!');
        this.router.navigate(['/landing']);
      },
      error: () => alert('Failed to save user profile.')
    });
    }
    
  }
}