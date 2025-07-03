import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class VoluntaryOrganizationRegisterComponent {
  registerForm = new FormGroup({
    organizationName: new FormControl(null, [Validators.required]),
    organizationEmail: new FormControl(null, [Validators.required, Validators.email]),
    organizationPhone: new FormControl(null, [Validators.required]),
    organizationLocationCity: new FormControl('', [Validators.required]),
    organizationNumber: new FormControl(null, [Validators.required]),
    organizationPassword: new FormControl(null, [Validators.required]),
    organizationConfirmPassowrd: new FormControl(null, [Validators.required]),
    organizationImage: new FormControl(null, [Validators.required]),
  });

  get organizationName() { return this.registerForm.get('organizationName'); }
  get organizationEmail() { return this.registerForm.get('organizationEmail'); }
  get organizationPhone() { return this.registerForm.get('organizationPhone'); }
  get organizationLocationCity() { return this.registerForm.get('organizationLocationCity'); }
  get organizationNumber() { return this.registerForm.get('organizationNumber'); }
  get organizationPassword() { return this.registerForm.get('organizationPassword'); }
  get organizationConfirmPassword() { return this.registerForm.get('organizationConfirmPassword'); }
  get organizationImage() { return this.registerForm.get('organizationImage'); }

  fileName: string | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
    } else {
      this.fileName = '';
    }
  }

}
