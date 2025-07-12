import { CommonModule } from '@angular/common';
import { AuthVoluntaryOrganizationService } from './../../../core/services/auth-voluntary-organization.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-acount',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './delete-acount.component.html',
  styleUrl: './delete-acount.component.css'
})
export class OrganaiztionDeleteAcountComponent implements OnInit {
  deleteFalg = false;
  orgId!: string
  constructor(private _AuthVoluntaryOrganizationService: AuthVoluntaryOrganizationService) { }
  ngOnInit(): void {
    this._AuthVoluntaryOrganizationService.decodeUserData();
    this.orgId = this._AuthVoluntaryOrganizationService.userData.id;
    // console.log(this.orgId);
  }
  deleteAcount() {
    this._AuthVoluntaryOrganizationService.deleteOrganization(this.orgId).subscribe({
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
