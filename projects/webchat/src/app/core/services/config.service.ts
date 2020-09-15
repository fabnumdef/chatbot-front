import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _url: string;
  protected _loading$ = new BehaviorSubject<boolean>(false);
  public config$ = new BehaviorSubject<Config>(null);

  constructor(private _http: HttpClient) {
    this._url = `/api/public`;
    this.getConfig().subscribe(() => {
    }, () => {
    });
  }

  getConfig(): Observable<Config> {
    this._loading$.next(true);
    return this._http.get<Config>(`https://dev.chatbot.fabnum.fr` + this._url).pipe(
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
