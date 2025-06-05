import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  private apiUrl = 'http://localhost:61492/api/Admin/users';

  constructor(private http: HttpClient) {}

  banUser(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/ban`, {});
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getUsersCount(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/count`);
}
 getUsersDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/details`);
  }

  makeAdmin(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/make-admin`, {});
  }

}

