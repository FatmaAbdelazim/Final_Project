import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { OrganizationDashboardService } from '../../../../core/services/organization-dashboard.service';
import { Organization } from '../../../../models/organization';
import { AuthVoluntaryOrganizationService } from '../../../../core/services/auth-voluntary-organization.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization-info',
  imports: [ReactiveFormsModule],
  templateUrl: './organization-info.component.html',
  styleUrl: './organization-info.component.css'
})
export class OrganizationInfoComponent implements OnInit{
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private readonly _OrganizationDashboardService = inject(OrganizationDashboardService)
  private readonly _AuthVoluntaryOrganizationService = inject(AuthVoluntaryOrganizationService)
  private readonly _FormBuilder = inject(FormBuilder)

  isLoading :boolean = false;
  org! : Organization;
  id! : string
  fileName: string | null = null;
  fileToUpload: File | null = null;
  previewImageUrl :string = ''

  form = this._FormBuilder.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[\u0621-\u064Aa-zA-Z ]{2,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    city: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this._AuthVoluntaryOrganizationService.decodeUserData();
    this.id = this._AuthVoluntaryOrganizationService.userData.id;
    this._OrganizationDashboardService.getOrgInfo(this.id).subscribe({
      next:(value)=> {
        this.org = value
        this.form.patchValue({
        fullName : this.org.organizationName,
        email : this.org.email,
        phone : this.org.phoneNumber,
        city : this.org.city
    });
      },
    })
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const reader = new FileReader();
reader.onload = () => {
  this.org.logoFile = '';
  this.previewImageUrl = reader.result as string;
};
reader.readAsDataURL(this.fileToUpload!);

  if (input.files && input.files.length > 0) {
    this.fileName = input.files[0].name;
    this.fileToUpload = input.files[0];
  } else {
    this.fileName = null;
    this.fileToUpload = null;
  }
}

  deleteLogo(){
    this.fileName = null;
    this.fileToUpload = null
  }

  update():void{
    if(this.form.valid)
    {
      const formData = new FormData();
      formData.append('Id', this.id ?? '');
      formData.append('OrganizationName', this.form.get("fullName")?.value ?? '');
      formData.append('Email', this.form.get("email")?.value ?? '');
      formData.append('PhoneNumber', this.form.get("phone")?.value ?? '');
      formData.append('City', this.form.get("city")?.value ?? '');

  if (this.fileToUpload) {
    formData.append('LogoFile', this.fileToUpload, this.fileToUpload?.name);
  }

  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }
      this.isLoading = true;
      console.log(formData);
      this._OrganizationDashboardService.updateOrgInfo(formData).subscribe({
        next: (value)=>{
          this.isLoading = false;
          console.log(value)
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
        }
      })
    }
    else{
      Object.values(this.form.controls).forEach(control => {
  control.markAsTouched();
  control.updateValueAndValidity();
});

    }
  }
}
