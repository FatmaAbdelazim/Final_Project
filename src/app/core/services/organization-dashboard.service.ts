import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationDashboardService {

  constructor(private http:HttpClient) { }
    getPreferencesNotif(): Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}/api/Notifications/org-preferences`);
    }
    updatePreferencesNotif(data: object): Observable<any> {
      return this.http.put<any>(`${environment.baseUrl}/api/Notifications/org-preferences`, data,{ responseType: 'text' as 'json' });
    }
    
}
