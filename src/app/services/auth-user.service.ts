import { UserService } from './user.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  helper = new JwtHelperService();

  constructor(private cookieService: CookieService) { }

  // LoggedIn(){
  //   const token = this.cookieService.get('token');
  //   if (token) {
  //     let parseToken = JSON.parse(token);
  //       if(this.helper.isTokenExpired(parseToken.token)){
  //         return false;
  //       }
  //       return true;
  //   } else {
  //     return false;
  //   }

  // }

}
