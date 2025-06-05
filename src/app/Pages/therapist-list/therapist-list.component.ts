import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TherapistCardComponent } from "../../Components/therapist-card/therapist-card.component";
import { TherapistService } from '../../Services/therapist.service';
import { TherapistResponse } from '../../Models/therapist-response';

@Component({
  selector: 'app-therapist-list',
  imports: [FormsModule, TherapistCardComponent],
  templateUrl: './therapist-list.component.html',
  styleUrl: './therapist-list.component.css'
})
export class TherapistListComponent implements OnInit {
  searchTex!: string;
  selectedTherapist: any;
  TherapistList: any[] = [];
  TherapistFilterList: any[] = [];
  selectedSpecialization: string = "Select Specialization";
  selectedGender: string = "All";
  selectedMaxPrice: number = 200;
  constructor(private therapistService: TherapistService) { }

  ngOnInit(): void {
    this.getAllTherapists();
  }

  getAllTherapists(): void {
    this.therapistService.getAll().subscribe((response: TherapistResponse) => {
      if (response.isPass) {
        this.TherapistList = response.data;
        this.TherapistFilterList = this.TherapistList;
        // console.log(this.TherapistFilterList);
      }
    });
  }

  filterBySpecialization(specialization: string): void {
    if (!specialization) {
      this.TherapistFilterList = this.TherapistList;
    } else {
      this.therapistService.getBySpecialization(specialization).subscribe((response: TherapistResponse) => {
        if (response.isPass) {
          this.TherapistFilterList = response.data;
        }
      });
    }
  }

  getTherapistById(id: string): void {
    this.therapistService.getById(id).subscribe(response => {
      this.selectedTherapist = response;
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

filterBySpecialization2(): void {
  this.TherapistFilterList = this.TherapistFilterList.filter(therapist =>
    this.selectedSpecialization === 'Select Specialization'
    || therapist.specializations?.some((s: string) =>
         s.toLowerCase().includes(this.selectedSpecialization.toLowerCase())
      )
  );
}

applyFilters(): void {
  // في البداية نرجع للقائمة الأصلية (كل ال therapists)
  this.TherapistFilterList = [...this.TherapistList];
  
  // ننادي دوال الفلترة وحدة وحدة لتعديل القائمة المفلترة تدريجياً
  this.filterByGender();
  this.filterByPrice();
  this.filterBySpecialization2();
}



  resetFilters(): void {
    this.searchTex = '';
    this.selectedSpecialization = 'Select Specialization';
    this.selectedGender = 'All';
    this.selectedMaxPrice = 200;
    this.TherapistFilterList = this.TherapistList;
  }

}
