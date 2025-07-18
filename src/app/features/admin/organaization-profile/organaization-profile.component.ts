import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../../../core/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { OrganaizationProfileTeamCardComponent } from "../../../shared/components/organaization-profile-team-card/organaization-profile-team-card.component";
import { OrganaizationProfileOppCardComponent } from "../../../shared/components/organaization-profile-opp-card/organaization-profile-opp-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organaization-profile',
  imports: [OrganaizationProfileTeamCardComponent, OrganaizationProfileOppCardComponent , CommonModule],
  templateUrl: './organaization-profile.component.html',
  styleUrl: './organaization-profile.component.css'
})
export class OrganaizationProfileComponent implements OnInit{

  orgId!:string| null;
  orgInfo!: any;
  constructor(private _AdminService : AdminService , private router :ActivatedRoute ){}
  ngOnInit(): void {
    this.orgId = this.router.snapshot.paramMap.get('id');
    this.getOrgProfile();
  }

  getOrgProfile(){
    this._AdminService.getOrganaizationProfile(this.orgId).subscribe({
      next:(response)=>{
        this.orgInfo = response;
      },
      error:(e)=>{
        console.log(e.error);
      }
    })
  }
}
