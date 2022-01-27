import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  token = this.cookieService.get('token');
  parseToken = JSON.parse(this.token);

  headersAdmin = new HttpHeaders()
    .set('authorization', this.parseToken.token)
    .set('role', this.parseToken.role);

  // headerall = new HttpHeaders().set('authorization', this.token);

  // params = new HttpParams()
  //             .set('secret', environment.secret)
  //             .set('client', environment.client);

  // return this.http.get(environment.urlBackend+'users/', {headers:this.headerall, params:this.params});


  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('original request', req)
    // const myToken = 'ndwf5f8dgb2DFSDG55vsgrdSF';
    const modifiedRequest = req.clone({
      headers : this.headersAdmin,
      // headers : req.headers.set('authorization', myToken)
      // url : req.url.replace('http', 'https'),
    })
    console.log('in interceptor modif req', modifiedRequest, next);

    return next.handle(modifiedRequest);
  }
}
