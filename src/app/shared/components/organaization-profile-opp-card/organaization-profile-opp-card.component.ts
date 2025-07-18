import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-organaization-profile-opp-card',
  imports: [CommonModule],
  templateUrl: './organaization-profile-opp-card.component.html',
  styleUrl: './organaization-profile-opp-card.component.css'
})
export class OrganaizationProfileOppCardComponent {
   @Input() opp!:any;
}
