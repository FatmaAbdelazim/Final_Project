import { AuthVoluntaryOrganizationService } from './../../../../core/services/auth-voluntary-organization.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { opportunities } from '../../../../models/team-details';
import { Router, RouterLink } from '@angular/router';
import { TeamsService } from '../../../../core/services/teams.service';
import { OpportunitiesService } from '../../../../core/services/opportunities.service';

@Component({
  selector: 'app-create-team',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css'
})
export class CreateTeamComponent implements OnInit{
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _TeamsService = inject(TeamsService)
  private readonly _OpportunitiesService = inject(OpportunitiesService)
  private readonly _AuthVoluntaryOrganizationService = inject(AuthVoluntaryOrganizationService)
  private readonly _Router = inject(Router)

  opps! : opportunities[];
  isLoading : boolean = false;
  ordID! : string;

  createForm = this._FormBuilder.group({
    name : ['', [Validators.required, Validators.pattern(/^[\u0621-\u064Aa-zA-Z ]{2,}$/)]],
    description : ['', Validators.required],
    categoryName : ['', Validators.required],
    city: ['', Validators.required],
    opportunityTitle :[''],
    isLinkedToOpportunity : ['', Validators.required],
    joinPermission : ['', Validators.required],
    maxMembers : [''],
    internalNotes :['', Validators.required]
  })

  ngOnInit(): void {
    this._AuthVoluntaryOrganizationService.decodeUserData();
    this.ordID = this._AuthVoluntaryOrganizationService.userData.id;
    this._OpportunitiesService.oppManagment(this.ordID).subscribe({
      next:(value) =>{
        console.log(value);
        this.opps = value;
      },
    })
  }

  Create() : void{
    if(this.createForm.valid){
      this.isLoading = true;
      const formData = {
      ...this.createForm.value,
      organizationID: this.ordID,
      id:"0"
      };
      console.log(formData);
      this._TeamsService.createTeam(formData).subscribe({
      next:(res) =>{
          this.isLoading = false;
          console.log(res)
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
        }
      })
    }
    else{
      Object.values(this.createForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
      });
    }
  }
}
