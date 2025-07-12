import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { AuthVoluntaryOrganizationService } from '../../../core/services/auth-voluntary-organization.service';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   constructor(private _AuthVoluntaryOrganizationService: AuthVoluntaryOrganizationService, private _router: Router) { }
     loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

 login(){
  if (this.loginForm.invalid) {
      // console.log(this.loginForm.value);
    alert('الرجاء تعبئة جميع الحقول بشكل صحيح');
    return;
  }

  console.log(this.loginForm.value);
  this._AuthVoluntaryOrganizationService.login(this.loginForm.value).subscribe({
   next: (response) => {
    // console.log('Response from server:', response);
    localStorage.setItem("userToken", response.token)
    this._AuthVoluntaryOrganizationService.decodeUserData();
    alert('تم التسجيل الدخول بنجاح :)');
    this._router.navigate(['/home']);
  },
    error: (e) => {
      console.log(e);
      alert('لم يتم التسجيل، المشكلة: ' + (e?.error?.message || e));
    }
  });

 }
}
