import { Component, OnInit } from '@angular/core';

import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

import { RouterOutlet } from '@angular/router';
import { SignalRService } from './core/services/signal-rservice.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(
    private signalRService: SignalRService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.onNotification((message) => {
      console.log("🔔 توستر عند المستخدم:", message);
      this.toastr.success(message, "إشعار جديد");
    });

  }
  showSuccess() {
    setTimeout(() => {
      this.toastr.success('التوستر شغال بعد تأخير بسيط');
    }, 500);

  }
  title = 'بصمه';
}
