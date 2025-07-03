import { Opportunity } from './../../models/opportunty';
import { Component, OnInit } from '@angular/core';
import { HomeCardComponent } from "../../shared/components/home-card/home-card.component";
import { OpportunitiesService } from '../../core/services/opportunities.service';

@Component({
  selector: 'app-opportunities',
  imports: [HomeCardComponent],
  templateUrl: './opportunities.component.html',
  styleUrl: './opportunities.component.css'
})
export class OpportunitiesComponent implements OnInit {
  opportunitiesList!: Opportunity[];
  noOpportunities = false;
  OpportunityLocatin!: string;
  opportunitiesFilterList!: Opportunity[];
  constructor(private _OpportunitiesService: OpportunitiesService) { 
    this.opportunitiesFilterList = this.opportunitiesList;
  }
  ngOnInit(): void {
    this.getAllOpportunities();
  }
  getAllOpportunities() {
    this._OpportunitiesService.getAllOpportunities().subscribe({
      next: (response) => {
        this.opportunitiesList = response;
        // console.log(this.opportunitiesList);
        this.opportunitiesFilterList = this.opportunitiesList;
      },
      error: (e) => {
        this.noOpportunities = true;
        console.log(e);
      }
    })
  }
  searchByLocation() {
    this._OpportunitiesService.searchByLocation(this.OpportunityLocatin).subscribe({
      next: (response) => {
           this.opportunitiesFilterList = response;
      }
    });
  }
}
