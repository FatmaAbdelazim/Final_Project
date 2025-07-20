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
export class VolunteerNotificationsComponent implements OnInit{

  NotificationList!: Notification[];
  constructor(private _NotificationService : NotificationService,  
    private signalRService: SignalRService,
    private toastr: ToastrService){}
  ngOnInit(): void {
    this.getAllNotification();
    this.setupSignalR();
  }

  getAllNotification(){
    this._NotificationService.getAllNotifications().subscribe({
      next:(response)=>{
          this.NotificationList = response;
      },
      error:(e)=>{
          console.log(e.error);
      }
    })
  }
   acceptInvitations(InvitationsId:string){
    this._NotificationService.acceptInvitations(InvitationsId).subscribe({
      next:()=>{
        alert("تم قبول الدعوة بنجاح (:");
      },
      error:(e)=>{
          console.log(e.error);
      }
    })
  }
    rejectInvitations(InvitationsId:string){
    this._NotificationService.rejectInvitations(InvitationsId).subscribe({
      next:()=>{
        alert("تم رفض الدعوة بنجاح (:");
      },
      error:(e)=>{
          console.log(e.error);
      }
    })
  }
  setupSignalR() {
    this.signalRService.startConnection();
    this.signalRService.onNotification((newNotif: Notification) => {
      this.NotificationList.unshift(newNotif); // نضيفه في أول الليست
      this.toastr.info(newNotif.message, `📢 ${newNotif.title}`);
    });
  }
}

