import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GoogleLoginProvider, AuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER_URL = environment.SERVER_URL;
  auth = false;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;

  constructor(private httpClient:HttpClient,
    private authService:AuthService,
    private router:Router) { }

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
            this.authState$.next(this.auth);
            this.userData$.next(data);

            // This code will check and redirect the user to the admin route, assuming it to be http://localhost:4200/admin
            // Change the url to match the route in your code
            // console.log(this.userRole);
            if (this.userRole === 777) {
              this.router.navigateByUrl('admin').then();
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
  role: number;
}
