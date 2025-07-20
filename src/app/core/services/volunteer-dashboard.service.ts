import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { VolunteerOpportuinties } from '../../models/volunteer-opportuinties';
import { Observable } from 'rxjs';
import { VolunteerRecommendedOpportunities } from '../../models/volunteer-recommended-opportunities';
import { VolunteerOppAttendence } from '../../models/volunteer-opp-attendence';
import { Volunteer, VolunteerCertificate } from '../../models/volunteer-certificate';

@Injectable({
  providedIn: 'root'
})
export class VolunteerDashboardService {

  constructor(private http: HttpClient) { }

  getMyOpportunites(id: string): Observable<VolunteerOpportuinties[]> {
    return this.http.get<VolunteerOpportuinties[]>(`${environment.baseUrl}/api/VolunteerDashboard/submitted/${id}`)
  }
  getRecommendedOpportunities(id: string): Observable<VolunteerRecommendedOpportunities[]> {
    return this.http.get<VolunteerRecommendedOpportunities[]>(`${environment.baseUrl}/api/VolunteerDashboard/recommended?volunteerId=${id}`)

  }
  getStatisticsOppForVolunteerAttendence(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/api/VolunteerAttendanceAndCert/profile/summary`);
  }
  getOppVolunteerParticipations(): Observable<VolunteerOppAttendence[]> {
    return this.http.get<VolunteerOppAttendence[]>(`${environment.baseUrl}/api/VolunteerAttendanceAndCert/profile/participations`);
  }
  getVolunteerCertifications(): Observable<VolunteerCertificate[]> {
    return this.http.get<VolunteerCertificate[]>(`${environment.baseUrl}/api/VolunteerAttendanceAndCert/certificates`);
  }
  downloadVolunteerCertification(certUrl: string): Observable<Blob> {
    return this.http.get(
      `${environment.baseUrl}/api/VolunteerAttendanceAndCert/certificate/${certUrl}/download`,
      {
        responseType: 'blob'
      }
    );
  }
  getPreferencesNotif(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/Notifications/GetPreferencesNotif`);
  }
  updatePreferencesNotif(data: object): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/api/Notifications/ UpdatePreferencesNotif`, data,{ responseType: 'text' as 'json' });
  }
  profile(id:string | null): Observable<any>{
    return this.http.get(`${environment.baseUrl}/api/VolunteersProfile/${id}/profile-details`)
  }
  getData(id:string):Observable<Volunteer>{
    return this.http.get<Volunteer>(`${environment.baseUrl}/api/VolunteerSettings/${id}`)
  }
  updateVolInfo(id:string,data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/VolunteerSettings/${id}`, data, { responseType: 'text' as 'json' })
  }
    
}
