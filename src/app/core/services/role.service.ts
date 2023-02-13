import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  userRole = [];
  constructor(private authService: NbAuthService) {
    this.authService
      .onTokenChange()
      .subscribe((token: NbAuthJWTToken | any) => {
        if (token.isValid()) {
          this.userRole = token.getPayload().scopes[0]; // here we receive a payload from the token and assigns it to our `user` variable
        }
      });
  }
}
