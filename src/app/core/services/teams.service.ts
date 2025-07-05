import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/team';
import { TeamDetails } from '../../models/team-details';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://tatawwa3.runasp.net';
  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/api/Team/GetAllVolunteerTeams`);
  }

  getTeamDetails(id:string | null):Observable<TeamDetails>{
    return this.http.get<TeamDetails>(`${environment.baseUrl}/api/Team/${id}/Team-Detailes`);
  }

  getAllLocations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Team/cities`);
  }
  getAllCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Team/categories`);
  }
  searchByLocation(location: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/api/Team/by-city?city=${location}`);
  }
  searchByName(name: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/api/Team/by-name?name=${name}`);
  }
  searchByCategory(category: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/api/Team/by-category?category=${category}`);
  }

  joinTeam(data: any): Observable<any> {
  return this.http.post(`${environment.baseUrl}/api/Team/request`, data, {
    responseType: 'text'  
  });
}

}
