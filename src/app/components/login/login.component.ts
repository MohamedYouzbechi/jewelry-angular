import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginMessage: string;
  userRole: number;

  constructor(
    private userService:UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState) {
        // console.log(this.activatedRoute.snapshot.queryParams.returnUrl)
        this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams.returnUrl || '/profile');
      } else {
        // this.router.navigateByUrl('/login');
      }
    });
  }

  signInWithGoogle() {
    this.userService.googleLogin();
  }

  login(form: NgForm) {
    const email = this.email;
    const password = this.password;

    if (form.invalid) {
      return;
    }
    form.reset();
    this.userService.loginUser(email, password);

    this.userService.loginMessage$.subscribe(msg => {
      this.loginMessage = msg;
      setTimeout(() => {
        this.loginMessage = '';
      }, 2000);
    });
  }

}
