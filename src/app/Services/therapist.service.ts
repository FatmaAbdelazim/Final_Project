import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TherapistResponse } from '../Models/therapist-response';

@Injectable({
  providedIn: 'root'
})
export class TherapistService {

  
  private baseUrl = 'http://localhost:61492/api/therapists';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TherapistResponse> {
    return this.http.get<TherapistResponse>(this.baseUrl);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getBySpecialization(specialization: string): Observable<TherapistResponse> {
    const url = `${this.baseUrl}/${specialization}/Filteration`;
    return this.http.get<TherapistResponse>(url);
  }
}
