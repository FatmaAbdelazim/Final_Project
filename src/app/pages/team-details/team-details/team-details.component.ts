import { Component, inject, OnDestroy, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeamsService } from '../../../core/services/teams.service';
import { TeamDetails } from '../../../models/team-details';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-team-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.css'
})
export class TeamDetailsComponent implements OnInit, OnDestroy{
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _TeamsService = inject(TeamsService)
  team! :TeamDetails;
  id : string | null = null;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(value) => {
        this.id= value.get("id");
        this._TeamsService.getTeamDetails(this.id).subscribe({
          next:(res)=> {
            this.team =res;
          },
        })
      },
    })

  }
  ngOnDestroy(): void {

  }
}
