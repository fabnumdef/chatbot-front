import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  token$: Observable<string>;
  currentToken: string;

  constructor(private _authService: AuthService) {
    this.token$ = this._authService.token$;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token$.subscribe(res => this.currentToken = res);
    if (this.currentToken === null) {
      return next.handle(request);
    }

    let newHeaders = request.headers.set('Authorization',
      'Bearer ' + this.currentToken);
    newHeaders = newHeaders.set('Cache-Control', 'no-cache');
    newHeaders = newHeaders.set('Pragma', 'no-cache');
    newHeaders = newHeaders.set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
    request = request.clone({
      headers: newHeaders
    });
    return next.handle(request);
  }
}
