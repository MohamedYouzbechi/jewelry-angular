import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { HeadersInterceptor } from './headers.interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

export const httpInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass : HeadersInterceptor,
    multi : true
  },
  // {
  //   provide : HTTP_INTERCEPTORS,
  //   useClass : ErrorHandlerInterceptor,
  //   multi : true
  // }
]
