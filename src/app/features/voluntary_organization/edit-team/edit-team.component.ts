import { OpportunitiesService } from './../../../core/services/opportunities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamsService } from '../../../core/services/teams.service';
import { TeamModel } from '../../../models/team-model';

@Component({
  selector: 'app-edit-team',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css'
})
export class EditTeamComponent implements OnInit {

  oppList!:any[];
  teamId!: string | null;
  team!: TeamModel;
  constructor(private _TeamsService: TeamsService, private _Router: ActivatedRoute,private _OpportunitiesService : OpportunitiesService) {
  }
  ngOnInit(): void {
    this.teamId = this._Router.snapshot.paramMap.get('id');
    this.getTeamById();
    this.allOpp();
  }
  updateForm!: FormGroup
  get name() { return this.updateForm.get('name'); }
  get description() { return this.updateForm.get('description'); }
  // get categoryId() { return this.updateForm.get('categoryId'); }
  get city() { return this.updateForm.get('city'); }
  get isLinkedToOpportunity() { return this.updateForm.get('isLinkedToOpportunity'); }
  get joinPermission() { return this.updateForm.get('joinPermission'); }
  get maxMembers() { return this.updateForm.get('maxMembers'); }
  get internalNotes() { return this.updateForm.get('internalNotes'); }
  // get organizationID() { return this.updateForm.get('organizationID'); }
  // get opportunityTitle() { return this.updateForm.get('opportunityTitle'); }
  get id() { return this.updateForm.get('id'); }
  get categoryName() { return this.updateForm.get('categoryName'); }
  get opportunityName() { return this.updateForm.get('opportunityName'); }

  getTeamById() {
    this._TeamsService.getTeamByIdForUpdate(this.teamId).subscribe({
      next: (response) => {
        this.team = response;
        this.updateForm = new FormGroup({
          name: new FormControl(this.team.name),
          description: new FormControl(this.team.description),
          // categoryId: new FormControl(this.team.categoryId),
          city: new FormControl(this.team.city),
          isLinkedToOpportunity: new FormControl(this.team.isLinkedToOpportunity),
          joinPermission: new FormControl(this.team.joinPermission),
          maxMembers: new FormControl(this.team.maxMembers),
          internalNotes: new FormControl(this.team.internalNotes),
          // organizationID: new FormControl(this.team.organizationID),
          // opportunityTitle: new FormControl(this.team.opportunityTitle),
          id: new FormControl(this.team.id),
          categoryName: new FormControl(this.team.categoryName),
          opportunityName: new FormControl(this.team.opportunityName)
        });
      },
      error: (e) => {
        alert(e.error);
      }
    })
  }

  updateTeam() {
    this._TeamsService.updateTeam(this.updateForm.value).subscribe({
      next: () => {
        alert("تم تحديث الفريق بنجاح (:");
        console.log(this.updateForm.value);
      },
      error: (e) => {
        alert(e.error);
      }
    })
  }
    allOpp() {
    this._OpportunitiesService.getAllOpportunities().subscribe({
      next: (response) => {
        this.oppList = response;
      },
      error: (e) => {
        alert(e.error);
      }
    })
  }
}
