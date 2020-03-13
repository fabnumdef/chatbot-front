import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _tokenName = 'user-token';

  private _token$ = new BehaviorSubject<string>(null);
  private _authenticating$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  get authenticating$(): Observable<boolean> {
    return this._authenticating$;
  }

  public get token$() {
    return this._token$;
  }

  public get token() {
    return this._token$.value;
  }

  public authenticate(login: Login) {
    this._authenticating$.next(true);

    const url = `${environment.api_endpoint}${environment.login_endpoint}`;
    return this._http.post<LoginResponse>(`${url}/login`, login).pipe(
      tap(res => {
        this._token$.next(res.chatbot_factory_token);
        sessionStorage.setItem(this._tokenName, res.chatbot_factory_token);
        // this._storage.storeAuthResponse(res);
      }),
      finalize(() => this._authenticating$.next(false))
    );
  }

  public logout(): void {
    sessionStorage.clear();
    this._token$.next(null);
  }
}
