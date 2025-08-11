import { Notification } from './../../../models/notification';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../../../core/services/signal-rservice.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../core/services/notification-service.service';

@Component({
  selector: 'app-organization-notifications',
  imports: [CommonModule],
  templateUrl: './organization-notifications.component.html',
  styleUrl: './organization-notifications.component.css'
})
export class OrganizationNotificationsComponent implements OnInit {


  @Input() noti!: number;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  opportunitiesList!: any;
  pagedOpps: Notification[] = [];
  NotificationList!: Notification[];
  constructor(private _NotificationService: NotificationService,
    private signalRService: SignalRService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllNotification();
    this.setupSignalR();
  }

  getAllNotification() {
    this._NotificationService.getAllNotifications().subscribe({
      next: (response) => {
        this.NotificationList = response;
        this.currentPage = 1;
        this.updatePagedOpportunities();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  acceptVoluntterinTeam(requestId: string) {
    this._NotificationService.acceptVoluntterinTeam(requestId).subscribe({
      next: () => {
        alert("تم قبول الطلب بنجاح (:");
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  rejectVoluntterinTeam(requestId: string) {
    this._NotificationService.rejectVoluntterinTeam(requestId).subscribe({
      next: () => {
        alert("تم رفض الطلب بنجاح (:");
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  setupSignalR() {
    this.signalRService.startConnection();
   setTimeout(() => {
      this.signalRService.onNotification((data: any) => {
        console.log("إشعار واصل من SignalR:", data);
        this.toastr.info(data.Message, `${data.Title}`);
        this.NotificationList.unshift(data.Title);

        this.updatePagedOpportunities();
      });
    }, 1000);


    this.currentPage = 1;
    this.updatePagedOpportunities();
  }


  updatePagedOpportunities() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedOpps = this.NotificationList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedOpportunities();
    }
  }


  get totalPages(): number {
    return Math.ceil(this.NotificationList.length / this.itemsPerPage);
  }
}
