import { Component } from '@angular/core';
import { SidebarAdminComponent } from "../../../shared/components/sidebar-admin/sidebar-admin.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [SidebarAdminComponent,RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
