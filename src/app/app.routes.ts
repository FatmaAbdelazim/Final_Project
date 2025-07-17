import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { VolunteerRegisterComponent } from './features/volunteer/register/register.component';
import { VoluntaryOrganizationRegisterComponent } from './features/voluntary_organization/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { OpportunitiesComponent } from './pages/opportunities/opportunities.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { OpportunityDetailsComponent } from './pages/opportunity-details/opportunity-details.component';
import { VerifyCodeComponent } from './shared/components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { JoinOppComponent } from './features/volunteer/join-opp/join-opp.component';
import { JoinTeamComponent } from './features/volunteer/join-team/join-team.component';
import { TeamDetailsComponent } from './pages/team-details/team-details/team-details.component';
import { ManagmentOppComponent } from './features/voluntary_organization/managment-opp/managment-opp.component';
import { VerifyEmailComponent } from './shared/components/verify-email/verify-email.component';
import { OrganizationTeamsComponent } from './features/voluntary_organization/organization-teams/organization-teams.component';
import { OrganizationNotificationsComponent } from './features/voluntary_organization/organization-notifications/organization-notifications.component';
import { OrganizationCertificationsComponent } from './features/voluntary_organization/organization-certifications/organization-certifications.component';
import { OrganizationHomeComponent } from './features/voluntary_organization/organization-home/organization-home.component';
import { OrganizationInvitationsComponent } from './features/voluntary_organization/organization-invitations/organization-invitations.component';
import { OrganizationDashboardComponent } from './features/voluntary_organization/organizathion-dashboard/organizathion-dashboard.component';
import { UpdateOppComponent } from './features/voluntary_organization/update-opp/update-opp/update-opp.component';
import { CreateTeamComponent } from './features/voluntary_organization/create-team/create-team/create-team.component';
import { ManageVolunteerComponent } from './features/voluntary_organization/manage-volunteer/manage-volunteer/manage-volunteer.component';
import { AttendComponent } from './features/voluntary_organization/attend/attend/attend.component';
import { OrganaiztionCheckNotificationComponent } from './features/voluntary_organization/check-notification/check-notification.component';
import { OrganaiztionDeleteAcountComponent } from './features/voluntary_organization/delete-acount/delete-acount.component';
import { AddOppComponent } from './features/voluntary_organization/add-opp/add-opp.component';
import { EditTeamComponent } from './features/voluntary_organization/edit-team/edit-team.component';
import { OrganizationChangePassComponent } from './features/voluntary_organization/change-pass/change-pass.component';
import { VolunteerDashboardComponent } from './features/volunteer/volunteer-dashboard/volunteer-dashboard.component';
import { VolunteerDeleteAcountComponent } from './features/volunteer/volunteer-delete-acount/volunteer-delete-acount.component';
import { VolunteerSendNotificationComponent } from './features/volunteer/volunteer-send-notification/volunteer-send-notification.component';
import { VolunteerChangePassComponent } from './features/volunteer/volunteer-change-pass/volunteer-change-pass.component';
import { VolunteerAttendanceAndCertificationsComponent } from './features/volunteer/volunteer-attendance-and-certifications/volunteer-attendance-and-certifications.component';
import { VolunteerNotificationsComponent } from './features/volunteer/volunteer-notifications/volunteer-notifications.component';
import { VolunteerHomeComponent } from './features/volunteer/volunteer-home/volunteer-home.component';
import { VolunteerInfoComponent } from './features/volunteer/volunteer-info/volunteer-info/volunteer-info.component';
import { OrganizationInfoComponent } from './features/voluntary_organization/organization-info/organization-info/organization-info.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './features/admin/admin-home/admin-home.component';
import { ManagmentVolunteersComponent } from './features/admin/managment-volunteers/managment-volunteers.component';
import { ManagmentOrganizationComponent } from './features/admin/managment-organization/managment-organization.component';
import { ManagmentTeamsComponent } from './features/admin/managment-teams/managment-teams.component';
import { ReviewOppComponent } from './features/admin/review-opp/review-opp.component';
import { ReviewRatingComponent } from './features/admin/review-rating/review-rating.component';
import { OrganaizationProfileComponent } from './features/admin/organaization-profile/organaization-profile.component';
export const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'volunteer_register', component: VolunteerRegisterComponent },
      { path: 'voluntary_organization_register', component: VoluntaryOrganizationRegisterComponent },
      { path: 'about', component: AboutComponent },
      { path: 'opportunities', component: OpportunitiesComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'opportunity-details/:id', component: OpportunityDetailsComponent },
      { path: 'verify-code', component: VerifyCodeComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'reset-pass', component: ResetPasswordComponent },
      { path: 'join-opp', component: JoinOppComponent },
      { path: 'join-team', component: JoinTeamComponent },
      { path: 'team-details/:id', component: TeamDetailsComponent },
      {
            path: 'volunteer-dashboard', component: VolunteerDashboardComponent
            , children: [
                  { path: '', component: VolunteerHomeComponent },
                  { path: 'volunteer-home', component: VolunteerHomeComponent },
                  { path: 'volunteer-notifications', component: VolunteerNotificationsComponent },
                  { path: 'attendence-and-certifications', component: VolunteerAttendanceAndCertificationsComponent },
                  { path: 'volunteer-info', component: VolunteerInfoComponent },
                  { path: 'volunteer-change-pass', component: VolunteerChangePassComponent },
                  { path: 'volunteer-check-notfication', component: VolunteerSendNotificationComponent },
                  { path: 'volunteer-delete-acount', component: VolunteerDeleteAcountComponent },
            ]
      },
      {
            path: 'organization-dashboard', component: OrganizationDashboardComponent
            , children: [
                  { path: '', component: OrganizationHomeComponent },
                  { path: 'organization-home', component: OrganizationHomeComponent },
                  { path: 'organization-teams', component: OrganizationTeamsComponent },
                  { path: 'organization-notifications', component: OrganizationNotificationsComponent },
                  { path: 'organization-certifications', component: OrganizationCertificationsComponent },
                  { path: 'organization-invitations', component: OrganizationInvitationsComponent },
                  { path: 'managment-opp', component: ManagmentOppComponent },
                  { path: 'manage-volunteer/:id', component: ManageVolunteerComponent },
                  { path: 'attend/:id', component: AttendComponent },
                  { path: 'organization-info', component: OrganizationInfoComponent },
                  { path: 'organization-change-pass', component: OrganizationChangePassComponent },
                  { path: 'organization-check-notfication', component: OrganaiztionCheckNotificationComponent },
                  { path: 'organization-delete-acount', component: OrganaiztionDeleteAcountComponent },
            ]
      },
      { path: 'edit-opp/:id', component: UpdateOppComponent },
      { path: 'create-team', component: CreateTeamComponent },
      { path: 'add-opp', component: AddOppComponent },
      { path: 'edit-team/:id', component: EditTeamComponent },
      {
            path: 'admin-dashboard', component: AdminDashboardComponent,
            children: [
                  { path: '', component: AdminHomeComponent },
                  { path: 'home', component: AdminHomeComponent },
                  { path: 'managment-volunteers', component: ManagmentVolunteersComponent },
                  { path: 'managment-organization', component: ManagmentOrganizationComponent },
                  { path: 'organization-profile', component: OrganaizationProfileComponent },
                  { path: 'managment-teams', component: ManagmentTeamsComponent },
                  { path: 'review-opp', component: ReviewOppComponent },
                  { path: 'review-rating', component: ReviewRatingComponent },

            ]
      },
];
