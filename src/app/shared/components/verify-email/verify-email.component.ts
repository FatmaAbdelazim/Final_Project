import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthVoluntaryOrganizationService } from '../../../core/services/auth-voluntary-organization.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent {
  private readonly _AuthVoluntaryOrganizationService = inject(AuthVoluntaryOrganizationService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  emailForm = this._FormBuilder.group({
    email:['', [Validators.required, Validators.email]]
  })
  Send():void{
    if(this.emailForm.valid){
      this._AuthVoluntaryOrganizationService.sendEmail(this.emailForm.value).subscribe({
        next:(value) =>{
          this._Router.navigate(['/verify-code']);
        },
        error(err) {
          console.log(err);
        },
      })
    }
  }
}
