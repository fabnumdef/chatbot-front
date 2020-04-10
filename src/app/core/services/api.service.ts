import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { finalize, tap } from 'rxjs/operators';

export abstract class ApiService<T extends any> {

  protected _entities$ = new BehaviorSubject<T[]>([]);
  protected _loading$ = new BehaviorSubject<boolean>(false);
  protected _processing$ = new BehaviorSubject<boolean>(false);

  public currentSearch = '';

  constructor(private _h: HttpClient, protected _url: string) {
    this._url = `${environment.api_endpoint}${this._url}`;
  }

  /************************
   ********* CRUD *********
   ************************/

  public save(item: T) {
    if (!item.id) {
      return this.create(item);
    }
    return this.update(item);
  }

  public update(item: T): Observable<T> {
    this._processing$.next(true);
    return this._h.put<T>(`${this._url}/${item.id}`, item).pipe(
      tap(entity => {
        this.updateEntityArray(entity);
      }),
      finalize(() => {
        this._processing$.next(false);
      }));
  }

  public create(item: T): Observable<T> {
    this._processing$.next(true);
    return this._h.post<T>(this._url, item).pipe(
      tap(entity => {
        const auxArray = [...this._entities$.value, entity];
        this._entities$.next(auxArray);
      }),
      finalize(() => {
        this._processing$.next(false);
      }));
  }

  public delete(item: T): Observable<T> {
    this._processing$.next(true);
    return this._h.delete<T>(`${this._url}/${item.id}`).pipe(
      tap(() => {
        this.deleteToEntityArray(item);
      }),
      finalize(() => {
        this._processing$.next(false);
      }));
  }

  // ====== Update Observable ======
  protected updateEntityArray(newItem) {
    const auxArray = this._entities$.value.map(entity => {
      if (entity.id === newItem.id) {
        return newItem;
      }
      return entity;
    });
    this._entities$.next(auxArray);
  }

  private deleteToEntityArray(deletedItem) {
    const auxArray = this._entities$.value.filter(m => m.id !== deletedItem.id);
    this._entities$.next(auxArray);
  }

  public load(): Observable<T[]> {
    this._loading$.next(true);
    return this._h.get<T[]>(this._url, this._setOptions()).pipe(
      tap(data => {
        this._entities$.next(data);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  protected _setOptions() {
    const params = new HttpParams()
      .set('query', this.currentSearch ? this.currentSearch : '');

    return {params};
  }

  /************************
   ******** GETTER ********
   ************************/

  get loading$(): BehaviorSubject<boolean> {
    return this._loading$;
  }

  get loading(): boolean {
    return this._loading$.value;
  }

  get processing$(): BehaviorSubject<boolean> {
    return this._processing$;
  }

  get processing(): boolean {
    return this._processing$.value;
  }

  get entities$(): BehaviorSubject<T[]> {
    return this._entities$;
  }

  get entities(): T[] {
    return this._entities$.value;
  }

  get entitiesLenght(): number {
    return this._entities$.value.length;
  }

}
