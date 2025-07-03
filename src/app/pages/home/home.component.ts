import { OpportunitiesService } from './../../core/services/opportunities.service';
import { Component, OnInit } from '@angular/core';
import { HomeCardComponent } from "../../shared/components/home-card/home-card.component";
import { HomeReviewCardComponent } from "../../shared/components/home-review-card/home-review-card.component";
import { RouterLink } from '@angular/router';
import { Opportunity } from '../../models/opportunty';

@Component({
  selector: 'app-home',
  imports: [HomeCardComponent, HomeReviewCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  opportunitiesList!: Opportunity[];
  noOpportunities = false;
  constructor(private _OpportunitiesService: OpportunitiesService) { }
  ngOnInit(): void {
    this.getAllOpportunities();
  }
  getAllOpportunities() {
    this._OpportunitiesService.getAllOpportunities().subscribe({
      next: (response) => {
        this.opportunitiesList = response;
        console.log(this.opportunitiesList);

      },
      error: (e) => {
        this.noOpportunities = true;
        console.log(e);
      }
    })
  }
}
