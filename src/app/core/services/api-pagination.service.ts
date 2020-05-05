import { ApiService } from '@core/services/api.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { PaginationHelper } from '@model/pagination-helper.model';
import { PaginatedResult } from '@model/paginated-result.model';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export class ApiPaginationService<T extends any> extends ApiService<T> {

  protected _entities$ = new BehaviorSubject<T[]>([]);
  protected _loading$ = new BehaviorSubject<boolean>(false);
  protected _processing$ = new BehaviorSubject<boolean>(false);
  protected _loaded$ = new BehaviorSubject<boolean>(false);
  protected _lastPage$ = new BehaviorSubject<boolean>(false);
  protected _pagination: PaginationHelper;

  public currentSearch = '';
  public currentFilters: any;

  protected constructor(private _httpClient: HttpClient,
                        protected _u: string,
                        private _router: Router,
                        public entitiesByPage: number = 20) {
    super(_httpClient, _u);
    this._pagination = new PaginationHelper(entitiesByPage);
  }

  /************************
   ****** PAGINATION ******
   ************************/

  public load(page: number = 1): Observable<PaginatedResult<T>> {
    this._loaded$.next(true);
    this._pagination.resetPage(page);
    return this.getEntities(false);
  }

  public loadAll(): Observable<T[]> {
    this._loading$.next(true);
    return this._httpClient.get<T[]>(this._url).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  public getEntities(needMoreData: boolean): Observable<PaginatedResult<T>> {
    this._loading$.next(true);
    return this._httpClient.post<PaginatedResult<T>>(
      `${this._url}/search`,
      this.currentFilters,
      this.setOptions()
    ).pipe(
      tap(result => {
        this._pagination.onLoaded(result);
        this._lastPage$.next(this._pagination.last);

        if (needMoreData) {
          this._entities$.next([...this._entities$.value, ...result.items]);
        } else {
          this._entities$.next(result.items);
        }
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  // public getMoreEntities(): Observable<PaginatedResult<T>> {
  //   if (!this.loading && !this._lastPage$.value) {
  //     return this.getEntities(true);
  //   } else {
  //     return EMPTY;
  //   }
  // }

  public sortData(): Observable<PaginatedResult<T>> {
    this._pagination.resetPage();
    return this.getEntities(false);
  }

  // Set HttpParams by server call
  public setOptions() {
    const params = new HttpParams()
      .set('page', `${this._pagination.currentPage}`)
      .set('limit', `${this._pagination.size}`)
      .set('query', this.currentSearch ? this.currentSearch : '');

    // if (this.currentSort !== undefined && this.currentSort.active && this.currentSort.direction !== '') {
    //   params = params.set('sort', `${this.currentSort.active},${this.currentSort.direction}`);
    // }

    return {params};
  }

  public updateFilters(filters: any) {
    // this.currentFilters = [].concat(FilterHelper.updateFields(this.currentFilters, filters));
  }

  /************************
   ********* CRUD *********
   ************************/

  public loadOne(itemId: string | number, redirectUrl ?: string): Observable<T> {
    return this._httpClient.get<T>(`${this._url}/${itemId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!redirectUrl) {
          return throwError(err);
        }
        if (err.status === 404) {
          this._router.navigate([redirectUrl]);
        }
        return throwError(err);
      }));
  }

  /************************
   ******** GETTER ********
   ************************/

  get pagination() {
    return this._pagination;
  }

  resetFilters() {
    this.currentSearch = '';
    this.currentFilters = null;
  }
}
