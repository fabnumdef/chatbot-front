import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _router: Router, private _authService: AuthService) {
  }

  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) {
    return this._canActivate(route, state);
  }

  canActivateChild(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) {
    return this._canActivate(route, state);
  }

  /**
   * PRIVATE FUNCTIONS
   */

  private _canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) {
    const isAuthPage = state.url.includes('/auth');
    if (this._authService.isAuthenticated() && isAuthPage) {
      this._router.navigate(['']);
      return false;
    } else if (!this._authService.isAuthenticated() && !isAuthPage) {
      this._router.navigate(['auth']);
      return false;
    }
    return true;
  }
}
