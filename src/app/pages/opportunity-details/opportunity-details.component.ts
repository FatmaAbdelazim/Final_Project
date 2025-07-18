import { ActivatedRoute, Router } from '@angular/router';
import { OpportunitiesService } from './../../core/services/opportunities.service';
import { Opportunity } from './../../models/opportunty';
import { Component, OnInit } from '@angular/core';
import { CommentCardComponent } from "../../shared/components/comment-card/comment-card.component";
import { OpportuntyDetails } from '../../models/opportunty-details';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opportunity-details',
  imports: [CommentCardComponent, CommonModule],
  templateUrl: './opportunity-details.component.html',
  styleUrl: './opportunity-details.component.css'
})
export class OpportunityDetailsComponent implements OnInit {
  Opportunity!: OpportuntyDetails;
  OpportunityId!: string;
  constructor(private _OpportunitiesService: OpportunitiesService, private _Route: ActivatedRoute) { }
  ngOnInit(): void {
    this.OpportunityId = this._Route.snapshot.paramMap.get('id') || '';
    this.getDetails();
  }

  getDetails() {
    this._OpportunitiesService.getOpportunityDetails(this.OpportunityId).subscribe({
      next: (response) => {
        this.Opportunity = response;
        console.log(response);
      },
      error: (e) => {
        alert(e);
      }
    })
  }
  get backgroundImageStyle() {
    return {
      'background-image': `url(https://tatawwa3.runasp.net/uploads/${this.Opportunity.image})`
    };
  }
}
