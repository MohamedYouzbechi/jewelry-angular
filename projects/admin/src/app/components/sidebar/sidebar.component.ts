import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  username:string=''

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (token) {
        let parseToken = JSON.parse(token);
        this.username = parseToken.username;
    }
  }

}
