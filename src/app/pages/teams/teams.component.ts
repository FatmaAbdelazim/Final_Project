import { Component, OnInit } from '@angular/core';
import { TeamCardComponent } from "../../shared/components/team-card/team-card.component";
import { TeamsService } from '../../core/services/teams.service';
import { Team } from '../../models/team';

@Component({
  selector: 'app-teams',
  imports: [TeamCardComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit {
  teamsList!: Team[];
  noTeams = false;
  constructor(private _TeamsService: TeamsService) { }
  ngOnInit(): void {
    this.getAllTeams();
  }
  getAllTeams() {
    this._TeamsService.getAllTeams().subscribe({
      next: (response) => {
        this.teamsList = response;

      },
      error: (e) => {
        this.noTeams = true;
        console.log(e);
      }
    })
  }
}