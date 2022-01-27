import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  helper = new JwtHelperService();

  constructor(private cookieService: CookieService) { }

  LoggedIn(){

    const token = this.cookieService.get('token');
    if (token) {
      let parseToken = JSON.parse(token);
      if(parseToken.role !== "Admin"){
        return false;
      }else{
        // let decodeToken = this.helper.decodeToken(parseToken.token);
        // console.log('from is expired',this.helper.isTokenExpired(parseToken.token))
        if(this.helper.isTokenExpired(parseToken.token)){
          return false;
        }
        return true;
      }
    } else {
      return false;
    }

  }
}
