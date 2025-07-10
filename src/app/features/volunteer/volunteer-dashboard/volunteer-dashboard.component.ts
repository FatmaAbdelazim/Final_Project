import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarVoluteerComponent } from "../../../shared/components/sidebar-voluteer/sidebar-voluteer.component";

@Component({
  selector: 'app-volunteer-dashboard',
  imports: [RouterOutlet, SidebarVoluteerComponent],
  templateUrl: './volunteer-dashboard.component.html',
  styleUrl: './volunteer-dashboard.component.css'
})
export class VolunteerDashboardComponent {

}
