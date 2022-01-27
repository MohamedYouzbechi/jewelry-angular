import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoguardUserGuard implements CanActivate {

  constructor(private userService: UserService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return new Promise((resolve, reject)=>{
        if(!this.userService.auth){
          resolve(true)
        }else{
          this.router.navigate(['/'])
          reject(false)
        }
      })
  }

}
