import { Component, OnInit } from '@angular/core';
import { ManageTherapistService } from '../../Services/manage-therapist.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-manage-therapist',
  imports: [RouterModule],
  templateUrl: './manage-therapist.component.html',
  styleUrl: './manage-therapist.component.css'
})
export class ManageTherapistComponent implements OnInit {
  therapists: any = [];

  constructor(private therapistService: ManageTherapistService, private router: Router) { }

  ngOnInit(): void {
  }

  viewDetails(therapist: any) {
    this.router.navigate(['/therapists', therapist.id]);
  }
}
