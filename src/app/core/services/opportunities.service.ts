import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Opportunity } from '../../models/opportunty';
import { OpportuntyDetails } from '../../models/opportunty-details';

@Injectable({
  providedIn: 'root'
})
export class OpportunitiesService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://tatawwa3.runasp.net';
  getAllOpportunities(): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>(`${this.baseUrl}/api/HomePage/Opportunities`);
  }
  //  getAllOpportunities(): Observable<Opportunity[]> {
  //   return this.http.get(`${this.baseUrl}/api/HomePage/Opportunities`).pipe(
  //     map((opps: any) => {
  //       return (opps as any[]).map(opp => ({
  //         ...opp,
  //         image: this.baseUrl + '/' + opp.image.replace(/\\/g, '/')
  //       }));
  //     })
  //   );
  // }
  getOpportunityDetails(id: string): Observable<OpportuntyDetails> {
    return this.http.get<OpportuntyDetails>(`${this.baseUrl}/api/VolunteerOpportunity/${id}/Detailes`);
  }
  searchByLocation(location:string):Observable<Opportunity[]>{
        return this.http.get<Opportunity[]>(`${this.baseUrl}/api/VolunteerOpportunity/bylocation?location=${location}`);
  }

}
