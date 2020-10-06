import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inbox } from '@model/inbox.model';
import { ApiPaginationService } from '@core/services/api-pagination.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { User } from '@model/user.model';

@Injectable({
  providedIn: 'root'
})
export class InboxService extends ApiPaginationService<Inbox> {

  constructor(private _http: HttpClient, private _r: Router) {
    super(_http, '/inbox', _r);
  }

  public validate(inbox: Inbox): Observable<Inbox> {
    this._processing$.next(true);
    return this._http.post<Inbox>(`${this._url}/${inbox.id}/validate`, {}).pipe(
      tap(() => {
        this.deleteToEntityArray(inbox);
      }),
      finalize(() => {
        this._processing$.next(false);
      }));
  }

  public assign(inbox: Inbox, user?: User): Observable<Inbox> {
    this._processing$.next(true);
    return this._http.post<Inbox>(`${this._url}/${inbox.id}/assign/${user ? user.email : ''}`, {}).pipe(
      tap(() => {
        inbox.user = user;
        this.updateEntityArray(inbox);
      }),
      finalize(() => {
        this._processing$.next(false);
      }));
  }

  export(): Observable<any> {
    this._loading$.next(true);
    const params = new HttpParams()
      .set('query', this.currentSearch ? this.currentSearch : '');
    // @ts-ignore
    return this._http.post<any>(`${this._url}/export`, this.currentFilters, {params, responseType: 'blob'}).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }
}
