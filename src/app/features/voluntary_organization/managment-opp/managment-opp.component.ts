import { AuthVoluntaryOrganizationService } from './../../../core/services/auth-voluntary-organization.service';
import { FormsModule } from '@angular/forms';
import { OpportunitiesService } from './../../../core/services/opportunities.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OppManagment } from '../../../models/opp-managment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-managment-opp',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './managment-opp.component.html',
  styleUrl: './managment-opp.component.css'
})
export class ManagmentOppComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 5;
  opportunitiesList!: any;
  pagedOpps: OppManagment[]=[];
  numberOfOpp = 0;
  organizationId!:string;
  constructor(private _OpportunitiesService: OpportunitiesService, private _AuthVoluntaryOrganizationService : AuthVoluntaryOrganizationService) {

  }
  ngOnInit(): void {
    this._AuthVoluntaryOrganizationService.decodeUserData();
    this.organizationId = this._AuthVoluntaryOrganizationService.userData.id;
    this.getAllOppManagment();
  }
  getAllOppManagment() {
    this._OpportunitiesService.oppManagment(this.organizationId).subscribe({
      next: (respone) => {
        this.opportunitiesList = respone;
        this.numberOfOpp = respone.length;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  deletOpp(id:string){
    this._OpportunitiesService.deleteOpp(id).subscribe({
      next:()=>{
        alert("تم حذف الفرصة بنجاح");
        this.getAllOppManagment();
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }



  updatePagedOpportunities() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedOpps = this.opportunitiesList.slice(startIndex, endIndex);
  }

 goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updatePagedOpportunities();
  }
}


  get totalPages(): number {
    return Math.ceil(this.opportunitiesList.length/ this.itemsPerPage);
  }
getStarsArray(rating: number): any[] {
  const rounded = Math.floor(rating || 0);
  return Array(rounded);
}
}
