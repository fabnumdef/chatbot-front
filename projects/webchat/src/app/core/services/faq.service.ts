import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Intent } from '@model/intent.model';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private _url: string;
  private _categories$ = new BehaviorSubject<string[]>(null);
  protected _loading$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this._url = `https://dev.chatbot.fabnum.fr/api/public`;
  }

  loadCategories(): Observable<string[]> {
    this._loading$.next(true);
    return this._http.get<string[]>(`${this._url}/categories`).pipe(
      tap(categories => {
        this._categories$.next(categories);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  loadCategory(category: string): Observable<Intent[]> {
    this._loading$.next(true);
    return this._http.get<Intent[]>(`${this._url}/category/${category}`).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  get categories() {
    return this._categories$.getValue();
  }
}
