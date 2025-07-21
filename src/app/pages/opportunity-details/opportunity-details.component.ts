import { AuthVoluntaryOrganizationService } from './../../core/services/auth-voluntary-organization.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OpportunitiesService } from './../../core/services/opportunities.service';
import { Opportunity } from './../../models/opportunty';
import { Component, OnInit } from '@angular/core';
import { CommentCardComponent } from "../../shared/components/comment-card/comment-card.component";
import { OpportuntyDetails } from '../../models/opportunty-details';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/review';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-opportunity-details',
  imports: [CommentCardComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './opportunity-details.component.html',
  styleUrl: './opportunity-details.component.css'
})
export class OpportunityDetailsComponent implements OnInit {
  Opportunity!: OpportuntyDetails;
  OpportunityId!: string;
  voluntterId!: string;
  commentList!: Review[];
  newComment = {
    message: '',
    rating: 0
  };
  constructor(private _OpportunitiesService: OpportunitiesService, private _Route: ActivatedRoute,
    private _AuthVoluntaryOrganizationService: AuthVoluntaryOrganizationService
  ) { }
  ngOnInit(): void {
    this.OpportunityId = this._Route.snapshot.paramMap.get('id') || '';
    this._AuthVoluntaryOrganizationService.decodeUserData();
    this.voluntterId = this._AuthVoluntaryOrganizationService.userData.id;
    this.getDetails();
    this.getAllComments();
  }

  getDetails() {
    this._OpportunitiesService.getOpportunityDetails(this.OpportunityId).subscribe({
      next: (response) => {
        this.Opportunity = response;
        console.log(response);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  get backgroundImageStyle() {
    return {
      'background-image': `url(https://tatawwa3.runasp.net/uploads/${this.Opportunity.image})`
    };
  }
  getAllComments() {
    this._OpportunitiesService.getAllComments(this.OpportunityId).subscribe({
      next: (response) => {
        this.commentList = response;
        console.log(response);
      },
      error: (e) => {
        if (e.status === 404) {
          this.commentList = []; // ممكن يكون طبيعي مفيش تعليقات
        }
        else{
        console.log(e.error);
        }
      }
    })
  }
  addComment() {
    const dto = {
      comment: this.newComment.message,
      rating: this.newComment.rating,
      opportunityId: this.OpportunityId,
      userId: this.voluntterId
    };
    this._OpportunitiesService.addComment(dto).subscribe({
      next: () => {
        alert("تم اضافة التعليق بنجاح (:");
        this.newComment = { message: '', rating: 0 };
        this.getAllComments();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
}
