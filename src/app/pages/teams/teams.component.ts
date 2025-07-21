import { Team } from './../../models/team';
import { Component, OnInit } from '@angular/core';
import { TeamCardComponent } from "../../shared/components/team-card/team-card.component";
import { TeamsService } from '../../core/services/teams.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams',
  imports: [TeamCardComponent, FormsModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit {
  teamsList!: Team[];
  teamsFilterList!: Team[];
  noTeams = 0;
  TeamName: string = '';
  citiesList: any[] = [];
  categoriesList: any[] = [];
  selectedCategoryName: string = 'اختار المجال';
  selectedCityName: string = 'اختار المدينه';
  pagedTeams: Team[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  constructor(private _TeamsService: TeamsService) {
    this.teamsFilterList = this.teamsList;
  }
  ngOnInit(): void {
    this.getAllTeams();
    this.getAllCategory();
    this.getAllLocations();
  }
  getAllTeams() {
    this._TeamsService.getAllTeams().subscribe({
      next: (response) => {
        this.teamsList = response;
        this.teamsFilterList = this.teamsList;
        this.noTeams = this.teamsFilterList.length;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  updatePagedOpportunities() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedTeams = this.teamsFilterList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOpportunities();
    }
  }

 get totalPages(): number {
  if (!this.teamsFilterList) return 0;
  return Math.ceil(this.teamsFilterList.length / this.itemsPerPage);
}

  getAllLocations() {
    this._TeamsService.getAllLocations().subscribe({
      next: (respons) => {
        this.citiesList = respons;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  getAllCategory() {
    this._TeamsService.getAllCategory().subscribe({
      next: (respons) => {
        this.categoriesList = respons;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  searchByLocation(location: string) {
    this._TeamsService.searchByLocation(location).subscribe({
      next: (respons) => {
        this.teamsFilterList = respons;
        this.selectedCityName = location;
        this.noTeams = this.teamsFilterList.length;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  searchByName() {
    this._TeamsService.searchByName(this.TeamName).subscribe({
      next: (respons) => {
        this.teamsFilterList = respons;
        this.noTeams = this.teamsFilterList.length;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  searchByCategory(category: string) {
    this._TeamsService.searchByCategory(category).subscribe({
      next: (respons) => {
        this.teamsFilterList = respons;
        this.selectedCategoryName = category;
        this.noTeams = this.teamsFilterList.length;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
}