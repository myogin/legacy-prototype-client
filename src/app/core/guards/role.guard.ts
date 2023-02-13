import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { RoleService } from '../services/role.service';
class Permissions {
  canActivate(): boolean {
    return true;
  }
}
@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: NbAuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.authService
      .onTokenChange()
      .subscribe((token: NbAuthJWTToken | any) => {
        if (token.isValid()) {
          const expectedRole = route.data.permission;

          const tokenPayload = token.getPayload().scopes;
          // here we receive a payload from the token and assigns it to our `user` variable
          if (!expectedRole.includes(tokenPayload[0])) {
            this.router.navigate(['dashboard']);
            return false;
          }
        }

        return true;
      });
    return true;
  }
}
