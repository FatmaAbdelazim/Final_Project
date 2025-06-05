import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageTherapistService {

  private baseUrl = 'http://localhost:61492/api/Auth/register/therapist';

  constructor(private http: HttpClient) { }

  registerTherapist(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData);
  }
}
