import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem('userToken') !== null){
    let token = localStorage.getItem('userToken');
    req = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  }
  return next(req);
};
