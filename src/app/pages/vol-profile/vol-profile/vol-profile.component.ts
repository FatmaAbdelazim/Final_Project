import { Component } from '@angular/core';
import { VolunteerDashboardService } from '../../../core/services/volunteer-dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vol-profile',
  imports: [CommonModule],
  templateUrl: './vol-profile.component.html',
  styleUrl: './vol-profile.component.css'
})
export class VolProfileComponent {
  volId!:string| null;
  volInfo!: any;
  constructor(private _VolunteerDashboardService : VolunteerDashboardService , private _ActivatedRoute :ActivatedRoute ){}
  ngOnInit(): void {
    this.volId = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.getVolProfile();
  }

  getVolProfile(){
    this._VolunteerDashboardService.profile(this.volId).subscribe({
      next:(response)=>{
        this.volInfo = response;
      },
      error:(e)=>{
        console.log(e.error);
      }
    })
  }
}
