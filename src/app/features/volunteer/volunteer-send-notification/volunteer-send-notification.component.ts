import { HttpErrorResponse } from '@angular/common/http';
import { VolunteerDashboardService } from './../../../core/services/volunteer-dashboard.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-volunteer-send-notification',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './volunteer-send-notification.component.html',
  styleUrl: './volunteer-send-notification.component.css'
})
export class VolunteerSendNotificationComponent implements OnInit {
  notifyOnApplicationAcceptedValue!: false;
  notifyOnCertificateIssuedValue!: false;
  notifyOnOpportunityRecommendationsValue!: false

  constructor(private _VolunteerDashboardService: VolunteerDashboardService) { }
  changeForm = new FormGroup({
    notifyOnApplicationAccepted: new FormControl(false, [Validators.required]),
    notifyOnCertificateIssued: new FormControl(false, [Validators.required]),
    notifyOnOpportunityRecommendations: new FormControl(false, [Validators.required]),

  });
  ngOnInit(): void {
    this.getPreferencesNotif();
  }

  get notifyOnApplicationAccepted() { return this.changeForm.get('notifyOnApplicationAccepted'); }
  get notifyOnCertificateIssued() { return this.changeForm.get('notifyOnCertificateIssued'); }
  get notifyOnOpportunityRecommendations() { return this.changeForm.get('notifyOnOpportunityRecommendations'); }

  checkNotifications() {
    console.log(this.changeForm.value);
    if (this.changeForm.invalid) {
      alert('الرجاء تعبئة جميع الحقول بشكل صحيح');
      return;
    }

    console.log(this.changeForm.value);
    this._VolunteerDashboardService.updatePreferencesNotif(this.changeForm.value).subscribe({
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
    this._VolunteerDashboardService.getPreferencesNotif().subscribe({
      next: (response) => {
        this.changeForm.patchValue({
          notifyOnApplicationAccepted: response.notifyOnApplicationAccepted,
          notifyOnCertificateIssued: response.notifyOnCertificateIssued,
          notifyOnOpportunityRecommendations: response.notifyOnOpportunityRecommendations
        });
      },
      error: (e) => {
        console.error;
      }
    });
  }
}
