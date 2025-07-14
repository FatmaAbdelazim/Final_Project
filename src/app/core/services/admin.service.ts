import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Volunteer } from '../../models/volunteer-certificate';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  manageVolunteers(): Observable<Volunteer[]>{
    return this.http.get<Volunteer[]>(`${environment.baseUrl}`)
  }
}
