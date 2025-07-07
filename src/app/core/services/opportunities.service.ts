import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Opportunity, UpdateOpp } from '../../models/opportunty';
import { OpportuntyDetails } from '../../models/opportunty-details';
import { environment } from '../environments/environment';
import { OppManagment } from '../../models/opp-managment';
import { Organization } from '../../models/organization';
import { Team } from '../../models/team';

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
  getOpportunityDetails(id: string | null): Observable<OpportuntyDetails> {
    return this.http.get<OpportuntyDetails>(`${this.baseUrl}/api/VolunteerOpportunity/${id}/Detailes`);
  }
  searchByLocation(location:string):Observable<Opportunity[]>{
        return this.http.get<Opportunity[]>(`${this.baseUrl}/api/VolunteerOpportunity/bylocation?location=${location}`);
  }
  getAllLocations():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/VolunteerOpportunity/Allllocations`);
  }
  getAllCategory():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/Category/names`);
  }
   searchByName(name:string):Observable<Opportunity[]>{
        return this.http.get<Opportunity[]>(`${this.baseUrl}/api/VolunteerOpportunity/SearchByTitle?title=${name}`);
  }
   searchByCategory(category:string):Observable<Opportunity[]>{
        return this.http.get<Opportunity[]>(`${this.baseUrl}/api/VolunteerOpportunity/byCategory?CatName=${category}`);
  }
  joinOpp(data:any):Observable<any>{
      return this.http.post(`${environment.baseUrl}/api/ApplayApplication/apply`, data)
  }
  oppManagment():Observable<OppManagment[]>{
    return this.http.get<OppManagment[]>(`${this.baseUrl}/api/VolunteerOpportunity/ forsa-management`);
  }
  deleteOpp(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/api/VolunteerOpportunity/${id}/remove`);
  }
  updateOpp(id:string,data:FormData):Observable<any>{
    return this.http.put(`${environment.baseUrl}/api/VolunteerOpportunity/update/${id}`, data)
  }
  getDataToUpdate(id:string | null):Observable<UpdateOpp>{
    return this.http.get<UpdateOpp>(`${environment.baseUrl}/api/VolunteerOpportunity/updated-databy-id${id}`)

  }
  getAllOrgs():Observable<Organization[]>{
    return this.http.get<Organization[]>(`${environment.baseUrl}/api/OrganizationProfile/all`)
  }
  getAllTeams():Observable<Team[]>{
    return this.http.get<Team[]>(`${environment.baseUrl}/api/Team/GetAllVolunteerTeams`)
  }
}
