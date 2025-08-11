import { Notification } from './../../../models/notification';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../../../core/services/signal-rservice.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../core/services/notification-service.service';

@Component({
  selector: 'app-volunteer-notifications',
  imports: [CommonModule],
  templateUrl: './volunteer-notifications.component.html',
  styleUrl: './volunteer-notifications.component.css'
})
export class VolunteerNotificationsComponent implements OnInit {

  Flag = false;
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
  acceptInvitations(InvitationsId: string) {
    this._NotificationService.acceptInvitations(InvitationsId).subscribe({
      next: () => {
        alert("تم قبول الدعوة بنجاح (:");
        // this.Flag = true;
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
  rejectInvitations(InvitationsId: string) {
    this._NotificationService.rejectInvitations(InvitationsId).subscribe({
      next: () => {
        alert("تم رفض الدعوة بنجاح (:");
        // this.Flag = true;
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

