import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrganizationDashboardService } from '../../../../core/services/organization-dashboard.service';
import { OpportunitiesService } from '../../../../core/services/opportunities.service';
import { OpportuntyDetails } from '../../../../models/opportunty-details';
import { CommonModule, DatePipe } from '@angular/common';
import { VolunteerApplications } from '../../../../models/organization';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-volunteer',
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './manage-volunteer.component.html',
  styleUrl: './manage-volunteer.component.css'
})
export class ManageVolunteerComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrganizationDashboardService = inject(OrganizationDashboardService)
  private readonly _OpportunitiesService = inject(OpportunitiesService)

  oppId !: string | null;
  opp! : OpportuntyDetails;
  volunteerName : string = '';
  applyDate : Date = new Date();
  volunteers : VolunteerApplications[]=[];
  VolunteersFilterList: VolunteerApplications[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pagedVolunteers: VolunteerApplications[] = [];
  noVolunteers= 0;
  state! : string;

  statistic! :{
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(value)=> {
        this.oppId = value.get('id');
        console.log(this.oppId);
        this._OrganizationDashboardService.getVolunteersStatistics(this.oppId).subscribe({
          next:(value) =>{
            this.statistic = value;
            this._OpportunitiesService.getOpportunityDetails(this.oppId).subscribe({
              next:(value)=> {
                this.opp = value;
                this.volunteersData();
              },
              error:(err) =>{
            console.log(err);
          }
            })
          },
          error:(err) =>{
            console.log(err);
          }
        })
      },
      error:(err) =>{
            console.log(err);
      }
    })
  }

  volunteersData():void{
    this._OrganizationDashboardService.getVolunteerApplications(this.oppId).subscribe({
                  next:(response)=> {
                    console.log(response);
                    this.volunteers = response;
                    this.VolunteersFilterList = response;
                    this.currentPage = 1;
                    this.updatePagedVolunteers();
                    this.noVolunteers = response.length;
                  },
                })
  }

  searchByName() {
  if (!this.volunteerName || this.volunteerName.trim() === '') {
    this.VolunteersFilterList = [...this.volunteers];
    this.currentPage = 1;
    this.updatePagedVolunteers();
    this.noVolunteers = this.VolunteersFilterList.length;
    return;
  }


  this._OrganizationDashboardService.searchVolByName(this.volunteerName, this.oppId).subscribe({
    next: (response) => {
      this.VolunteersFilterList = response;
      this.currentPage = 1;
      this.updatePagedVolunteers();
      this.noVolunteers = response.length;
    }
  });
}
searchByState(){
  if (!this.state || this.state.trim() === '') {
    this.VolunteersFilterList = [...this.volunteers];
    this.currentPage = 1;
    this.updatePagedVolunteers();
    this.noVolunteers = this.VolunteersFilterList.length;
    return;
  }
  this._OrganizationDashboardService.searchVolByState(this.state, this.oppId).subscribe({
    next: (response) => {
      this.VolunteersFilterList = response;
      this.currentPage = 1;
      this.updatePagedVolunteers();
      this.noVolunteers = response.length;
    }
  });
}

searchByDate(){
  if (!this.applyDate) {
    this.VolunteersFilterList = [...this.volunteers];
    this.currentPage = 1;
    this.updatePagedVolunteers();
    this.noVolunteers = this.VolunteersFilterList.length;
    return;
  }

  this._OrganizationDashboardService.searchVolByDate(this.applyDate, this.oppId).subscribe({
    next: (response) => {
      this.VolunteersFilterList = response;
      this.currentPage = 1;
      this.updatePagedVolunteers();
      this.noVolunteers = response.length;
    }
  });
}

  updatePagedVolunteers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedVolunteers = this.VolunteersFilterList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedVolunteers();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.VolunteersFilterList.length / this.itemsPerPage);
  }

  reject(id:string){
    this._OrganizationDashboardService.reject(id).subscribe({
      next:(value)=> {
        console.log(value);
        this.volunteersData();
      },
    })
  }
  accept(id:string){
    this._OrganizationDashboardService.accept(id).subscribe({
      next:(value)=> {
        console.log(value);
        this.volunteersData();
      },
    })
  }
}
