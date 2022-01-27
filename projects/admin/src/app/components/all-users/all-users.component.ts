import { Subscription } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  hasError = false;
  success = false;

  userImage: string;
  placeholder: string

  constructor(private userService: UserService) {
    this.placeholder = "http://via.placeholder.com/150"
  }

  ngOnInit(): void {
    this.hasError = false;
    this.subs.push(this.userService.getAllUsers().subscribe((doc:   any) => {
      this.users = doc.users;
    }));

  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  deleteUser(id: number): void {
    this.subs.push(this.userService.deleteUser(id).subscribe(
      res => {

        if (res.status === 'success') {
          this.success = true;
          this.errorMessage = res.message;
        }

        this.users = res.users;

        $('.alert').delay(1500).slideUp(1500);
      }, (err:HttpErrorResponse)=>{
        this.hasError = true;
        this.errorMessage = err.error.message ? err.error.message : err.error
        $('.alert').delay(1500).slideUp(1500);
      }
    ));
  }
}
