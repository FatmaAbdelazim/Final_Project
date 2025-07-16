import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Volunteer } from '../../models/volunteer-certificate';
import { environment } from '../environments/environment';
import { OppPublished } from '../../models/opp-published';
import { OpportunityFilter } from '../../models/opportunity-filter';
import { OrganizationData } from '../../models/organization-data';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }

  manageVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(`${environment.baseUrl}`)
  }
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

}
