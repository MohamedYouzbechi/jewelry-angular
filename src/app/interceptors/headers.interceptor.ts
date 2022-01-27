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


  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('original request', req)

    let token = this.cookieService.get('token');
    if (token) {
      let parseToken = JSON.parse(token);

      const headersAll = new HttpHeaders()
        .set('authorization', parseToken.token)
        .set('role', parseToken.role);

      const modifiedRequest = req.clone({
        headers : headersAll,
      })
      console.log('in interceptor modif req', modifiedRequest, next);
      return next.handle(modifiedRequest);
    }else{
      return next.handle(req);
    }

  }
}
