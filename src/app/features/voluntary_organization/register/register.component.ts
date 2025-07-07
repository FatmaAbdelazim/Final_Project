import { AuthVoluntaryOrganizationService } from './../../../core/services/auth-voluntary-organization.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class VoluntaryOrganizationRegisterComponent {
  fileName: string | null = null;

  constructor(private _AuthVoluntaryOrganizationService: AuthVoluntaryOrganizationService, private _router: Router) { }

  confirmPass: ValidatorFn = (registerForm: AbstractControl): ValidationErrors | null => {
    const password = registerForm.get('organizationPassword')?.value;
    const confirmPassword = registerForm.get('organizationConfirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordmatch: true };
    }
    return null;
  };
fileToUpload: File | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.fileName = input.files[0].name;
    this.fileToUpload = input.files[0]; // خزّن الملف في متغير مستقل
  } else {
    this.fileName = null;
    this.fileToUpload = null;
  }
}


  registerForm = new FormGroup({
    organizationName: new FormControl(null, [Validators.required]),
    organizationEmail: new FormControl(null, [Validators.required, Validators.email]),
    organizationPhone: new FormControl(null, [Validators.required]),
    organizationLocationCity: new FormControl('', [Validators.required]),
    organizationNumber: new FormControl(null, [Validators.required]),
    organizationPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    organizationConfirmPassword: new FormControl(null, [Validators.required]),
    // organizationImage: new FormControl<File | null>(null, [Validators.required])
  }, { validators: this.confirmPass });

  get organizationName() { return this.registerForm.get('organizationName'); }
  get organizationEmail() { return this.registerForm.get('organizationEmail'); }
  get organizationPhone() { return this.registerForm.get('organizationPhone'); }
  get organizationLocationCity() { return this.registerForm.get('organizationLocationCity'); }
  get organizationNumber() { return this.registerForm.get('organizationNumber'); }
  get organizationPassword() { return this.registerForm.get('organizationPassword'); }
  get organizationConfirmPassword() { return this.registerForm.get('organizationConfirmPassword'); }
  // get organizationImage() { return this.registerForm.get('organizationImage'); }

 register() {
  if (this.registerForm.invalid) {
    alert('الرجاء تعبئة جميع الحقول بشكل صحيح.');
    return;
  }

  const formData = new FormData();
  formData.append('OrganizationName', this.organizationName?.value ?? '');
  formData.append('Email', this.organizationEmail?.value ?? '');
  formData.append('Phone', this.organizationPhone?.value ?? '');
  formData.append('City', this.organizationLocationCity?.value ?? '');
  formData.append('Password', this.organizationPassword?.value ?? '');
  formData.append('ConfirmPassword', this.organizationConfirmPassword?.value ?? '');
  formData.append('CommercialRegistration', this.organizationNumber?.value ?? '');

  if (this.fileToUpload) {
    formData.append('ProfileImage', this.fileToUpload, this.fileToUpload.name);
  }
  console.log(this.registerForm.value);
  // طباعة محتويات FormData للتأكد
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }

  this._AuthVoluntaryOrganizationService.register(formData).subscribe({
   next: (response) => {
    console.log('Response from server:', response);
    alert('تم التسجيل بنجاح :)');
    this._router.navigate(['/login']);
  },
    error: (e) => {
      console.log(e);
      alert('لم يتم التسجيل، المشكلة: ' + (e?.error?.message || e));
    }
  });
}

}
