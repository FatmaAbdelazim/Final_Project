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

 constructor(private http:HttpClient) { }

  getAllTeams():Observable<Team[]>{
    return this.http.get<Team[]>(`${environment.baseUrl}/api/Team/GetAllVolunteerTeams`);
  }

  getTeamDetails(id:string | null):Observable<TeamDetails>{
    return this.http.get<TeamDetails>(`${environment.baseUrl}/api/Team/${id}/Team-Detailes`);
  }
  }
