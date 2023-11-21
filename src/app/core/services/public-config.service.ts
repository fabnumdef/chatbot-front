import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '@model/config.model';
import { finalize, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicConfigService {

  private _url: string;

  protected _loading$ = new BehaviorSubject<boolean>(false);

  public config$ = new BehaviorSubject<Config>(null);

  constructor(private _http: HttpClient) {
    this._url = `${environment.api_endpoint}/public`;
    this.getConfig().subscribe(() => {
    }, () => {
    });
  }

  getConfig(): Observable<Config> {
    this._loading$.next(true);
    return this._http.get<Config>(this._url).pipe(
      tap(config => {
        this.config$.next(config);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  get config() {
    return this.config$.value;
  }
}
