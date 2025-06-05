import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../Services/userServices';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  userInfo:any;
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (userData) => {
        this.userInfo = userData;
        // alert(userData);
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }

}
