import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { OppPublished } from '../../models/opp-published';
import { OpportunityFilter } from '../../models/opportunity-filter';
import { OrganizationData } from '../../models/organization-data';
import { TeamsManagment } from '../../models/teams-managment';
import { volunteersForAdmin } from '../../models/volunteersForAdmin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }

  getAllOppPublished(): Observable<OppPublished[]> {
    return this.http.get<OppPublished[]>(`${environment.baseUrl}/api/VolunteerOpportunity/morag3a-opportunities`);
  }
  approveOpp(oppId: string): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/VolunteerOpportunity/approve/${oppId}`, {}, { responseType: 'text' as 'json' });
  }

  rejectOpp(oppId: string): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/VolunteerOpportunity/reject/${oppId}`, {}, { responseType: 'text' as 'json' });
  }
  searchFilter(filter: OpportunityFilter): Observable<OppPublished[]> {
    return this.http.post<OppPublished[]>(`${environment.baseUrl}/api/VolunteerOpportunity/search-by-filters`, filter);
  }
  getOrganizationStatistics(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/GetOrganizationStatistics`);
  }

  searchByOrgName(orgName: string): Observable<OrganizationData[]> {
    return this.http.get<OrganizationData[]>(`${environment.baseUrl}/by-Name?name=${orgName}`);
  }
  searchByCity(city: string): Observable<OrganizationData[]> {
    return this.http.get<OrganizationData[]>(`${environment.baseUrl}/by-city?city=${city}`);
  }
  searchByStatus(status: string): Observable<OrganizationData[]> {
    return this.http.get<OrganizationData[]>(`${environment.baseUrl}/by-status?status=${status}`);
  }

  getAllOrganization(): Observable<OrganizationData[]> {
    return this.http.get<OrganizationData[]>(`${environment.baseUrl}/all`);
  }
  banOrganaization(orgId: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}/ban/${orgId}`, {})
  }
  deleteOrganization(orgId: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/OrganizationProfile/delete/${orgId}`, { responseType: 'text' as 'json' });
  }
//
  approveOrg(orgId: string): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/approve/${orgId}`, {}, { responseType: 'text' as 'json' });
  }

  getTeamsStatistics(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/MangeVolunteerTeams/GetTeamsStatistics`);
  }
  getAllTeams(): Observable<TeamsManagment[]> {
    return this.http.get<TeamsManagment[]>(`${environment.baseUrl}/api/MangeVolunteerTeams/all`);
  }
  searchByTeamName(teamName: string): Observable<TeamsManagment[]> {
    return this.http.get<TeamsManagment[]>(`${environment.baseUrl}/api/MangeVolunteerTeams/search?name=${teamName}`);
  }
  deleteTeam(teamId: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/MangeVolunteerTeams/Delet_Team${teamId}`, { responseType: 'text' as 'json' });
  }
  getCountOfOppDraft(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/VolunteerOpportunity/count/draft`);
  }
  getCountOfOppCompleted(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/VolunteerOpportunity/count/completed`);
  }
   getOrganaizationProfile(orgId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/api/OrganizationProfile/admin/organizations/${orgId}`);
  }
  getAllVolunnteers(): Observable<volunteersForAdmin[]> {
    return this.http.get<volunteersForAdmin[]>(`${environment.baseUrl}/api/AdminVolunteer/admin/volunteers`);
  }
  searchByVolName(volName: string): Observable<volunteersForAdmin[]> {
    return this.http.get<volunteersForAdmin[]>(`${environment.baseUrl}/api/AdminVolunteer/by-name?name=${volName}`);
  }
  searchByVolCity(city: string): Observable<volunteersForAdmin[]> {
    return this.http.get<volunteersForAdmin[]>(`${environment.baseUrl}/api/AdminVolunteer/by-city?city=${city}`);
  }
  searchByVolStatus(status: string): Observable<volunteersForAdmin[]> {
    return this.http.get<volunteersForAdmin[]>(`${environment.baseUrl}/api/AdminVolunteer/by-status?status=${status}`);
  }
  searchByVolHours(hours:number): Observable<volunteersForAdmin[]> {
    return this.http.get<volunteersForAdmin[]>(`${environment.baseUrl}/api/AdminVolunteer/by-hours?hours=${hours}`);
  }
  banVol(id: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/AdminVolunteer/ban/${id}`, {}, { responseType: 'text' as 'json' })
  }
  deleteVol(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/VolunteersProfile/deleteVolunter/${id}`, { responseType: 'text' as 'json' });
  }
}
