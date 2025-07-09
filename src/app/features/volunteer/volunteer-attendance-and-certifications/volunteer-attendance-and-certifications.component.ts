import { Component } from '@angular/core';
import { OppCardJoinVoluteerComponent } from "../../../shared/components/opp-card-join-voluteer/opp-card-join-voluteer.component";
import { CertificationCardVoluteerComponent } from "../../../shared/components/certification-card-voluteer/certification-card-voluteer.component";

@Component({
  selector: 'app-volunteer-attendance-and-certifications',
  imports: [ OppCardJoinVoluteerComponent, CertificationCardVoluteerComponent],
  templateUrl: './volunteer-attendance-and-certifications.component.html',
  styleUrl: './volunteer-attendance-and-certifications.component.css'
})
export class VolunteerAttendanceAndCertificationsComponent {

}
