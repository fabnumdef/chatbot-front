import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { finalize, tap } from 'rxjs/operators';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  protected _url: string;

  protected _entities$ = new BehaviorSubject<Media[]>([]);
  protected _loading$ = new BehaviorSubject<boolean>(false);

  constructor(private _httpClient: HttpClient) {
    this._url = `${environment.api_endpoint}/media`;
  }

  /************************
   ********* CRUD *********
   ************************/

  public load(): Observable<any[]> {
    this._loading$.next(true);
    return this._httpClient.get<Media[]>(this._url).pipe(
      tap(data => {
        this._entities$.next(data);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  public create(file: File): Observable<Media> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = {
      headers: headers,
      reportProgress: true,
    };

    this._loading$.next(true);
    return this._httpClient.post<Media>(this._url, formData, options).pipe(
      tap(entity => {
        const auxArray = [...this._entities$.value, entity];
        this._entities$.next(auxArray);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  public delete(id: string | number): Observable<any[]> {
    this._loading$.next(true);
    return this._httpClient.delete<any>(`${this._url}/${id}`).pipe(
      tap(data => {
        this._deleteToEntityArray(id);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  // ====== Update Observable ======
  private _updateEntityArray(newItem) {
    const auxArray = this._entities$.value.map(entity => {
      if (entity.id === newItem.id) {
        return newItem;
      }
      return entity;
    });
    this._entities$.next(auxArray);
  }

  private _deleteToEntityArray(deletedItemId) {
    const auxArray = this._entities$.value.filter(m => m.id !== deletedItemId);
    this._entities$.next(auxArray);
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

  get entities$(): BehaviorSubject<any[]> {
    return this._entities$;
  }

  get entities(): any[] {
    return this._entities$.value;
  }

  get entitiesLenght(): number {
    return this._entities$.value.length;
  }
}
