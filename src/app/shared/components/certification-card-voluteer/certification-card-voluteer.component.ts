import { Component, Input, OnInit } from '@angular/core';
import { VolunteerCertificate } from '../../../models/volunteer-certificate';
import { CommonModule } from '@angular/common';
import { VolunteerDashboardService } from '../../../core/services/volunteer-dashboard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-certification-card-voluteer',
  imports: [CommonModule,FormsModule],
  templateUrl: './certification-card-voluteer.component.html',
  styleUrl: './certification-card-voluteer.component.css'
})
export class CertificationCardVoluteerComponent implements OnInit{
    downUrl!: string;
  @Input() volCertification!: VolunteerCertificate;
  constructor(private _VolunteerDashboardService: VolunteerDashboardService) { }
  ngOnInit(): void {
    this.downUrl = this.volCertification.downloadUrl.split('/').pop() || '';
  }

  
downloadCertificateVol(): void {
  this._VolunteerDashboardService.downloadVolunteerCertification(this.downUrl).subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificate.pdf'; // أو `${this.volCertification.title}.pdf`
      a.click();
      window.URL.revokeObjectURL(url); // تنظيف
    },
    error: (err) => {
      console.error('Download failed:', err);
    }
  });
}
}
