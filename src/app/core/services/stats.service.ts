import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService  {

  private _url = `${environment.api_endpoint}/stats`;
  protected _loading$ = new BehaviorSubject<boolean>(false);
  private data: any;

  constructor(private _http: HttpClient) {
  }

  getGraphData(): Observable<Object> {
    this._loading$.next(true);
    return this.data = this._http.get(this._url + '/linedata');
  }

}
