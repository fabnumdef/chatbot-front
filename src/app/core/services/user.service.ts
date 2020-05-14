import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';
import { User } from '@model/user.model';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User> {
  constructor(private _httpClient: HttpClient) {
    super(_httpClient, '/user', 'email');
    this.load().subscribe();
  }

  public load(): Observable<User[]> {
    this._loading$.next(true);
    return this._httpClient.get<User[]>(this._url).pipe(
      tap(result => {
        this._entities$.next(result);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }
}
