import { OrganizationDashboardService } from './../../../core/services/organization-dashboard.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-opp',
  imports: [FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './add-opp.component.html',
  styleUrl: './add-opp.component.css'
})
export class AddOppComponent {

  constructor(private _OrganizationDashboardService: OrganizationDashboardService) { }

  fileToUpload!: File | null;
  fileName!: string | null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
      this.fileToUpload = input.files[0];// ل
    } else {
      this.fileName = null;
      this.fileToUpload = null;
    }
  }

  addForm = new FormGroup({
    Title: new FormControl(null, [Validators.required]),
    Description: new FormControl(null, [Validators.required]),
    Location: new FormControl(null, [Validators.required]),
    StartDate: new FormControl('', [Validators.required]),
    EndDate: new FormControl(null, [Validators.required]),
    GenderRequirement: new FormControl(null, [Validators.required]),
    RequiredVolunteers: new FormControl(null, [Validators.required]),
    Conditions: new FormControl(null, [Validators.required]),
    OrganizationName: new FormControl(null, [Validators.required]),
    CategoryName: new FormControl(null, [Validators.required]),
    IsAttendanceTracked: new FormControl(null, [Validators.required]),
    IsCertificateAvailable: new FormControl(null, [Validators.required]),
    TotalHours: new FormControl(null, [Validators.required]),
    TeamName: new FormControl(null, [Validators.required]),
    RequiredSkillsIds: new FormControl(null, [Validators.required]),
    Image: new FormControl<File | null>(null, [Validators.required])
  });

  get Title() { return this.addForm.get('Title'); }
  get Description() { return this.addForm.get('Description'); }
  get Location() { return this.addForm.get('Location'); }
  get StartDate() { return this.addForm.get('StartDate'); }
  get EndDate() { return this.addForm.get('EndDate'); }
  get GenderRequirement() { return this.addForm.get('GenderRequirement'); }
  get RequiredVolunteers() { return this.addForm.get('RequiredVolunteers'); }
  get Conditions() { return this.addForm.get('Conditions'); }
  get OrganizationName() { return this.addForm.get('OrganizationName'); }
  get CategoryName() { return this.addForm.get('CategoryName'); }
  get IsAttendanceTracked() { return this.addForm.get('IsAttendanceTracked'); }
  get IsCertificateAvailable() { return this.addForm.get('IsCertificateAvailable'); }
  get TotalHours() { return this.addForm.get('TotalHours'); }
  get TeamName() { return this.addForm.get('TeamName'); }
  get RequiredSkillsIds() { return this.addForm.get('RequiredSkillsIds'); }
  get Image() { return this.addForm.get('Image'); }

  addOpp() {
    if (this.addForm.invalid) {
      alert("يجب تعبئة جميع الحقول");
      return;
    }
    const formData = new FormData();
    formData.append('Title', this.Title?.value ?? '');
    formData.append('Description', this.Description?.value ?? '');
    formData.append('CategoryName', this.CategoryName?.value ?? '');
    formData.append('OrganizationName', this.OrganizationName?.value ?? '');
    formData.append('TeamName', this.TeamName?.value ?? '');
    formData.append('Image', this.Image?.value ?? '');
    formData.append('GenderRequirement', this.GenderRequirement?.value ?? '');
    formData.append('TotalHours', this.TotalHours?.value ?? '');
    formData.append('RequiredSkillsIds', this.RequiredSkillsIds?.value ?? '');
    formData.append('RequiredVolunteers', this.RequiredVolunteers?.value ?? '');
    formData.append('IsAttendanceTracked', this.IsAttendanceTracked?.value ?? '');
    formData.append('IsCertificateAvailable', this.IsCertificateAvailable?.value ?? '');
    formData.append('Location', this.Location?.value ?? '');
    formData.append('StartDate', this.StartDate?.value ?? '');
    formData.append('EndDate', this.EndDate?.value ?? '');


    this._OrganizationDashboardService.addOpp(formData).subscribe({
      next: () => {
        alert("تم نشر الفرصة بنجاح :)");
      },
      error: (e) => {
        alert(e.error);
      }
    })
  }
}
