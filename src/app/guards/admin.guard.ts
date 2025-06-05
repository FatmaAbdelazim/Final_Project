// import { Injectable } from "@angular/core";
// import { CanActivate, Router } from "@angular/router";
// import { AuthService } from "../Services/auth.service";

// // admin.guard.ts
// @Injectable({ providedIn: 'root' })
// export class AdminGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isAdmin()) {
//       return true;
//     }
//     this.router.navigate(['/auth/login']);
//     return false;
//   }
// }
