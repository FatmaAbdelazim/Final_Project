import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-find-step3',
  imports: [RouterLink, FormsModule],
  templateUrl: './find-step3.component.html',
  styleUrl: './find-step3.component.css'
})
export class FindStep3Component {
  selectedPrice!: Number;
  selectedGender!: string;
  selectedSpecialization!: string ;
    constructor(private route: ActivatedRoute) { 
    this.selectedSpecialization = this.route.snapshot.paramMap.get('selectedSpecialization')!;
    this.selectedGender = this.route.snapshot.paramMap.get('selectedGender')!;
    }
}
