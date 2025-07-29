import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OrganizationDashboardService } from '../../../core/services/organization-dashboard.service';

@Component({
  selector: 'app-org-team-card',
  imports: [CommonModule],
  templateUrl: './org-team-card.component.html',
  styleUrl: './org-team-card.component.css'
})
export class OrgTeamCardComponent implements OnInit {
  @Input() teamId!: any;
  @Input() falg! : boolean;
  membersList!: any[];
  constructor(private _OrganizationDashboardService: OrganizationDashboardService) { }
  ngOnInit(): void {
    this.getAllMembers();
  }


  getAllMembers() {
    this._OrganizationDashboardService.getAllVolunteersForTeam(this.teamId).subscribe({
      next: (response) => {
        this.membersList = response;
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }


}
