import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RasaService {

  private _url = `${environment.api_endpoint}/rasa`;
  loading$ = new BehaviorSubject(false);

  constructor(private _http: HttpClient) { }

  train(): Observable<any> {
    this.loading$.next(true);
    return this._http.post<any>(`${this._url}/train`, {}).pipe(
      finalize(() => {
        this.loading$.next(false);
      })
    );
  }
}
