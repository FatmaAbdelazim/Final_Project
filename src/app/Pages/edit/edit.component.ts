import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/userServices';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [FormsModule, ReactiveFormsModule,RouterLink]
})
export class EditProfileComponent implements OnInit {
  isLoading: boolean = false;

    editForm = new FormGroup({
    FullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    PhoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
    DateOfBirth: new FormControl('', Validators.required),
    Gender: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) {}

  get FullName() {
    return this.editForm.controls['FullName'];
  }

  get PhoneNumber() {
    return this.editForm.controls['PhoneNumber'];
  }

  get DateOfBirth() {
    return this.editForm.controls['DateOfBirth'];
  }

  get Gender() {
    return this.editForm.controls['Gender'];
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.isLoading = true;
    this.userService.getUserProfile().subscribe({
      next: (userData) => {
        this.editForm.patchValue(userData);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching user data', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const updatedData = {
      FullName: this.FullName.value!,
      PhoneNumber: this.PhoneNumber.value!,
      DateOfBirth: this.DateOfBirth.value!,
      Gender: this.Gender.value!
    };

    this.userService.updateUserProfile(updatedData).subscribe({
      next: () => {
        console.log('Profile updated successfully!');
        this.router.navigate(['/user/profile']);
      },
      error: (err) => {
        console.error('Error updating profile', err);
      }
    });
  }
}
