import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TherapistService } from '../../Services/therapist.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  imports:[CommonModule,RouterLink]
})
export class SessionBookingComponent implements OnInit{
  therapistId!: string;
  selectedTherapist!: any;
  constructor(private route: ActivatedRoute, private therapistService: TherapistService) { }

  ngOnInit() {
    this.therapistId = this.route.snapshot.paramMap.get('id')!;
    this.therapistService.getById(this.therapistId).subscribe(response => {
    this.selectedTherapist = response.data;
      // console.log(this.selectedTherapist);
    });
  }
  selectedSlots: string[] = [];
  slotPrice = 150;

  slotsByDay = [
    { day: 'Sat 31', slots: [
      { time: '09:00 PM', booked: false },
      { time: '09:35 PM', booked: true },
      { time: '11:05 PM', booked: false },
      { time: '11:40 PM', booked: false }
    ]},
    { day: 'Sun 01', slots: [
      { time: '11:15 PM', booked: false }
    ]},
    { day: 'Mon 02', slots: [
      { time: '01:00 PM', booked: false },
      { time: '01:35 PM', booked: false },
      { time: '08:45 PM', booked: false },
      { time: '09:20 PM', booked: true },
      { time: '09:55 PM', booked: false }
    ]},
    { day: 'Tue 03', slots: [
      { time: '10:25 PM', booked: true }
    ]},
    { day: 'Wed 04', slots: [
      { time: '03:00 PM', booked: false },
      { time: '03:35 PM', booked: false }
    ]}
  ];

  toggleSlot(slotTime: string) {
    const index = this.selectedSlots.indexOf(slotTime);
    if (index === -1) {
      this.selectedSlots.push(slotTime);
    } else {
      this.selectedSlots.splice(index, 1);
    }
  }

  isSelected(slotTime: string): boolean {
    return this.selectedSlots.includes(slotTime);
  }

  get totalPrice(): number {
    return this.selectedSlots.length * this.slotPrice;
  }
}
