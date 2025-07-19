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
      this.fileName = input.files[0].name;
      this.fileToUpload = input.files[0];
    } else {
      this.fileName = null;
      this.fileToUpload = null;
    }
  }

    update():void{
      if(this.form.valid)
      {
      let data = {
        id: this.id ?? '',
        fullName: this.form.get("fullName")?.value ?? '',
        email: this.form.get("email")?.value ?? '',
        phoneNumber: this.form.get("phoneNumber")?.value ?? '',
        city: this.form.get("city")?.value ?? '',
        image: ''
      }
    if (this.fileToUpload) {
      data.image =this.fileToUpload?.name;
    }

        this.isLoading = true;
        console.log(data);
        this._VolunteerDashboardService.updateVolInfo(this.id,data).subscribe({
          next: (value)=>{
            this.isLoading = false;
            console.log(value)
            alert("تم التعديل")
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
