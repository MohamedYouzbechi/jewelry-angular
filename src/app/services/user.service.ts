import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GoogleLoginProvider, AuthService, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER_URL = environment.SERVER_URL;
  auth = false;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: string;
  helper = new JwtHelperService();

  constructor(
    private httpClient:HttpClient,
    private authService:AuthService,
    private cookieService : CookieService,
    private router:Router) {

      authService.authState.subscribe((user: SocialUser) => {
        if (user != null) {
          this.httpClient.get(`${this.SERVER_URL}/users/validate/${user.email}`).subscribe((res: { status: boolean, user: object }) => {
            //  No user exists in database with Social Login
            if (!res.status) {
              // Send data to backend to register the user in database so that the user can place orders against his user id
                this.registerUser({
                  email: user.email,
                  fname: user.firstName,
                  lname: user.lastName,
                  password: '123123'
                }, user.photoUrl, 'social').subscribe(response => {
                    if (response.message === 'Registration successful') {
                      this.auth = true;
                      this.userRole = "Customer";
                      this.authState$.next(this.auth);
                      this.userData$.next(user);
                    }
                });
            } else {
                this.auth = true;
                // @ts-ignore
                this.userRole = res.user.role;
                this.authState$.next(this.auth);
                this.userData$.next(res.user);

                // This code will check and redirect the user to the admin route, assuming it to be http://localhost:4200/admin
                // Change the url to match the route in your code
                // console.log(this.userRole);
                if (this.userRole === "Admin") {
                  // this.router.navigateByUrl('admin').then();
                }
            }
          });
        }
      });

      this.validateUserCookie();
  }

  validateUserCookie(){
    const token = this.cookieService.get('token');
        if (token) {
          let parseToken = JSON.parse(token);

            if(!this.helper.isTokenExpired(parseToken.token)){
              let decodeToken = this.helper.decodeToken(parseToken.token);
              this.auth = true;
              this.httpClient.get(`${this.SERVER_URL}/users/validate/${decodeToken.email}`).subscribe((res: { status: boolean, user: any }) => {
                  if (res.status) {
                    this.userRole = res.user.role;
                    this.authState$.next(true);
                    this.userData$.next(res.user);
                  }
              })
            }
        }
  }

  registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<{ message: string }> {
    const {fname, lname, email, password} = formData;
    // console.log(formData);
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/auth/register`, {
      email,
      lname,
      fname,
      typeOfUser,
      password,
      photoUrl: photoUrl || null
    });
  }

  logout() {
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
    this.cookieService.delete('token');
    this.router.navigate(['/'])
  }

  //  Login User with Email and Password
  loginUser(email: string, password: string) {
    this.httpClient.post<ResponseModel>(`${this.SERVER_URL}/auth/login`, {email, password})
        .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
        .subscribe((data: ResponseModel) => {
          if (typeof (data) === 'string') {
            this.loginMessage$.next(data);
          } else {
            this.auth = data.auth;
            this.userRole = data.role;
            this.cookieService.set('token', JSON.stringify(data));

            // This code will check and redirect the user to the admin route, assuming it to be http://localhost:4200/admin
            // Change the url to match the route in your code
            // console.log(this.userRole);
            if (this.userRole == "Admin") {
              window.location.href = environment.ADMIN_URL;
              // this.authState$.next(this.auth);
              // this.userData$.next(data);
            }else if (this.userRole == "Customer"){
              this.authState$.next(this.auth);
              this.userData$.next(data);
            }
          }
        });
  }

  //  Google Authentication
  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}


export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: string;
}
