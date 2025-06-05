import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TherapistService } from '../../Services/therapist.service';

@Component({
  selector: 'app-therapist-details',
  imports: [RouterLink],
  templateUrl: './therapist-details.component.html',
  styleUrl: './therapist-details.component.css'
})
export class TherapistDetailsComponent implements OnInit{
  therapistId!: string;
  selectedTherapist!: any;
  constructor(private route: ActivatedRoute, private therapistService: TherapistService) { }

  ngOnInit() {
    this.therapistId = this.route.snapshot.paramMap.get('id')!;
    this.therapistService.getById(this.therapistId).subscribe(response => {
    this.selectedTherapist = response.data;
    });
  }
}

