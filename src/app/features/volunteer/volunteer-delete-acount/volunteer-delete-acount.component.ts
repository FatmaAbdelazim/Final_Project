import { AuthVolunteerService } from './../../../core/services/auth-volunteer.service';
import { Component, OnInit } from '@angular/core';
import { AuthVoluntaryOrganizationService } from '../../../core/services/auth-voluntary-organization.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-volunteer-delete-acount',
  imports: [FormsModule],
  templateUrl: './volunteer-delete-acount.component.html',
  styleUrl: './volunteer-delete-acount.component.css'
})
export class VolunteerDeleteAcountComponent implements OnInit {
  deleteFalg = false;
  volId!: string
  constructor(private _AuthVoluntaryOrganizationService: AuthVoluntaryOrganizationService , private _AuthVolunteerService : AuthVolunteerService) { }
  ngOnInit(): void {
    this._AuthVoluntaryOrganizationService.decodeUserData();
    this.volId = this._AuthVoluntaryOrganizationService.userData.id;
    // console.log(this.orgId);
  }
  deleteAcount() {
    this._AuthVolunteerService.deleteVolunteer(this.volId).subscribe({
      next: () => {
        this.deleteFalg = true;
        alert('تم حذف الحساب بنجاح :)');
      },
      error: (e) => {
        // console.log(e.error)
        alert(e.error);
      }
    })
  }
}
