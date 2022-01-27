import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  logout(){
    this.cookieService.delete('token');
    window.location.href = environment.AUTHENTICATION_URL;
  }

}
