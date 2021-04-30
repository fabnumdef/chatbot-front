import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Intent } from '@model/intent.model';
import { ApiPaginationService } from '@core/services/api-pagination.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatedResult } from '@model/paginated-result.model';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntentService extends ApiPaginationService<Intent> {

  constructor(private _http: HttpClient,
              private _r: Router) {
    super(_http, '/intent', _r);
    this.loadAll().subscribe();
  }

  checkId(id: string): Observable<boolean> {
    return this._http.get<any>(`${this._url}/check/${id}`);
  }

  public load(page: number = 1): Observable<PaginatedResult<Intent> | Intent[]> {
    this._loaded$.next(true);
    const listView = localStorage.getItem('intent_list_view') ? JSON.parse(localStorage.getItem('intent_list_view')) : true;
    if (listView) {
      this._pagination.resetPage(page);
      return this.getEntities(false);
    } else {
      return this._loadFullTree();
    }
  }

  private _loadFullTree(): Observable<Intent[]> {
    this._loading$.next(true);
    return this._http.post<Intent[]>(
      `${this._url}/tree`,
      this.currentFilters,
      this.setOptions()
    ).pipe(
      tap(result => {
        console.log('LOADED TREE', result);
        this._entities$.next(result);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }
}
