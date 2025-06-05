import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { MyTherapyComponent } from './Pages/my-therapy/my-therapy.component';
import { FindATherapistComponent } from './Pages/find-a-therapist/find-a-therapist.component';
import { EditProfileComponent } from './Pages/edit/edit.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { ProfileInfoComponent } from './Components/profile-info/profile-info.component';
import { FindStep1Component } from './Components/find-step1/find-step1.component';
import { FindStep2Component } from './Components/find-step2/find-step2.component';
import { FindStep3Component } from './Components/find-step3/find-step3.component';
import { FindStep4Component } from './Components/find-step4/find-step4.component';
import { TherapistListComponent } from './Pages/therapist-list/therapist-list.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { SessionBookingComponent } from './Pages/booking/booking.component';
import { TherapistDetailsComponent } from './Pages/therapist-details/therapist-details.component';
import { AdminDashboardComponent } from './Pages/admin-dashboard/admin-dashboard.component';
import { ManageBookingComponent } from './Pages/manage-booking/manage-booking.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ConfirmBookingComponent } from './Pages/confirm-booking/confirm-booking.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { ManageTherapistComponent } from './Pages/manage-therapist/manage-therapist.component';
import { ManageUserComponent } from './Pages/manage-user/manage-user.component';
import { RoleGuard } from './guards/user.guard';
export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'Register', component: RegisterComponent },
    {
        path: 'user',
        component: UserLayoutComponent,
        canActivate: [RoleGuard],
        data: { role: 'User' },
        children: [
            { path: '', component: HomeComponent },
            { path: 'ThirapistList', component: TherapistListComponent },
            {
                path: 'profile', component: ProfileComponent,
                children: [
                    { path: '', component: ProfileInfoComponent },
                    { path: 'edit', component: EditProfileComponent },
                    { path: 'changePassowerd', component: ChangePasswordComponent }
                ],

            },
            {
                path: 'FindATherapist', component: FindATherapistComponent,
                children: [
                    { path: '', component: FindStep1Component },
                    { path: 'step2/:selectedSpecialization', component: FindStep2Component },
                    { path: 'step3/:selectedSpecialization/:selectedGender', component: FindStep3Component },
                    { path: 'step4/:selectedSpecialization/:selectedGender/:selectedPrice', component: FindStep4Component },
                    { path: 'step2', component: FindStep2Component },
                    { path: 'step3', component: FindStep3Component },
                    { path: 'step4', component: FindStep4Component },
                ],
            },
            { path: 'TherapistDetails/:id', component: TherapistDetailsComponent },
            { path: 'Booking/:id', component: SessionBookingComponent },
            { path: 'ConfirmBooking', component: ConfirmBookingComponent },
            { path: 'MyTherpy', component: MyTherapyComponent },
        ]
    },
    {
        path: 'admin',
        canActivate: [RoleGuard],
        data: { role: 'Admin' },
        component: AdminLayoutComponent,
        // canActivate: [AdminGuard],
        children: [
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'manage-therapist', component: ManageTherapistComponent, children: [{ path: 'therapists/:id', component: TherapistDetailsComponent }] },
            { path: 'manage-user', component: ManageUserComponent, children: [] },
            { path: 'manage-booking', component: ManageBookingComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
    },
    { path: '**', component: NotFoundComponent },

];
