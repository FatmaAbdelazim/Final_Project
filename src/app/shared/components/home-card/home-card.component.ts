import { OpportunitiesService } from './../../../core/services/opportunities.service';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Opportunity } from '../../../models/opportunty';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home-card',
  imports: [RouterLink,CommonModule],
  templateUrl: './home-card.component.html',
  styleUrl: './home-card.component.css'
})
export class HomeCardComponent {
  @Input() Opportunity!: Opportunity;

  constructor() {}
}
