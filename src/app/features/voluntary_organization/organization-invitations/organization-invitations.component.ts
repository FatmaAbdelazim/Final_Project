import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthVoluntaryOrganizationService } from '../../../core/services/auth-voluntary-organization.service';
import { TeamsService } from '../../../core/services/teams.service';
import { OpportunitiesService } from '../../../core/services/opportunities.service';
import { opportunities } from '../../../models/team-details';
import { Team } from '../../../models/team';
import { AdminService } from '../../../core/services/admin.service';
import { OrganizationDashboardService } from '../../../core/services/organization-dashboard.service';
import { CommonModule } from '@angular/common';
import { volunteersForAdmin } from '../../../models/volunteersForAdmin';

@Component({
  selector: 'app-organization-invitations',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './organization-invitations.component.html',
  styleUrl: './organization-invitations.component.css'
})
export class OrganizationInvitationsComponent implements OnInit{

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _OpportunitiesService = inject(OpportunitiesService)
  private readonly _AdminService = inject(AdminService)
  private readonly _AuthVoluntaryOrganizationService = inject(AuthVoluntaryOrganizationService)
  private readonly _OrganizationDashboardService = inject(OrganizationDashboardService)

  ordID! : string ;
  opps! : opportunities[];
  teams! : Team[];
  volunteers! : volunteersForAdmin[];
  isLoading : boolean = false;

  invitation = this._FormBuilder.group({
    volunteerFullName :['', Validators.required],
    invitationType :['', Validators.required],
    teamName : [''],
    opportunityTitle :[''],
    personalMessage :['']
  })

  ngOnInit(): void {
    this._AdminService.getAllVolunnteers().subscribe({
      next:(value)=> {
        this.volunteers = value;
        this._AuthVoluntaryOrganizationService.decodeUserData();
        this.ordID = this._AuthVoluntaryOrganizationService.userData.id;
        this._OpportunitiesService.getAllTeams(this.ordID).subscribe({
          next:(value)=> {
            this.teams = value;
            console.log(value);
            this._OpportunitiesService.oppManagment(this.ordID).subscribe({
              next:(value)=> {
              this.opps = value;
              console.log(value);
            },
            error:(err)=> {
            console.log(err)
            }
            })
          },
          error:(err)=> {
          console.log(err)
          }
        })
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }

  Send():void{
    if(this.invitation.valid){
      this.isLoading = true;
      this._OrganizationDashboardService.sendInvetation(this.invitation.value).subscribe({
      next:(res) =>{
          this.isLoading = false;
          alert("تم ارسال الدعوة بنجاح");
          console.log(res)
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
        }
      })
    }
    else{
      Object.values(this.invitation.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
      });
    }
  }
}
