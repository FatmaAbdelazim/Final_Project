import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { OpportunitiesService } from '../../../../core/services/opportunities.service';
import { OpportuntyDetails } from '../../../../models/opportunty-details';
import { CommonModule } from '@angular/common';
import { Participant } from '../../../../models/participant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attend',
  imports: [RouterLink, CommonModule, FormsModule ],
  templateUrl: './attend.component.html',
  styleUrl: './attend.component.css'
})
export class AttendComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OpportunitiesService = inject(OpportunitiesService)

  id!:string | null;
  opp!: OpportuntyDetails;
  participants : Participant[] = []
  isLoading : boolean = false;

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
}
