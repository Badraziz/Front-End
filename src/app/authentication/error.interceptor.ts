import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        console.log(err.message);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}




//   constructor(private authenticationService: AuthenticationService) { }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(request).pipe(catchError(err => {
//       if (err.status === 401) {
//         // auto logout if 401 response returned from api
//         this.authenticationService.logout();
//         console.log(err.message);
//       }
//       const error = err.error.message || err.statusText;
//       return throwError(error);
//     }));
//   }
// }
