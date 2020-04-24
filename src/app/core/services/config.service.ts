import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '@model/config.model';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _url: string;
  protected _loading$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this._url = `${environment.api_endpoint}/config`;
  }

  getConfig(): Observable<Config> {
    this._loading$.next(true);
    return this._http.get<Config>(this._url).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }
}
