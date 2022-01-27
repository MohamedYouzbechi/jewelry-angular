import { environment } from './../../environments/environment';
import { AuthAdminService } from './../services/auth-admin.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authAdmin:AuthAdminService,
    private cookieService:CookieService){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return new Promise((resolve, reject)=>{
        if(this.authAdmin.LoggedIn() == true){
          resolve(true)
        }else{
          window.location.href = environment.AUTHENTICATION_URL;
          this.cookieService.delete('token')
          reject(false)
        }
      })
  }

}
