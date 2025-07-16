import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrganizationDashboardService } from '../../../core/services/organization-dashboard.service';
import { TeamsManagment } from '../../../models/teams-managment';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-managment-teams',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './managment-teams.component.html',
  styleUrl: './managment-teams.component.css'
})
export class ManagmentTeamsComponent {
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pagedOpps: TeamsManagment[] = [];
  serchName!: string;
  teamStatistics!: any;
  teamList!: TeamsManagment[];
  teamFilterList!: TeamsManagment[];
  constructor(private _AdminService: AdminService) {

  }
  ngOnInit(): void {
    this.getTeamsStatistics();
    this.getAllTeams();
  }
  getTeamsStatistics() {
    this._AdminService.getTeamsStatistics().subscribe({
      next: (response) => {
        this.teamStatistics = response;
      },
      error: () => {

      }
    })
  }
  getAllTeams() {
    this._AdminService.getAllTeams().subscribe({
      next: (response) => {
        this.teamList = response;
        this.teamFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  searchByTeamName() {
    this._AdminService.searchByTeamName(this.serchName).subscribe({
      next: (response) => {
        this.teamFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
 


  deleteTeam(teamId: string) {
    this._AdminService.deleteTeam(teamId).subscribe({
      next: () => {
        alert("تم حذف المنظمة بنجاح");
        this.getAllTeams();
        this.getTeamsStatistics();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  updatePagedOpportunities() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedOpps = this.teamFilterList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOpportunities();
    }
  }


  get totalPages(): number {
    return Math.ceil(this.teamFilterList.length / this.itemsPerPage);
  }
  getStarsArray(rating: number): any[] {
    const rounded = Math.floor(rating || 0);
    return Array(rounded);
  }
}
