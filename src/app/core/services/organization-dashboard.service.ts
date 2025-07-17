import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OrganizationData } from '../../models/organization-data';
import { Participant } from '../../models/participant';
import { Organization, VolunteerApplications } from '../../models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationDashboardService {

  constructor(private http: HttpClient) { }
  getPreferencesNotif(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/Notifications/org-preferences`);
  }
  updatePreferencesNotif(data: object): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/Notifications/org-preferences`, data, { responseType: 'text' as 'json' });
  }
  addOpp(data: FormData): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/VolunteerOpportunity/nshr forsa`, data);
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
  sendInvetation(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/Invitations`, data)
  }
  updateAttendance(data: Participant[]): Observable<any> {
    return this.http.put(`${ environment.baseUrl }/api/Attendance/attendance/update`, data, {
      responseType: 'text' as 'json'
    })
  }
  getOrgInfo(id: string): Observable<Organization> {
    return this.http.get<Organization>(`${ environment.baseUrl }/api/OrganizationProfile/getupdatedata/${ id }`)
  }
  updateOrgInfo(data: FormData): Observable<any> {
    return this.http.put(`${ environment.baseUrl }/api/OrganizationProfile/update`, data)
  }
  getVolunteersStatistics(id: string | null): Observable<any> {
    return this.http.get(`${ environment.baseUrl }/api/VolunteerMangment/statistics?opp_id=${ id }`)
  }
  getVolunteerApplications(id: string | null): Observable<VolunteerApplications[]> {
    return this.http.get<VolunteerApplications[]>(`${ environment.baseUrl }/api/VolunteerMangment/opportunity-applications?OppId=${ id }`)
  }
  reject(id: string | null): Observable<string> {
    return this.http.put<string>(`${ environment.baseUrl }/api/VolunteerMangment/${ id }/reject`, {}, {
      responseType: 'text' as 'json'
    })
  }
  accept(id: string | null): Observable<string> {
    return this.http.put<string>(`${ environment.baseUrl }/api/VolunteerMangment/${ id }/accept`, {}, {
      responseType: 'text' as 'json'
    })
  }
  searchVolByName(name: string, id: string | null): Observable<VolunteerApplications[]> {
    return this.http.get<VolunteerApplications[]>(`${ environment.baseUrl }/api/VolunteerMangment/by-name?name=${ name }&opp_id=${ id }`)
  }
  searchVolByDate(date: Date, id: string | null): Observable<VolunteerApplications[]> {
    return this.http.get<VolunteerApplications[]>(`${ environment.baseUrl }/api/VolunteerMangment/by-date?date=${ date }&opp_id=${ id }`)
  }
}
