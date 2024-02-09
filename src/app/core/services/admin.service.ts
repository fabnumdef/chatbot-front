import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private _url = `${environment.api_endpoint}/admin`;

  private _loading$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  public resetData(): Observable<any> {
    this._loading$.next(true);
    return this._http.post(`${this._url}/reset-data`, null).pipe(
      finalize(() => {
        this._loading$.next(false);
      }),
    );
  }

  /** **********************
   ******** GETTER ********
   *********************** */

  get loading$(): BehaviorSubject<boolean> {
    return this._loading$;
  }
}
