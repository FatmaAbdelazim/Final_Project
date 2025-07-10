import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthVoluntaryOrganizationService } from '../../../core/services/auth-voluntary-organization.service';

@Component({
  selector: 'app-verify-code',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {
  private readonly _AuthVoluntaryOrganizationService = inject(AuthVoluntaryOrganizationService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  codeForm = this._FormBuilder.group({
    email:['', [Validators.required, Validators.email]]
  })

  digits: string[] = Array(6).fill('');
  verificationCode: string = '';

onInput(event: Event, index: number) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  if (!/^\d?$/.test(value)) {
    input.value = '';
    return;
  }

  this.digits[index] = value;

  if (value && index < 5) {
    const nextInput = document.getElementById('code' + (index + 1));
    (nextInput as HTMLElement)?.focus();
  }

  this.updateVerificationCode();
}

onKeyDown(event: KeyboardEvent, index: number) {
  const input = event.target as HTMLInputElement;

  if (event.key === 'Backspace' && !input.value && index > 0) {
    const prevInput = document.getElementById('code' + (index - 1));
    (prevInput as HTMLElement)?.focus();
  }
}

updateVerificationCode() {
  this.verificationCode = this.digits.join('');
}

  Send():void{
    if(this.codeForm.valid){
      if (this.verificationCode.length < 6) {
      alert('يجب إدخال رمز التحقق المكون من 6 أرقام');
      return;
    }
    const data={
    email : this.codeForm.value.email,
    otp: this.verificationCode
    }
    console.log('data ',data);
      this._AuthVoluntaryOrganizationService.verifyCode(data).subscribe({
        next:(value) =>{
          console.log(value);
          this._Router.navigate(['/reset-pass']);
        },
        error: (err) => {
  console.error('Error:', err);
}
      })
    }
    else {
    Object.values(this.codeForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }
  }
}
