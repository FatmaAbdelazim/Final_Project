import { RegisterDTO } from './../../Models/register-dto';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    ConfirmPassword: new FormControl('', Validators.required),
    Phone: new FormControl('', Validators.required),
    DateOfBirth: new FormControl('', Validators.required),
    Gender: new FormControl('', Validators.required),
    Agree: new FormControl(false, [Validators.requiredTrue])
  });
  constructor(private authService: AuthService, private router: Router) {

  }
  showPassword = false;
  serverErrors: string[] = [];
  showServerErrors = false;
  acceptedTerms = false;
  isLoading = false;
  get UserName() { return this.registerForm.get('UserName'); }
  get Email() { return this.registerForm.get('Email'); }
  get Password() { return this.registerForm.get('Password'); }
  get ConfirmPassword() { return this.registerForm.get('ConfirmPassword'); }
  get Phone() { return this.registerForm.get('Phone'); }
  get DateOfBirth() { return this.registerForm.get('DateOfBirth'); }
  get Gender() { return this.registerForm.get('Gender'); }
  get Agree() { return this.registerForm.get('Agree'); }
  onSubmit() {
    this.isLoading = true;
    this.serverErrors = [];
    this.showServerErrors = false;

    if (this.Password?.value !== this.ConfirmPassword?.value) {
      alert("Password and Confirm Password do not match");
      this.serverErrors.push('Password and Confirm Password do not match.');
      this.showServerErrors = true;
      return;
    }

    if (this.registerForm.invalid) {
      // console.log(this.registerForm.value);
      alert("This Data not Valid");
      return;
    }

    const dto = this.registerForm.value;
    this.authService.register(dto).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert("Registered successfully");
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        // console.error("Registration failed:", err);
        alert("Registration failed. Please check your credentials.");
      }
    });
  }
}
