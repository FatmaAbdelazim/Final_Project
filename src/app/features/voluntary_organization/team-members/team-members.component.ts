import { members } from './../../../models/team-details';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationDashboardService } from '../../../core/services/organization-dashboard.service';

@Component({
  selector: 'app-team-members',
  imports: [],
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.css'
})
export class TeamMembersComponent {

  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrganizationDashboardService = inject(OrganizationDashboardService)

  teamId! :string | null;
  members! : {
    volunteerId: string,
    name: string,
    profileImageUrl: string,
    role: string
  }[];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(value)=> {
        this.teamId = value.get('id');
        this.getMembers();
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }
  getMembers(){
    this._OrganizationDashboardService.getAllVolunteersForTeam(this.teamId).subscribe({
      next:(value) =>{
        this.members = value;
      },
    })
  }
  deleteMember(id: string){
    this._OrganizationDashboardService.deleteVolunteerFromTeam(this.teamId, id).subscribe({
      next:(value)=>{
        console.log(value);
        alert("تم حذف العضو");
        this.getMembers();
      }
    })
  }
}
