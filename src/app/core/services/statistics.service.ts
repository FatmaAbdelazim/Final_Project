import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://tatawwa3.runasp.net';
  getCoutOfActiveVolunteers():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/api/HomePage/active-volunteers/count`);
  }
    getCoutOfVolunteersHour():Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/api/HomePage/total-volunteersOpportunites-hours`);
  }
}
