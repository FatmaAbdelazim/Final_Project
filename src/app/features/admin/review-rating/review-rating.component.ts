import { Component } from '@angular/core';
import { Review, ReviewStats } from '../../../models/review';
import { AdminService } from '../../../core/services/admin.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-rating',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './review-rating.component.html',
  styleUrl: './review-rating.component.css'
})
export class ReviewRatingComponent {
  currentPage: number = 1;
    itemsPerPage: number = 4;
    pagedReviews: Review[] = [];
    serchNumber!: number;
    ReviewStatistics!: ReviewStats;
    ReviewList!: Review[];
    ReviewFilterList!: Review[];
    constructor(private _AdminService: AdminService) {

    }
    ngOnInit(): void {
      this.getReviewsStatistics();
      this.getAllReviews();
    }
    getReviewsStatistics() {
      this._AdminService.getReviewsStatistics().subscribe({
        next: (response) => {
          this.ReviewStatistics = response;
        },
        error: () => {

        }
      })
    }
    getAllReviews() {
      this._AdminService.getAllReviews().subscribe({
        next: (response) => {
          this.ReviewList = response;
          this.ReviewFilterList = response;
          this.currentPage = 1;
          this.updatePagedReviews();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
    searchByNumber() {
      this._AdminService.searchByNumber(this.serchNumber).subscribe({
        next: (response) => {
          this.ReviewFilterList = response;
          this.currentPage = 1;
          this.updatePagedReviews();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }

    hideReview(Id: string){
      this._AdminService.hideComment(Id).subscribe({
        next: () => {
          alert("تم اخفاء التعليق بنجاح");
          this.getAllReviews();
          this.getReviewsStatistics();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }

    deleteReview(Id: string) {
      this._AdminService.deleteReview(Id).subscribe({
        next: () => {
          alert("تم حذف التعليق بنجاح");
          this.getAllReviews();
          this.getReviewsStatistics();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
    updatePagedReviews() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.pagedReviews = this.ReviewFilterList.slice(startIndex, endIndex);
    }

    goToPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagedReviews();
      }
    }


    get totalPages(): number {
      return Math.ceil(this.ReviewFilterList.length / this.itemsPerPage);
    }
    getStarsArray(rating: number): any[] {
      const rounded = Math.floor(rating || 0);
      return Array(rounded);
    }
}
