import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  loginForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  serverErrors: string[] = [];
  showServerErrors = false;
  showPassword = false;


  get UserName() { return this.loginForm.get('UserName'); }

  get Password() {
    return this.loginForm.get('Password');
  }

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.serverErrors = [];
    this.showServerErrors = false;

    if (this.loginForm.invalid) {
      alert("Logged in Fiald!");
      return;
    }
  const formData = new FormData();
  formData.append("UserName", this.loginForm.value.UserName || '');
  formData.append("Password", this.loginForm.value.Password || '');
    this.authService.login(formData).subscribe({
      next: (res) => {
        alert("Logged in successfully!");
        if(this.authService.isAdmin())
        {
        this.router.navigate(['/admin']);
        }else{
        this.router.navigate(['/user']);
        }
      },
      error: (err) => {
        // console.error("Login failed:", err.error?.message);
        alert("Login failed. Please check your credentials.");
      }
    });

  }
}
