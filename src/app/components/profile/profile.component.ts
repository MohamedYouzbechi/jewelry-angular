import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { map } from 'rxjs/operators';
import { UserService, ResponseModel } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.userService.userData$
      .pipe(
        map((user: SocialUser | ResponseModel) => {
          if (user instanceof SocialUser || user?.type === 'social') {
            return {
              ...user,
              email: 'test@test.com',
            };
          } else {
            return user;
          }
        })
      )
      .subscribe((data: ResponseModel | SocialUser) => {
        this.myUser = data;
      });

      // this.userService.authState$.subscribe(authState => {
      //   if (!authState) {
      //     this.router.navigateByUrl('/login');
      //   }
      // });
  }

  logout() {
    this.userService.logout();
  }

}
