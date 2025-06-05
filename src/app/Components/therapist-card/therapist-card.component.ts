import { Component, Input, input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-therapist-card',
  imports: [RouterLink],
  templateUrl: './therapist-card.component.html',
  styleUrl: './therapist-card.component.css'
})
export class TherapistCardComponent {
   @Input() therapist: any;
   constructor(){
   }
}
