import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VolunteerDashboardService } from '../../../../core/services/volunteer-dashboard.service';
import { Volunteer } from '../../../../models/volunteer-certificate';
import { AuthVoluntaryOrganizationService } from '../../../../core/services/auth-voluntary-organization.service';

@Component({
  selector: 'app-volunteer-info',
  imports: [ReactiveFormsModule],
  templateUrl: './volunteer-info.component.html',
  styleUrl: './volunteer-info.component.css'
})
export class VolunteerInfoComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    private readonly _VolunteerDashboardService = inject(VolunteerDashboardService)
    private readonly _AuthVoluntaryOrganizationService = inject(AuthVoluntaryOrganizationService)
    private readonly _FormBuilder = inject(FormBuilder)

    isLoading :boolean = false;
    vol! : Volunteer;
    id! : string
    fileName: string | null = null;
    fileToUpload: File | null = null;
    previewImageUrl :string |null= ''

    form = this._FormBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[\u0621-\u064Aa-zA-Z ]{2,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      city: ['', [Validators.required]]
    })

    ngOnInit(): void {
      this._AuthVoluntaryOrganizationService.decodeUserData();
      this.id = this._AuthVoluntaryOrganizationService.userData.id;
      this._VolunteerDashboardService.getData(this.id).subscribe({
        next:(value)=> {
          this.vol = value
          this.form.patchValue(this.vol);
        },
      })
    }

    triggerFileInput() {
      this.fileInput.nativeElement.click();
    }

    onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    this.fileToUpload = input.files[0];
    this.fileName = this.fileToUpload.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageUrl = reader.result as string;
    };
    reader.readAsDataURL(this.fileToUpload);
  } else {
    this.fileToUpload = null;
    this.fileName = null;
    this.previewImageUrl = null;
  }
}


    update(): void {
  if (this.form.valid) {
    const formData = new FormData();
    formData.append('Id', this.id ?? '');
    formData.append('FullName', this.form.get('fullName')?.value ?? '');
    formData.append('Email', this.form.get('email')?.value ?? '');
    formData.append('PhoneNumber', this.form.get('phoneNumber')?.value ?? '');
    formData.append('City', this.form.get('city')?.value ?? '');

    if (this.fileToUpload) {
      formData.append('Image', this.fileToUpload);
    }
for (const pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

    this.isLoading = true;
    this._VolunteerDashboardService.updateVolInfo(this.id, formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert("تم التعديل");
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      }
    });
  } else {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });
  }
}
}
