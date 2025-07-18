import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-organaization-profile-team-card',
  imports: [CommonModule],
  templateUrl: './organaization-profile-team-card.component.html',
  styleUrl: './organaization-profile-team-card.component.css'
})
export class OrganaizationProfileTeamCardComponent {
  @Input() team!: any;
}
