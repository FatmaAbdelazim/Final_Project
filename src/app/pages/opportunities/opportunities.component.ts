import { Opportunity } from './../../models/opportunty';
import { Component, OnInit } from '@angular/core';
import { HomeCardComponent } from "../../shared/components/home-card/home-card.component";
import { OpportunitiesService } from '../../core/services/opportunities.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-opportunities',
  imports: [HomeCardComponent, FormsModule],
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css'] // ✅ هنا كانت styleUrl
})
export class OpportunitiesComponent implements OnInit {
  opportunitiesList: Opportunity[] = [];
  opportunitiesFilterList: Opportunity[] = [];
  pagedOpportunities: Opportunity[] = [];

  noOpportunities: boolean = false;

  OpportunityName: string = '';
  citiesList: any[] = [];
  categoriesList: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private _OpportunitiesService: OpportunitiesService) {}

  ngOnInit(): void {
    this.getAllOpportunities();
    this.getAllCategory();
    this.getAllCitys();
  }

  getAllOpportunities() {
    this._OpportunitiesService.getAllOpportunities().subscribe({
      next: (response) => {
        this.opportunitiesList = response;
        this.opportunitiesFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
        this.noOpportunities = response.length === 0;
      },
      error: (e) => {
        this.noOpportunities = true;
        console.log(e);
      }
    });
  }

  updatePagedOpportunities() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedOpportunities = this.opportunitiesFilterList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOpportunities();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.opportunitiesFilterList.length / this.itemsPerPage);
  }

  searchByLocation(OpportunityLocation: string) {
    this._OpportunitiesService.searchByLocation(OpportunityLocation).subscribe({
      next: (response) => {
        this.opportunitiesFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
        this.noOpportunities = response.length === 0;
      }
    });
  }

  searchByName() {
    this._OpportunitiesService.searchByName(this.OpportunityName).subscribe({
      next: (response) => {
        this.opportunitiesFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
        this.noOpportunities = response.length === 0;
      }
    });
  }

  searchByCategory(OpportunityCategory: string) {
    this._OpportunitiesService.searchByCategory(OpportunityCategory).subscribe({
      next: (response) => {
        this.opportunitiesFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
        this.noOpportunities = response.length === 0;
      }
    });
  }

  getAllCategory() {
    this._OpportunitiesService.getAllCategory().subscribe({
      next: (response) => {
        this.categoriesList = response;
      }
    });
  }

  getAllCitys() {
    this._OpportunitiesService.getAllLocations().subscribe({
      next: (response) => {
        this.citiesList = response;
      }
    });
  }
}
