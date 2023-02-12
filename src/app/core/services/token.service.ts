import { Injectable } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  userToken = {};
  constructor(private authService: NbAuthService) {
    this.authService
      .onTokenChange()
      .subscribe((token: NbAuthJWTToken | any) => {
        if (token.isValid()) {
          this.userToken = token.token; // here we receive a payload from the token and assigns it to our `user` variable
        }
      });
  }
}
