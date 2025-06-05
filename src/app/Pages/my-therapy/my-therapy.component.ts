import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../Services/userServices';

@Component({
  selector: 'app-my-therapy',
  imports: [RouterLink],
  templateUrl: './my-therapy.component.html',
  styleUrl: './my-therapy.component.css'
})
export class MyTherapyComponent implements OnInit {
  selectedTab: string = 'Upcoming';
  session = 0;
  userInfo: any;

  constructor(private userService: UserService) { }

  setTab(tab: string) {
    this.selectedTab = tab;
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (userData) => {
        this.userInfo = userData;
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }


}
