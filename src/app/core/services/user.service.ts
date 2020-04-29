import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';
import { User } from '@model/user.model';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User> {
  constructor(private _httpClient: HttpClient) {
    super(_httpClient, '/user', 'email');
  }

  public load(): Observable<User[]> {
    this._loading$.next(true);
    return this._httpClient.get<User[]>(this._url).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }
}
