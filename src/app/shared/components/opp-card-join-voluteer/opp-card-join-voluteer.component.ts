import { Component, Input } from '@angular/core';
import { VolunteerOppAttendence } from '../../../models/volunteer-opp-attendence';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opp-card-join-voluteer',
  imports: [CommonModule],
  templateUrl: './opp-card-join-voluteer.component.html',
  styleUrl: './opp-card-join-voluteer.component.css'
})
export class OppCardJoinVoluteerComponent {
     @Input() volAttendence!: VolunteerOppAttendence;
}
