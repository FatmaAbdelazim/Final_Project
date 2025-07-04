import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  if(localStorage.getItem('userToken'))
  {
  return true;
  }
  else{
      router.navigateByUrl('/login');
      return false;
  }
};
