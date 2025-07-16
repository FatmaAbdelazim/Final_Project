import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthVolunteerService {

  private readonly _HttpClient = inject(HttpClient);

  register(data: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/Auth/register-volunteer`, data, {
      responseType: 'text'
    })
  }
  deleteVolunteer(volId: string): Observable<any> {
    return this._HttpClient.delete<any>(`${environment.baseUrl}/api/VolunteersProfile/deleteVolunter/${volId}`, { responseType: 'text' as 'json' });
  }
}
