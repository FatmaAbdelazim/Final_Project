import { Component } from '@angular/core';
import { OppCardVoluteerComponent } from "../../../shared/components/opp-card-voluteer/opp-card-voluteer.component";
import { OppCardSuggationVoluteerComponent } from "../../../shared/components/opp-card-suggation-voluteer/opp-card-suggation-voluteer.component";

@Component({
  selector: 'app-volunteer-home',
  imports: [OppCardVoluteerComponent, OppCardSuggationVoluteerComponent],
  templateUrl: './volunteer-home.component.html',
  styleUrl: './volunteer-home.component.css'
})
export class VolunteerHomeComponent {

}
