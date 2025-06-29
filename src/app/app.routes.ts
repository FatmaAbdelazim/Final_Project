import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { VolunteerRegisterComponent } from './features/volunteer/register/register.component';
import { VoluntaryOrganizationRegisterComponent } from './features/voluntary_organization/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { OpportunitiesComponent } from './pages/opportunities/opportunities.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { VerifyCodeComponent } from './shared/components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
export const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'volunteer_register', component: VolunteerRegisterComponent },
      { path: 'voluntary_organization_register', component: VoluntaryOrganizationRegisterComponent },
      { path: 'about', component: AboutComponent },
      { path: 'opportunities', component: OpportunitiesComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'verify-code', component: VerifyCodeComponent },
      { path: 'reset-pass', component: ResetPasswordComponent }

];
