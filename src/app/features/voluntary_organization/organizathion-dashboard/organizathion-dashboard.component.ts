import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarOrgComponent } from "../../../shared/components/sidebar-org/sidebar-org.component";
import { ManagmentOppComponent } from "../managment-opp/managment-opp.component";

@Component({
  selector: 'app-organizathion-dashboard',
  imports: [RouterOutlet, SidebarOrgComponent, ManagmentOppComponent],
  templateUrl: './organizathion-dashboard.component.html',
  styleUrl: './organizathion-dashboard.component.css'
})
export class OrganizathionDashboardComponent {

}
