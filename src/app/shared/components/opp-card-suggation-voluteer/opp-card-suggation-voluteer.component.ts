import { Component, Input } from '@angular/core';
import { VolunteerRecommendedOpportunities } from '../../../models/volunteer-recommended-opportunities';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Opportunity } from '../../../models/opportunty';

@Component({
  selector: 'app-opp-card-suggation-voluteer',
  imports: [CommonModule , RouterLink],
  templateUrl: './opp-card-suggation-voluteer.component.html',
  styleUrl: './opp-card-suggation-voluteer.component.css'
})
export class OppCardSuggationVoluteerComponent {
      @Input() volunteerOppRecommended!: Opportunity;
}
