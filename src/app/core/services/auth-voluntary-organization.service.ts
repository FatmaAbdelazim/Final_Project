import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthVoluntaryOrganizationService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://tatawwa3.runasp.net';
  register(organization: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Auth/register-organization`, organization);
  }
    login(organization: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Auth/login`, organization);
  }
}
