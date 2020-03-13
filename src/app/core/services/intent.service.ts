import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntentService {

  protected _url: string;

  protected _entities$ = new BehaviorSubject<any[]>([]);
  protected _loading$ = new BehaviorSubject<boolean>(false);

  constructor(private _httpClient: HttpClient) {
    this._url = `${environment.api_endpoint}/intent`;
  }

  // ==== CRUD ======
  public load(): Observable<any[]> {
    this._loading$.next(true);
    return this._httpClient.get<any[]>(this._url).pipe(
      tap(data => {
        this._entities$.next(data);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
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
