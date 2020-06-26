import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefDataService {

  private _url = `${environment.api_endpoint}/ref-data`;
  private _loading$ = new BehaviorSubject<boolean>(false);

  categories$ = new BehaviorSubject<string[]>([]);

  constructor(private _http: HttpClient) {
    this.loadCategories().then();
  }

  loadCategories(): Promise<string[]> {
    this._loading$.next(true);
    return this._http.get<string[]>(`${this._url}/categories`, {}).pipe(
      tap(data => {
        this.categories$.next(data);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    ).toPromise();
  }

  reloadCategories(category: string) {
    if (!category || this.categories$.getValue().includes(category)) {
      return;
    }
    this.loadCategories().then();
  }
}
