import { OrganizationDashboardService } from './../../../core/services/organization-dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managment-organization',
  imports: [],
  templateUrl: './managment-organization.component.html',
  styleUrl: './managment-organization.component.css'
})
export class ManagmentOrganizationComponent implements OnInit{
 
  OrganizationStatistics!:any;
  constructor(private _OrganizationDashboardService : OrganizationDashboardService){

  }
  ngOnInit(): void {
    this.getOrganizationStatistics();
  }
  getOrganizationStatistics(){
    this._OrganizationDashboardService.getOrganizationStatistics().subscribe({
      next:(response)=>{
        this.OrganizationStatistics = response;
      },
      error:()=>{

      }
    })
  }

}
