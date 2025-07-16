import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { OpportunitiesService } from '../../../../core/services/opportunities.service';
import { OpportuntyDetails } from '../../../../models/opportunty-details';
import { CommonModule } from '@angular/common';
import { Participant } from '../../../../models/participant';
import { FormsModule } from '@angular/forms';
import { OrganizationDashboardService } from '../../../../core/services/organization-dashboard.service';

@Component({
  selector: 'app-attend',
  imports: [RouterLink, CommonModule, FormsModule ],
  templateUrl: './attend.component.html',
  styleUrl: './attend.component.css'
})
export class AttendComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OpportunitiesService = inject(OpportunitiesService)
  private readonly _OrganizationDashboardService = inject(OrganizationDashboardService)
  private readonly _Router = inject(Router)

  id!:string | null;
  opp!: OpportuntyDetails;
  participants : Participant[] = []
  participantsFilterList: Participant[] = [];
  isLoading : boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  pagedParticipants: Participant[] = [];
  noParticipants= 0;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(value)=> {
        this.id = value.get('id');
        this._OpportunitiesService.getOpportunityDetails(this.id ).subscribe({
          next:(value) =>{
            this.opp = value;
            this._OpportunitiesService.getParticipants(this.id).subscribe({
              next:(value)=> {
                this.participants = value;
                this.participantsFilterList = value;
                this.currentPage = 1;
                this.updatePagedParticipants();
                this.noParticipants = value.length;
                this.participants.forEach(p => {
                if (p.attendanceStatus === 'حضر') {
                  p.attendanceStatus = 'Present';
                }
                else if (p.attendanceStatus === 'غاب') {
                  p.attendanceStatus = 'Absent';
                }
});

              },
            })
          },
        })
      },
      error:(err) =>{
        console.log(err)
      },
    })
  }

  update(){
    console.log(this.participants);
    this._OrganizationDashboardService.updateAttendance(this.participants).subscribe({
      next:(value)=> {
        console.log("updated");
        console.log(value);
        this._Router.navigate(['/organization-dashboard/managment-opp'])
      },
      error:(err)=> {
        console.log(err);
      },
    })
  }

  excel(){
    this._OpportunitiesService.downloadExcel(this.id).subscribe({
      next:(response : Blob)=> {
        console.log("down")
  const file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = fileURL;
  link.download = 'attendance-report.xlsx';
  link.click();
},
      error(err) {
        console.log(err);
      },
    })
  }
  pdf(){
    this._OpportunitiesService.downloadPDF(this.id).subscribe({
      next:(response : Blob)=> {
        console.log("down")
  const file = new Blob([response], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = fileURL;
  link.download = 'attendance-report.pdf';
  link.click();
},
      error(err) {
        console.log(err);
      },
    })
  }

  updatePagedParticipants() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedParticipants = this.participantsFilterList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedParticipants();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.participantsFilterList.length / this.itemsPerPage);
  }
}
