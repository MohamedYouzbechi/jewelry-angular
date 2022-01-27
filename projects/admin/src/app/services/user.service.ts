import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // token = this.cookieService.get('token');
  // parseToken = JSON.parse(this.token);

  // headerAdmin = new HttpHeaders().set('authorization', this.parseToken.token).set('role', this.parseToken.role);

  constructor(private httpClient:HttpClient, private cookieService: CookieService) { }

  getAllUsers(): Observable<{users: any[]}> {
    return this.httpClient.get<{users: any[]}>('http://localhost:3000/users');
  }

  deleteUser(userId): Observable<any> {
    return this.httpClient
      .delete<{ message?: string; status: string }>(
        `http://localhost:3000/user/${userId}`
      )
      .pipe(
        switchMap(async (data) => {
          const users = await this.getAllUsers().toPromise();
          return {
            ...data,
            ...users,
          };
        })
      );
  }

}
