import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OrganizationCard } from '../../models/organization-card';

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
  getAllOrganizations(): Observable<OrganizationCard[]> {
    return this.http.get<OrganizationCard[]>(`${environment.baseUrl}/api/OrganizationProfile/all`);
  }
  searchByOrgName(orgName: string): Observable<OrganizationCard[]> {
    return this.http.get<OrganizationCard[]>(`${environment.baseUrl}/by-Name?name=${orgName}`);
  }
  searchByCity(city: string): Observable<OrganizationCard[]> {
    return this.http.get<OrganizationCard[]>(`${environment.baseUrl}/by-city?city=${city}`);
  }
}
