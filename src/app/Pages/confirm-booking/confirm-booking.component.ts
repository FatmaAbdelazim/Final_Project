import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-booking',
  imports: [],
  templateUrl: './confirm-booking.component.html',
  styleUrl: './confirm-booking.component.css'
})
export class ConfirmBookingComponent implements OnInit{
  transactionId: string = '';

  ngOnInit(): void {
    this.generateTransactionId();
  }

  generateTransactionId(): void {
    const timestamp = Date.now(); // الوقت الحالي
    const randomPart = Math.floor(Math.random() * 100000); // جزء عشوائي
    this.transactionId = `TX-${timestamp}-${randomPart}`;
  }
}
