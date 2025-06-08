import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-find-step2',
  imports: [RouterLink,FormsModule],
  templateUrl: './find-step2.component.html',
  styleUrl: './find-step2.component.css'
})
export class FindStep2Component {
  selectedGender!: string;
  selectedSpecialization!: string;
  constructor(private route: ActivatedRoute){
        this.selectedSpecialization = this.route.snapshot.paramMap.get('selectedSpecialization')!;
  }
}
