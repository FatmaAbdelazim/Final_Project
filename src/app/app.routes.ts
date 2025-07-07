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
import { OrganizationSettingsComponent } from './features/voluntary_organization/organization-settings/organization-settings.component';
import { OrganizationNotificationsComponent } from './features/voluntary_organization/organization-notifications/organization-notifications.component';
import { OrganizationCertificationsComponent } from './features/voluntary_organization/organization-certifications/organization-certifications.component';
import { OrganizationHomeComponent } from './features/voluntary_organization/organization-home/organization-home.component';
import { OrganizationInvitationsComponent } from './features/voluntary_organization/organization-invitations/organization-invitations.component';
import { OrganizationDashboardComponent } from './features/voluntary_organization/organizathion-dashboard/organizathion-dashboard.component';
import { UpdateOppComponent } from './features/voluntary_organization/update-opp/update-opp/update-opp.component';
import { CreateTeamComponent } from './features/voluntary_organization/create-team/create-team/create-team.component';
import { VolunteerManageComponent } from './features/voluntary_organization/volunteer-manage/volunteer-manage/volunteer-manage.component';
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
            path: 'organization-dashboard', component: OrganizationDashboardComponent
            , children: [
                  { path: '', component: OrganizationHomeComponent },
                  { path: 'organization-home', component: OrganizationHomeComponent },
                  { path: 'organization-teams', component: OrganizationTeamsComponent },
                  { path: 'organization-settings', component: OrganizationSettingsComponent },
                  { path: 'organization-notifications', component: OrganizationNotificationsComponent },
                  { path: 'organization-certifications', component: OrganizationCertificationsComponent },
                  { path: 'organization-invitations', component: OrganizationInvitationsComponent },
                  { path: 'managment-opp', component: ManagmentOppComponent }
            ]
      },
      { path: 'edit-opp/:id', component: UpdateOppComponent },
      { path: 'create-team', component: CreateTeamComponent },
      { path: 'volunteers-management/:id', component: VolunteerManageComponent },
];
