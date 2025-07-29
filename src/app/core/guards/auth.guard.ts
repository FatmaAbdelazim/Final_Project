import { AuthVoluntaryOrganizationService } from './../services/auth-voluntary-organization.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router ,
     private _AuthVoluntaryOrganizationService : AuthVoluntaryOrganizationService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    this._AuthVoluntaryOrganizationService.decodeUserData();
    const actualRole = this._AuthVoluntaryOrganizationService.userData.role;

    if (actualRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/']); 
      return false;
    }
  }
}
