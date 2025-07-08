import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarOrgComponent } from "../../../shared/components/sidebar-org/sidebar-org.component";

@Component({
  selector: 'app-organizathion-dashboard',
  imports: [RouterOutlet, SidebarOrgComponent],
  templateUrl: './organizathion-dashboard.component.html',
  styleUrl: './organizathion-dashboard.component.css'
})
export class OrganizationDashboardComponent {

}
