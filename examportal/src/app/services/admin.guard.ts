import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  let isLoggedIn = inject(LoginService).isLoggedIn();
  let service = inject(LoginService);

  let router = inject(Router);


  if (isLoggedIn && service.getUserRole() == 'ADMIN') {
    return true;
  }
  else {

    service.logout();

    router.navigate(['login']);
    return false;
  }
};