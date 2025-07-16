import { CommonModule } from '@angular/common';
import { AdminService } from './../../../core/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OppPublished } from '../../../models/opp-published';
import { OpportunityFilter } from '../../../models/opportunity-filter';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-opp',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './review-opp.component.html',
  styleUrl: './review-opp.component.css'
})
export class ReviewOppComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 5;
  opportunitiesList!: any;
  pagedOpps: OppPublished[] = [];
  oppList!: OppPublished[];
  oppFilterList!: OppPublished[];
  serchOrgName = "";
  serchCity = "";
  searchFilterData!: OpportunityFilter;
  countOppDraft!: number;
   countOppCompleted!: number;
  constructor(private _AdminService: AdminService) { }
  ngOnInit(): void {
    this.getAllPublishedOpp();
    this.getCountOfOppComplete();
    this.getCountOfOppDraft();
    this.oppFilterList = this.oppList;
    this.searchFilterData = {
      location: '',
      organizationName: '',
      status: ''
    };
  }

  getAllPublishedOpp() {
    this._AdminService.getAllOppPublished().subscribe({
      next: (response) => {
        this.oppList = response;
        this.oppFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  
  getCountOfOppComplete() {
    this._AdminService.getCountOfOppCompleted().subscribe({
      next: (response) => {
          this.countOppCompleted = response.count;
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  
  getCountOfOppDraft() {
    this._AdminService.getCountOfOppDraft().subscribe({
      next: (response) => {
          this.countOppDraft = response.count;
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  rejectOpp(oppId: string) {
    this._AdminService.rejectOpp(oppId).subscribe({
      next: () => {
        alert("تم رفض الفرصه");
        this.getAllPublishedOpp();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  approveOpp(oppId: string) {
    this._AdminService.approveOpp(oppId).subscribe({
      next: () => {
        alert(" تم قبول الفرصه");
        this.getAllPublishedOpp();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  searchFilter() {
    this.searchFilterData.location = this.serchCity;
    this.searchFilterData.organizationName = this.serchOrgName;
    this.searchFilterData.status = "";
    this._AdminService.searchFilter(this.searchFilterData).subscribe({
      next: (response) => {
        this.oppFilterList = response;
                this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }

  updatePagedOpportunities() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedOpps = this.oppFilterList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOpportunities();
    }
  }


  get totalPages(): number {
    return Math.ceil(this.oppFilterList.length / this.itemsPerPage);
  }
  getStarsArray(rating: number): any[] {
    const rounded = Math.floor(rating || 0);
    return Array(rounded);
  }
}
