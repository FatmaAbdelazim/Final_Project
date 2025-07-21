import { OpportunitiesService } from './../../../core/services/opportunities.service';
import { VoluntaryOrganizationRegisterComponent } from './../../voluntary_organization/register/register.component';
import { AuthVoluntaryOrganizationService } from './../../../core/services/auth-voluntary-organization.service';
import { VolunteerRecommendedOpportunities } from './../../../models/volunteer-recommended-opportunities';
import { VolunteerOpportuinties } from './../../../models/volunteer-opportuinties';
import { VolunteerDashboardService } from './../../../core/services/volunteer-dashboard.service';
import { Component, OnInit } from '@angular/core';
import { OppCardVoluteerComponent } from "../../../shared/components/opp-card-voluteer/opp-card-voluteer.component";
import { OppCardSuggationVoluteerComponent } from "../../../shared/components/opp-card-suggation-voluteer/opp-card-suggation-voluteer.component";
import { Opportunity } from '../../../models/opportunty';

@Component({
  selector: 'app-volunteer-home',
  imports: [OppCardVoluteerComponent, OppCardSuggationVoluteerComponent],
  templateUrl: './volunteer-home.component.html',
  styleUrl: './volunteer-home.component.css'
})
export class VolunteerHomeComponent implements OnInit{
  volunteerId!: string;
  volunteerOpportuintiesList!: VolunteerOpportuinties[];
  volunteerRecommendedOpportunitiesList!: Opportunity[];
  constructor(private _VolunteerDashboardService: VolunteerDashboardService ,private _OpportunitiesService : OpportunitiesService, private _VoluntaryOrganizationRegisterComponent : AuthVoluntaryOrganizationService) { }
  ngOnInit(): void {
    this._VoluntaryOrganizationRegisterComponent.decodeUserData();
    this.volunteerId = this._VoluntaryOrganizationRegisterComponent.userData.id;
    this.getAllVolunteerOpportunites();
    this.getAllVolunteerRecommendedOpportunities();
  }


  getAllVolunteerOpportunites() {
    this._VolunteerDashboardService.getMyOpportunites(this.volunteerId).subscribe({
      next: (response) => {
        this.volunteerOpportuintiesList = response;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  getAllVolunteerRecommendedOpportunities() {
    this._OpportunitiesService.getAllOpportunities().subscribe({
      next: (response) => {
        this.volunteerRecommendedOpportunitiesList = response;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
}
