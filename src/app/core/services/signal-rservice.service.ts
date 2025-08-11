import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

 startConnection() {
  this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://tatawwa3.runasp.net/hub/notifications', {
      accessTokenFactory: () => localStorage.getItem('userToken') || ''
    })
    .withAutomaticReconnect()
    .build();

  this.hubConnection
    .start()
    .then(() => {
      console.log("✅ SignalR connection started");

      this.hubConnection.on('ReceiveNotification', data => {
        console.log("✅ وصل إشعار من السيرفر:", data);
      });
    })
    .catch(err => console.error("❌ SignalR connection error:", err));
}

onNotification(callback: (notification: any) => void) {
  console.log("🟡 Preparing to listen for notifications...");
  this.hubConnection.on('ReceiveNotification', (data) => {
    console.log("🟢 Notification received:", data);
    callback(data);
  });
}

}
