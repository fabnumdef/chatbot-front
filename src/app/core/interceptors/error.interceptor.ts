import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _router: Router,
              private _authService: AuthService,
              private _toastr: ToastrService,
              @Inject(Window) private _window: Window) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludePaths = [`${this._window.location.origin}/media/`];

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      const excluded = excludePaths.find(e => request.url?.includes(e));
      if (!excluded) {
        this._handleErrorResponse(err);
      }
      return throwError(err);
    }));
  }

  private _handleErrorResponse(err: HttpErrorResponse) {
    this._showBackendMessage(err);
    if (err.status === 401) {
      // Clear session information as they are outdated
      this._authService.logout();
    }
  }

  private _showBackendMessage(err: HttpErrorResponse): void {
    const {error} = err;
    const messageToShow = (error && error.message) ? this._generateErrorMessage(error.message) : 'Une erreur est survenue';
    this._toastr.error(messageToShow);
  }

  private _generateErrorMessage(errorMessage: any): string {
    if (typeof errorMessage === 'string') {
      return <string> errorMessage;
    }
    if (errorMessage instanceof Array) {
      let messageToReturn = '';
      errorMessage.forEach(e => {
        const keys = Object.keys(e.constraints);
        keys.forEach(k => {
          messageToReturn += e.constraints[k];
          messageToReturn += '.';
        });
      });
      return messageToReturn;
    }
    return 'Une erreur est survenue';
  }
}
