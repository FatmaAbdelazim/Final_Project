import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TeamsService } from '../../../core/services/teams.service';
import { TeamDetails } from '../../../models/team-details';

@Component({
  selector: 'app-join-team',
  imports: [RouterLink],
  templateUrl: './join-team.component.html',
  styleUrl: './join-team.component.css'
})
export class JoinTeamComponent implements OnInit, OnDestroy{
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

  selectedFile: File | null = null;

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    console.log('File selected:', this.selectedFile);
  }
}

onDragOver(event: DragEvent) {
  event.preventDefault();
}

onDrop(event: DragEvent) {
  event.preventDefault();
  if (event.dataTransfer && event.dataTransfer.files.length > 0) {
    this.selectedFile = event.dataTransfer.files[0];
    console.log('File dropped:', this.selectedFile);
  }
}
}
