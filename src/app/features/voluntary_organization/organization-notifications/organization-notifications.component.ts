import { Notification } from './../../../models/notification';
import { Component, OnInit } from '@angular/core';
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
export class OrganizationNotificationsComponent implements OnInit{

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
   acceptVoluntterinTeam(requestId:string){
    this._NotificationService.acceptVoluntterinTeam(requestId).subscribe({
      next:()=>{
        alert("تم قبول الطلب بنجاح (:");
      },
      error:(e)=>{
          console.log(e.error);
      }
    })
  }
    rejectVoluntterinTeam(requestId:string){
    this._NotificationService.rejectVoluntterinTeam(requestId).subscribe({
      next:()=>{
        alert("تم رفض الطلب بنجاح (:");
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
