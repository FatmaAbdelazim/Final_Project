import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Team } from '../../../models/team';

@Component({
  selector: 'app-team-card',
  imports: [RouterLink],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.css'
})
export class TeamCardComponent {
  @Input() team!: Team;
}
