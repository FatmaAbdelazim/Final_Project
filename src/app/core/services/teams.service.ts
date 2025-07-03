import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

 constructor(private http:HttpClient) { }
  baseUrl = 'https://tatawwa3.runasp.net';
  getAllTeams():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.baseUrl}/api/Team/GetAllVolunteerTeams`);
  }
  }
