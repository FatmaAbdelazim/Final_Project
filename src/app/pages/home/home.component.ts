import { Component } from '@angular/core';
import { HomeCardComponent } from "../../shared/components/home-card/home-card.component";
import { HomeReviewCardComponent } from "../../shared/components/home-review-card/home-review-card.component";

@Component({
  selector: 'app-home',
  imports: [HomeCardComponent, HomeReviewCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
