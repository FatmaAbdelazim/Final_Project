import { OpportunitiesService } from './../../core/services/opportunities.service';
import { Component, OnInit } from '@angular/core';
import { HomeCardComponent } from "../../shared/components/home-card/home-card.component";
import { HomeReviewCardComponent } from "../../shared/components/home-review-card/home-review-card.component";
import { RouterLink } from '@angular/router';
import { Opportunity } from '../../models/opportunty';
import { StatisticsService } from '../../core/services/statistics.service';

@Component({
  selector: 'app-home',
  imports: [HomeCardComponent, HomeReviewCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  opportunitiesList!: Opportunity[];
  noOpportunities = false;
  numberOfActiveVolunteers!:Number;
  numberOfVolunteersHour!:Number;
  constructor(private _OpportunitiesService: OpportunitiesService,private _statistics: StatisticsService) { }
  ngOnInit(): void {
    this.getAllOpportunities();
    this.getCoutOfActiveVolunteers();
    this.getCoutOfVolunteersHour();
  }
  getAllOpportunities() {
    this._OpportunitiesService.getAllOpportunities().subscribe({
      next: (response) => {
        this.opportunitiesList = response;
      },
      error: (e) => {
        this.noOpportunities = true;
      }
    })
  }
  getCoutOfActiveVolunteers(){
    this._statistics.getCoutOfActiveVolunteers().subscribe({
      next:(response)=>{
          this.numberOfActiveVolunteers = response;
      },
      error:(e)=>{
         console.log(e);
      }
    })
  }
    getCoutOfVolunteersHour(){
    this._statistics.getCoutOfVolunteersHour().subscribe({
      next:(response)=>{
          this.numberOfVolunteersHour = response;
      },
      error:(e)=>{
         console.log(e);
      }
    })
  }
}
