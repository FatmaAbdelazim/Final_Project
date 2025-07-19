import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Participant, VolunteerParticipationForCertificates } from '../../../models/participant';
import { OrganizationDashboardService } from '../../../core/services/organization-dashboard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-organization-certifications',
  imports: [CommonModule, FormsModule],
  templateUrl: './organization-certifications.component.html',
  styleUrl: './organization-certifications.component.css'
})
export class OrganizationCertificationsComponent {
    private readonly _OrganizationDashboardService = inject(OrganizationDashboardService)

    oppName : string = '';
    volunteers : VolunteerParticipationForCertificates[]=[];
    VolunteersFilterList: VolunteerParticipationForCertificates[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 4;
    pagedVolunteers: VolunteerParticipationForCertificates[] = [];
    noVolunteers= 0;

    ngOnInit(): void {
      this._OrganizationDashboardService.getVolCertificaties().subscribe({
        next:(value)=>{
          console.log(value)
          this.VolunteersFilterList = value;
          this.volunteers = value;
          this.currentPage = 1;
          this.updatePagedVolunteers();
          this.noVolunteers = value.length;
        }
      })
    }

    searchByName() {
    if (!this.oppName || this.oppName.trim() === '') {
      this.VolunteersFilterList = [...this.volunteers];
      this.currentPage = 1;
      this.updatePagedVolunteers();
      this.noVolunteers = this.VolunteersFilterList.length;
      return;
    }
    this._OrganizationDashboardService.searchByOppName(this.oppName).subscribe({
      next: (response) => {
        this.VolunteersFilterList = response;
        this.currentPage = 1;
        this.updatePagedVolunteers();
        this.noVolunteers = response.length;
      }
    });
  }


  getCertificate(Id:string,Hour:number,opptitle:string){
    let data = {
      participationId : Id,
      totalHour : Hour,
      title : opptitle
    }
    this._OrganizationDashboardService.getCertificate(data).subscribe({
      next:(value)=> {
        console.log(value);
        alert("تم اصدار الشهادة")
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  all(Id:string,Hour:number,opptitle:string){
    let data = {
      opportunityId : Id,
      totalHours : Hour,
      title : opptitle
    }
    console.log(data);
  this._OrganizationDashboardService.allCertificates(data).subscribe({
    next:(value)=> {
      console.log(value);
      alert("تم اصدار الشهادة")
    },
      error:(err)=>{
        console.log(err);
      }
    })
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

}
