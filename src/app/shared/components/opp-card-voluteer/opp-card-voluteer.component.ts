import { Component, Input } from '@angular/core';
import { VolunteerOpportuinties } from '../../../models/volunteer-opportuinties';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opp-card-voluteer',
  imports: [CommonModule],
  templateUrl: './opp-card-voluteer.component.html',
  styleUrl: './opp-card-voluteer.component.css'
})
export class OppCardVoluteerComponent {
    @Input() volunteerOpp!:VolunteerOpportuinties;
}
