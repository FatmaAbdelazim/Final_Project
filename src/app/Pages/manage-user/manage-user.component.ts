import { TherapistResponse } from './../../Models/therapist-response';
import { Component, OnInit } from '@angular/core';
import { ManageUserService } from '../../Services/manage-user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  users: any;

  constructor(private userService: ManageUserService) {}

  ngOnInit(): void {
    this.loadUsersDetails();
  }

 loadUsersDetails() {
    // لازم تضيف () عشان تنفذ الدالة، وكمان تحدد نوع الـ response
    this.userService.getUsersDetails().subscribe((response: any) => {
      if (response.isPass) {
        this.users = response.data;
        console.log(this.users);
      } else {
        console.error('Failed to load users details');
      }
    }, error => {
      console.error('Error loading users details', error);
    });
  }
  makeAdmin(userId: string) {
    this.userService.makeAdmin(userId).subscribe({
      next: response => {
        console.log(response.data);
        this.loadUsersDetails(); // عشان تحدث القائمة بعد التغيير
      },
      error: err => console.error('Error making user admin', err)
    });
  }
}
