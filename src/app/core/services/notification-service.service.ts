import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
    getAllNotifications(): Observable<any[]> {
      return this.http.get<any[]>(`${environment.baseUrl}/api/Notifications?page=1&pageSize=10`)
    }
      acceptVoluntterinTeam(requestId:string): Observable<any> {
      return this.http.put<any>(`${environment.baseUrl}/api/Notifications/${requestId}/accept`,{},{ responseType: 'text' as 'json' });
    }
      rejectVoluntterinTeam(requestId:string): Observable<any[]> {
      return this.http.put<any>(`${environment.baseUrl}/api/Notifications/${requestId}/reject`,{} , { responseType: 'text' as 'json' });
    }
      acceptInvitations(InvitationsId:string): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/Notifications/invitations/${InvitationsId}/accept`,{},{ responseType: 'text' as 'json' });
  }
    rejectInvitations(InvitationsId:string): Observable<any[]> {
    return this.http.put<any>(`${environment.baseUrl}/api/Notifications/invitations/${InvitationsId}/reject`,{},{ responseType: 'text' as 'json' });
  }
}
