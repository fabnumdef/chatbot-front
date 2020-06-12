import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StatsService  {

  private _url = `${environment.api_endpoint}/stats`;
  protected _loading$ = new BehaviorSubject<boolean>(false);
  public _currentFilters$ = new BehaviorSubject<any>(null);
  public currentFilters: any;

  constructor(private _http: HttpClient) {
    moment.locale('fr');
  }

  getGraphData(filter): Observable<Object> {
    this._loading$.next(true);
    // console.log(this._currentFilters$);

    /*this._http.post(this._url + '/test', filter, {responseType: 'text'}).subscribe(
      (value) => {
        console.log('test value');
        console.log(value);
      }
    );*/
    return this._http.post(this._url + '/linedata', this.currentFilters);
  }

  setCurrentFilters(startDate, endDate) {
    if (!startDate) {
      startDate = moment().subtract(1, 'month').format('YYYY-MM-DD').toString();
    }
    if (!endDate) {
      endDate = moment().format('YYYY-MM-DD').toString();
    }
    this.currentFilters = {
      startDate: startDate,
      endDate: endDate
    };

  }
  getCurrentFilters() {
    return this.currentFilters;
  }

  resetFilters() {
    this.currentFilters = null;
  }

}
