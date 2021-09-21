import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';
import { User } from '@model/user.model';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

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

  public delete(item: User): Observable<User> {
    this._processing$.next(true);
    return this._httpClient.delete<User>(`${this._url}/${item[this._idAttribute]}`).pipe(
      tap(() => {
        item.disabled = true;
        this.updateEntityArray(item);
      }),
      finalize(() => {
        this._processing$.next(false);
      }));
  }

  get cleanEntities$(): Observable<User[]> {
    return this._entities$.pipe(
      map(users => users.filter(u => !u.disabled))
    );
  }
}
