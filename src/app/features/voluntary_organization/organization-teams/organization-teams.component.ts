import { AuthVoluntaryOrganizationService } from './../../../core/services/auth-voluntary-organization.service';
import { AdminService } from './../../../core/services/admin.service';
import { OrganizationDashboardService } from './../../../core/services/organization-dashboard.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrgTeamCardComponent } from "../../../shared/components/org-team-card/org-team-card.component";

@Component({
  selector: 'app-organization-teams',
  imports: [CommonModule, RouterLink, FormsModule, OrgTeamCardComponent],
  templateUrl: './organization-teams.component.html',
  styleUrl: './organization-teams.component.css'
})
export class OrganizationTeamsComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 4;
  opportunitiesList!: any;
  pagedOpps: any[] = [];
  orgId!: string;
  membersList!: any[];
  orgTeamsList!: any[];
  constructor(private _OrganizationDashboardService: OrganizationDashboardService, private _AdminService: AdminService, private _AuthVoluntaryOrganizationService: AuthVoluntaryOrganizationService) { }
  ngOnInit(): void {
    this._AuthVoluntaryOrganizationService.decodeUserData();
    this.orgId = this._AuthVoluntaryOrganizationService.userData.id;
    this.getAllTeamsForOrg();
  }

  getAllTeamsForOrg() {
    this._OrganizationDashboardService.getAllteamsForOrg(this.orgId).subscribe({
      next: (response) => {
        this.orgTeamsList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }

  getAllMembers(teamId: string) {
    this._OrganizationDashboardService.getAllVolunteersForTeam(teamId).subscribe({
      next: (response) => {
        this.membersList = response;
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  deleteTeam(teamId: string) {
    this._AdminService.deleteTeam(teamId).subscribe({
      next: () => {
        alert(":) تم حذف الفريق بنجاح ");
        this.getAllTeamsForOrg();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }


  updatePagedOpportunities() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedOpps = this.orgTeamsList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOpportunities();
    }
  }


  get totalPages(): number {
    return Math.ceil(this.orgTeamsList.length / this.itemsPerPage);
  }
  getStarsArray(rating: number): any[] {
    const rounded = Math.floor(rating || 0);
    return Array(rounded);
  }
}
