import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { UserData } from '../../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthVoluntaryOrganizationService {

  userData!: UserData;
  constructor(private http: HttpClient) { }
  baseUrl = 'https://tatawwa3.runasp.net';
  decodeUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    if (encodedToken) {
      const decodedToken: any = jwtDecode(encodedToken);
      this.userData = {
        id: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      };
      console.log(this.userData);
    }
  }
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
  changPass(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/Auth/change-password`,    data,
    { responseType: 'text' } )
  }
  deleteOrganization(orgId:string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/api/OrganizationProfile/delete/${orgId}`,{ responseType: 'text'  as 'json'});
  }

}


