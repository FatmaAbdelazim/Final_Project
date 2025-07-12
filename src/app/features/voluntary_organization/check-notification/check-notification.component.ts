import { OrganizationDashboardService } from './../../../core/services/organization-dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-notification',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './check-notification.component.html',
  styleUrl: './check-notification.component.css'
})
export class OrganaiztionCheckNotificationComponent implements OnInit {
  notifyOnApplicationAcceptedValue!: false;
  notifyOnCertificateIssuedValue!: false;
  notifyOnOpportunityRecommendationsValue!: false

  constructor(private _OrganizationDashboardService: OrganizationDashboardService) { }
  changeForm = new FormGroup({
    notifyOnNewVolunteerApplication: new FormControl(false, [Validators.required]),
    notifyOnVolunteerApplicationUnderReview: new FormControl(false, [Validators.required]),
    notifyOnOpportunityCompleted: new FormControl(false, [Validators.required]),
  });
  ngOnInit(): void {
    this.getPreferencesNotif();
    
  }

  get notifyOnNewVolunteerApplication() { return this.changeForm.get('notifyOnNewVolunteerApplication'); }
  get notifyOnVolunteerApplicationUnderReview() { return this.changeForm.get('notifyOnVolunteerApplicationUnderReview'); }
  get notifyOnOpportunityCompleted() { return this.changeForm.get('notifyOnOpportunityCompleted'); }

  checkNotifications() {
    console.log(this.changeForm.value);
    if (this.changeForm.invalid) {
      alert('الرجاء تعبئة جميع الحقول بشكل صحيح');
      return;
    }

    console.log(this.changeForm.value);
    this._OrganizationDashboardService.updatePreferencesNotif(this.changeForm.value).subscribe({
      next: (response) => {
        alert('تم حفظ التغيرات بنجاح :)');
        console.log(response)
      },
      error: (err: HttpErrorResponse) => {
        if (typeof err.error === 'string') {
          alert(err.error);
        } else {
          alert('حدث خطأ غير متوقع');
        }
      }
    });

  }
  getPreferencesNotif() {
    this._OrganizationDashboardService.getPreferencesNotif().subscribe({
      next: (response) => {
        this.changeForm.patchValue({
          notifyOnNewVolunteerApplication: response.notifyOnNewVolunteerApplication,
          notifyOnVolunteerApplicationUnderReview: response.notifyOnVolunteerApplicationUnderReview,
          notifyOnOpportunityCompleted: response.notifyOnOpportunityCompleted
        });
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
