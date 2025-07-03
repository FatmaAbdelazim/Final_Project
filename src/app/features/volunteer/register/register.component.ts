import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthVolunteerService } from '../../../core/services/auth-volunteer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
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


  registerForm = this._FormBuilder.group({
  fullName: ['', [Validators.required, Validators.pattern(/^[\u0621-\u064Aa-zA-Z ]{2,}$/)]],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city: ['', [Validators.required]],
  password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/)]],
  rePassword: ['',Validators.required],
  profileImage: ['',[Validators.required]],
  interests: ['']
}, {
  validators: [this.confirmPass]
});


  confirmPass(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password')?.value;
  const rePassword = form.get('rePassword')?.value;

  return password === rePassword ? null : { mismatch: true };
}



  registerSubmit():void{
    if(this.registerForm.valid)
    {
      this.isLoading = true;
      this._AuthVolunteerService.register(this.registerForm.value).subscribe({
        next:(res) =>{
          this.isLoading = false;
          if(res.includes("successfully")){
            setTimeout(() => {
              alert(res);
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
      this.registerForm.setErrors({mismatch:true});
      this.registerForm.markAsTouched();
    }
  }
}
