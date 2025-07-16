import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OrganizationData } from '../../models/organization-data';
import { TeamsManagment } from '../../models/teams-managment';

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
 sendInvetation(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/Invitations`, data)
  } 
}
