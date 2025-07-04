import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthVolunteerService } from '../../../core/services/auth-volunteer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class VolunteerRegisterComponent implements OnInit{


  ngOnInit(): void {
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
  this.registerForm.updateValueAndValidity({ onlySelf: false });
});
this.registerForm.get('rePassword')?.valueChanges.subscribe(() => {
  this.registerForm.updateValueAndValidity({ onlySelf: false });
});

  }

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthVolunteerService = inject(AuthVolunteerService)
  private readonly _Router = inject(Router)

  err:string="";
  isLoading: boolean = false;
  fileName: string | null = null;
  fileToUpload: File | null = null;
  interestsList: string[] = [
  'التنمية الاجتماعية',
  'الأطفال',
  'الصحة',
  'البيئة',
  'التكنولوجيا',
  'كبار السن'
];



  confirmPass: ValidatorFn = (registerForm: AbstractControl): ValidationErrors | null => {
    const password = registerForm.get('password')?.value;
    const confirmPassword = registerForm.get('rePassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordmatch: true };
    }
    return null;
  };

  registerForm = this._FormBuilder.group({
  fullName: ['', [Validators.required, Validators.pattern(/^[\u0621-\u064Aa-zA-Z ]{2,}$/)]],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city: ['', [Validators.required]],
  password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/)]],
  rePassword: ['',Validators.required],
  interests: this._FormBuilder.array([])
}, {
  validators: [this.confirmPass]
});


get interestsArray(): any[] {
  const control = this.registerForm.get('interests');
  return Array.isArray(control?.value) ? control?.value : [];
}


onCheckboxChange(event: any) {
  const interests: FormArray = this.registerForm.get('interests') as FormArray;
  const value = event.target.value;

  if (event.target.checked) {
    if (!interests.value.includes(value)) {
      interests.push(this._FormBuilder.control(value));
    }
  } else {
    const index = interests.controls.findIndex(x => x.value === value);
    if (index >= 0) {
      interests.removeAt(index);
    }
  }
}



onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.fileName = input.files[0].name;
    this.fileToUpload = input.files[0];
  } else {
    this.fileName = null;
    this.fileToUpload = null;
  }
}


  registerSubmit():void{
    if(this.registerForm.valid)
    {
      const formData = new FormData();
  formData.append('FullName', this.registerForm.get("fullName")?.value ?? '');
  formData.append('Email', this.registerForm.get("email")?.value ?? '');
  formData.append('PhoneNumber', this.registerForm.get("phone")?.value ?? '');
  formData.append('City', this.registerForm.get("city")?.value ?? '');
  formData.append('Password', this.registerForm.get("password")?.value ?? '');
  formData.append('ConfirmPassword', this.registerForm.get("rePassword")?.value ?? '');
  formData.append('Interests', JSON.stringify(this.registerForm.get("interests")?.value ?? []));

  if (this.fileToUpload) {
    formData.append('ProfileImage', this.fileToUpload, this.fileToUpload.name);
  }

  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }
      this.isLoading = true;
      console.log(formData);
      this._AuthVolunteerService.register(formData).subscribe({
        next:(res) =>{
          this.isLoading = false;
          console.log(res)
          if(res.includes("successfully")){
            setTimeout(() => {
              alert("تم انشاء الحساب بنجاح");
              this._Router.navigate(['/login'])
            }, 2000);
          }
        },
        error:(err)=>{
          console.log(err);
          this.err = err;
          this.isLoading = false;
        }
      })
    }
    else{
      // this.registerForm.setErrors({mismatch:true});
      Object.values(this.registerForm.controls).forEach(control => {
  control.markAsTouched();
  control.updateValueAndValidity();
});

    }
  }
}
