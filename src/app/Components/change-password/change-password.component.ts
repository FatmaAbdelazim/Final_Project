import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/userServices';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  imports:[FormsModule,ReactiveFormsModule]
})
export class ChangePasswordComponent {
  passwordForm = new FormGroup(
    {
      Email: new FormControl('', [Validators.required, Validators.email]),
      CurrentPassword: new FormControl('', Validators.required),
      NewPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },
  );

  constructor(private router: Router, private userService: UserService) {}

  get CurrentPassword() {
    return this.passwordForm.get('CurrentPassword');
  }

  get NewPassword() {
    return this.passwordForm.get('NewPassword');
  }

  get Email() {
    return this.passwordForm.get('Email');
  }

  onSubmit() {
              console.error(this.passwordForm.value);
    if (this.passwordForm.valid) {
      this.userService.changePassword(this.passwordForm.value).subscribe({
        next: (res) => {
          alert("Password changed successfully");
          this.router.navigate(['/user/profile']);
        },
        error: (err) => {
          alert("Error changing password");
          // console.error(err.error?.message);
        }
      });
    }
  }
}
