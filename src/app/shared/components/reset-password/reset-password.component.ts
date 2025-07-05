import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthVoluntaryOrganizationService } from '../../../core/services/auth-voluntary-organization.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  private readonly _AuthVoluntaryOrganizationService = inject(AuthVoluntaryOrganizationService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  confirmPass: ValidatorFn = (registerForm: AbstractControl): ValidationErrors | null => {
    const password = registerForm.get('newPassword')?.value;
    const confirmPassword = registerForm.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordmatch: true };
    }
    return null;
  };

  resetForm = this._FormBuilder.group({
    email:['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/)]],
    confirmPassword: ['',Validators.required],
  },{
  validators: [this.confirmPass]
})

  Send():void{
    if(this.resetForm.valid){
      console.log(this.resetForm.value)
      this._AuthVoluntaryOrganizationService.resetPass(this.resetForm.value).subscribe({
        next:(value) =>{
          console.log(value)
          this._Router.navigate(['/login']);
        },
        error(err) {
          console.log(err);
        },
      })
    }
    else{
      Object.values(this.resetForm.controls).forEach(control => {
  control.markAsTouched();
  control.updateValueAndValidity();
  });
  }
}
}
