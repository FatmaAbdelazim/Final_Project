import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:61492/api/Auth';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
   }

  register(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }

 login(dto: any): Observable<any> {
  return this.http.post<{ token: string }>(`${this.apiUrl}/login`, dto).pipe(
    tap((res) => {
      localStorage.setItem('token', res.token); // حفظ التوكن

      // تحليل التوكن عشان نجيب الـ role
      const tokenPayload = JSON.parse(atob(res.token.split('.')[1]));
      const role = tokenPayload['role'] || tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (role) {
        localStorage.setItem('userRole', role);
      }
    })
  );
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }
   isAdmin(): boolean {
  return localStorage.getItem('userRole') === 'Admin';
}

isUser(): boolean {
  return localStorage.getItem('userRole') === 'User';
}

}
