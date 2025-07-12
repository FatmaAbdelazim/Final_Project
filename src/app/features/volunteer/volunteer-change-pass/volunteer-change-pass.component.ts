import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthVoluntaryOrganizationService } from '../../../core/services/auth-voluntary-organization.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-volunteer-change-pass',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './volunteer-change-pass.component.html',
  styleUrl: './volunteer-change-pass.component.css'
})
export class VolunteerChangePassComponent {
  constructor(private _AuthVoluntaryOrganizationService: AuthVoluntaryOrganizationService) { }

  confirmPass: ValidatorFn = (registerForm: AbstractControl): ValidationErrors | null => {
    const password = registerForm.get('newPassword')?.value;
    const confirmPassword = registerForm.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordmatch: true };
    }
    return null;
  };

  changeForm = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),

  }, { validators: this.confirmPass });

  get currentPassword() { return this.changeForm.get('currentPassword'); }
  get newPassword() { return this.changeForm.get('newPassword'); }
  get confirmPassword() { return this.changeForm.get('confirmPassword'); }
  changPass() {
    console.log(this.changeForm.value);
    if (this.changeForm.invalid) {
      alert('الرجاء تعبئة جميع الحقول بشكل صحيح');
      return;
    }

    console.log(this.changeForm.value);
    this._AuthVoluntaryOrganizationService.changPass(this.changeForm.value).subscribe({
      next: (response) => {
        alert('تم تغيير كلمة المرور بنجاح :)');
        console.log(response)
      },
      error: (err: HttpErrorResponse) => {
    if (typeof err.error === 'string') {
      alert(err.error); 
    } else {
      alert('حدث خطأ غير متوقع');
    }
  }
    });

  }
}
