import { FormsModule } from '@angular/forms';
import { OrganizationData } from '../../../models/organization-data';
import { OrganizationDashboardService } from './../../../core/services/organization-dashboard.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-managment-organization',
  imports: [CommonModule, FormsModule],
  templateUrl: './managment-organization.component.html',
  styleUrl: './managment-organization.component.css'
})
export class ManagmentOrganizationComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 4;
  pagedOpps: OrganizationData[] = [];
  serchName!: string;
  serchCity!: string;
  serchStatus!: string;
  OrganizationStatistics!: any;
  orgList!: OrganizationData[];
  orgFilterList!: OrganizationData[];
  constructor(private _AdminService: AdminService) {

  }
  ngOnInit(): void {
    this.getOrganizationStatistics();
    this.getAllOrganization();
  }
  getOrganizationStatistics() {
    this._AdminService.getOrganizationStatistics().subscribe({
      next: (response) => {
        this.OrganizationStatistics = response;
      },
      error: () => {

      }
    })
  }
  getAllOrganization() {
    this._AdminService.getAllOrganization().subscribe({
      next: (response) => {
        this.orgList = response;
        this.orgFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  searchByName() {
    this._AdminService.searchByOrgName(this.serchName).subscribe({
      next: (response) => {
        this.orgFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  searchByStatus() {
    this._AdminService.searchByStatus(this.serchStatus).subscribe({
      next: (response) => {
        this.orgFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  searchByCity() {
    this._AdminService.searchByCity(this.serchCity).subscribe({
      next: (response) => {
        this.orgFilterList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
    approveOrg(orgId: string) {
    this._AdminService.approveOrg(orgId).subscribe({
      next: () => {
        alert(" تم قبول الفرصه");
        this.getAllOrganization();       
         this.getOrganizationStatistics();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }

  banOrganization(orgId: string) {
    this._AdminService.banOrganaization(orgId).subscribe({
      next: () => {
        alert("تم حظر المنظمة بنجاح");
        this.getAllOrganization();
        this.getOrganizationStatistics();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  deleteOrganization(orgId: string) {
    this._AdminService.deleteOrganization(orgId).subscribe({
      next: () => {
        alert("تم حذف المنظمة بنجاح");
        this.getAllOrganization();
        this.getOrganizationStatistics();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  updatePagedOpportunities() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedOpps = this.orgFilterList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOpportunities();
    }
  }


  get totalPages(): number {
    return Math.ceil(this.orgFilterList.length / this.itemsPerPage);
  }
  getStarsArray(rating: number): any[] {
    const rounded = Math.floor(rating || 0);
    return Array(rounded);
  }

}
