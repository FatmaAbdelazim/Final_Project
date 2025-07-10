import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

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
  sendEmail(email: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/Auth/forget-password`, email, { responseType: 'text' })
  }
  verifyCode(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/Auth/verify-otp`, data, { responseType: 'text' })
  }
  resetPass(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/Auth/reset-password`, data, { responseType: 'text' })
  }
}
