import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { TherapistResponse } from '../Models/therapist-response';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

 private baseUrl = 'http://localhost:61492/api';

  constructor(private http: HttpClient) {}

   getAll(): Observable<TherapistResponse> {
     return this.http.get<TherapistResponse>(this.baseUrl);
   }

  getSessions(): Observable<TherapistResponse> {
    return this.http.get<TherapistResponse>(`${this.baseUrl}/Admin/reports/sessions`);
  }
  
}
