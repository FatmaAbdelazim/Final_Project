import { Component } from '@angular/core';
import { TherapistCardComponent } from "../therapist-card/therapist-card.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TherapistService } from '../../Services/therapist.service';
import { TherapistResponse } from '../../Models/therapist-response';

@Component({
  selector: 'app-find-step4',
  imports: [TherapistCardComponent,RouterLink],
  templateUrl: './find-step4.component.html',
  styleUrl: './find-step4.component.css'
})
export class FindStep4Component {
  selectedTherapist: any;
  TherapistList: any[] = [];
  TherapistFilterList: any[] = [];
  selectedSpecialization!: string;
  selectedGender!: string ;
  selectedMaxPrice!: number;
  constructor(private therapistService: TherapistService,private route: ActivatedRoute) { 
    this.selectedSpecialization = this.route.snapshot.paramMap.get('selectedSpecialization')!;
    this.selectedGender = this.route.snapshot.paramMap.get('selectedGender')!;
    this.selectedMaxPrice = Number(this.route.snapshot.paramMap.get('selectedPrice')!);
  }


  ngOnInit(): void {
    this.getAllTherapists();
  }

  getAllTherapists(): void {
    this.therapistService.getAll().subscribe((response: TherapistResponse) => {
      if (response.isPass) {
        this.TherapistList = response.data;
        this.TherapistFilterList = this.TherapistList;
            this.applyFilters();
      }
    });
  }
 filterByGender(): void {
  this.TherapistFilterList = this.TherapistFilterList.filter(therapist =>
    this.selectedGender === 'All' || therapist.gender?.toLowerCase() === this.selectedGender.toLowerCase()
  );
}

filterByPrice(): void {
  this.TherapistFilterList = this.TherapistFilterList.filter(therapist =>
    therapist.pricePerSession <= this.selectedMaxPrice
  );
}

filterBySpecialization(): void {
  this.TherapistFilterList = this.TherapistFilterList.filter(therapist =>
    this.selectedSpecialization === 'Select Specialization'
    || therapist.specializations?.some((s: string) =>
         s.toLowerCase().includes(this.selectedSpecialization.toLowerCase())
      )
  );
}

applyFilters(): void {
  this.TherapistFilterList = [...this.TherapistList];
  this.filterByGender();
  this.filterByPrice();
  this.filterBySpecialization();
}
}
