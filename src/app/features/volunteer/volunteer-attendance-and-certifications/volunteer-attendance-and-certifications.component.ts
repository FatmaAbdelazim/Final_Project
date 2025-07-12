import { Component, OnInit } from '@angular/core';
import { OppCardJoinVoluteerComponent } from "../../../shared/components/opp-card-join-voluteer/opp-card-join-voluteer.component";
import { CertificationCardVoluteerComponent } from "../../../shared/components/certification-card-voluteer/certification-card-voluteer.component";
import { VolunteerOppAttendence } from '../../../models/volunteer-opp-attendence';
import { VolunteerCertificate } from '../../../models/volunteer-certificate';
import { VolunteerDashboardService } from '../../../core/services/volunteer-dashboard.service';

@Component({
  selector: 'app-volunteer-attendance-and-certifications',
  imports: [ OppCardJoinVoluteerComponent, CertificationCardVoluteerComponent],
  templateUrl: './volunteer-attendance-and-certifications.component.html',
  styleUrl: './volunteer-attendance-and-certifications.component.css'
})
export class VolunteerAttendanceAndCertificationsComponent implements OnInit{
  StatisticsAttendenceList!: any;
  allAtt= false;
    allCert= false;
  volunteerAttendenceOpportuintiesList!: VolunteerOppAttendence[];
  volunteerCertificationsList!: VolunteerCertificate[];
  constructor(private _VolunteerDashboardService: VolunteerDashboardService) { }
  ngOnInit(): void {
      this.getAllVolunteerAttendenceOpportunites();
      this.getAllVolunteerCertifications();
      this.getStatisticsOppForVolunteerAttendence();
  }


  getAllVolunteerAttendenceOpportunites() {
    this._VolunteerDashboardService.getOppVolunteerParticipations().subscribe({
      next: (response) => {
        this.volunteerAttendenceOpportuintiesList = response;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  getAllVolunteerCertifications() {
    this._VolunteerDashboardService.getVolunteerCertifications().subscribe({
      next: (response) => {
        this.volunteerCertificationsList = response;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  getStatisticsOppForVolunteerAttendence(){
    this._VolunteerDashboardService.getStatisticsOppForVolunteerAttendence().subscribe({
      next: (response) => {
        this.StatisticsAttendenceList = response;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  displayAllAtt(){
        this.allAtt = true;
  }
    displayAllCert(){
        this.allCert = true;
  }
}