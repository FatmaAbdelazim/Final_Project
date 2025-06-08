import { Component, OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';
import { TherapistService } from '../../Services/therapist.service';
import { TherapistResponse } from '../../Models/therapist-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-step1',
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './find-step1.component.html',
  styleUrl: './find-step1.component.css'
})
export class FindStep1Component implements OnInit {
  TherapistList: any[] = [];
  selectedSpecialization!: string ;
  SpecializationList!: string[];
  constructor(private therapistService: TherapistService) { }

  ngOnInit(): void {
    this.getAllTherapists();
  }

  getAllTherapists(): void {
  this.therapistService.getAll().subscribe((response: TherapistResponse) => {
    if (response.isPass) {
      this.TherapistList = response.data;
      console.log(this.selectedSpecialization);
      const allSpecializations = this.TherapistList
        .flatMap(t => t.specializations || []); 
      this.SpecializationList = [...new Set(allSpecializations)];
    }
  });
}

}

