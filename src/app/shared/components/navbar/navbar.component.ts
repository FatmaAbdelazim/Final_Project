import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthVoluntaryOrganizationService } from '../../../core/services/auth-voluntary-organization.service';
import { SignalRService } from '../../../core/services/signal-rservice.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  private readonly router = inject(Router);
  private readonly _AuthVoluntaryOrganizationService = inject(AuthVoluntaryOrganizationService)
  isLoggedIn = false;
  userImage: string = '/assets/user.png';
  role! : string;


  notificationCount = 0;

  constructor(private signalRService: SignalRService) {}

  ngOnInit() {
  this._AuthVoluntaryOrganizationService.isLoggedIn$.subscribe((status) => {
    this.isLoggedIn = status;
  });

  this._AuthVoluntaryOrganizationService.role$.subscribe(role => {
    this.role = role ?? '';
  });

  this._AuthVoluntaryOrganizationService.decodeUserData();
    
    this.signalRService.startConnection();
    this.signalRService.onNotification((notification) => {
      console.log('📩 إشعار جديد:', notification);
      this.notificationCount++;
    });
}

  clearNotifications() {
    this.notificationCount = 0;
  }

getImage(){
  if(localStorage.getItem('Image')){
    this.userImage = 'https://tatawwa3.runasp.net/uploads/ProfileImages/' +localStorage.getItem('Image')!;
    return this.userImage;
  }
  return this.userImage;
}

logout() {
  localStorage.removeItem('userToken');
  localStorage.removeItem('UserAuthToken');
  localStorage.removeItem('fName');
  localStorage.removeItem('UserId');
  localStorage.removeItem('role');
  localStorage.removeItem('Image');
  this.isLoggedIn = false;
  this.router.navigate(['/login']);
}

}
