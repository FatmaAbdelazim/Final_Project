import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-find-step3',
  imports: [RouterLink, FormsModule],
  templateUrl: './find-step3.component.html',
  styleUrl: './find-step3.component.css'
})
export class FindStep3Component {
  selectedPrice: Number = 50;
  selectedGender!: string;
  selectedSpecialization: string = "Select Specialization";
}
