import { Component } from '@angular/core';
import { TeamCardComponent } from "../../shared/components/team-card/team-card.component";

@Component({
  selector: 'app-teams',
  imports: [TeamCardComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {

}
