import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://tatawwa3.runasp.net/hub/notifications')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("✅ SignalR connection started"))
      .catch(err => console.error("❌ SignalR connection error:", err));
  }

  onNotification(callback: (notification: any) => void) {
    this.hubConnection.on('ReceiveNotification', callback);
  }
}
