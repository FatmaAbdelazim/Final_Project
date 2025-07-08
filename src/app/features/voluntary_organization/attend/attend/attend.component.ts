import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { OpportunitiesService } from '../../../../core/services/opportunities.service';

@Component({
  selector: 'app-attend',
  imports: [RouterLink],
  templateUrl: './attend.component.html',
  styleUrl: './attend.component.css'
})
export class AttendComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OpportunitiesService = inject(OpportunitiesService)

  id!:string | null
  isLoading : boolean = false;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(value)=> {
        this.id = value.get('id');
      },
      error:(err) =>{
        console.log(err)
      },
    })
  }

  excel(){
    this._OpportunitiesService.downloadExcel(this.id).subscribe({
      next:(value)=> {
        console.log("downloaded");
      },
      error(err) {
        console.log(err);
      },
    })
  }
  pdf(){
    this._OpportunitiesService.downloadPDF(this.id).subscribe({
      next:(value)=> {
        console.log("downloaded");
      },
      error(err) {
        console.log(err);
      },
    })
  }
}
