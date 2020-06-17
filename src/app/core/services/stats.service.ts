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
  public currentFilters = {
    startDate: null,
    endDate: null
  };

  constructor(private _http: HttpClient) {
    moment.locale('fr');
  }

  getGraphData(): Observable<Object> {
    return this._http.post(this._url + '/linedata', this.currentFilters);
  }

  getBestQuestionsData(): Observable<Object> {
    return this._http.post(this._url + '/bestdata', this.currentFilters);
  }

  getWorstQuestionsData(): Observable<Object> {
    return this._http.post(this._url + '/worstdata', this.currentFilters);
  }

  getKPIData(): Observable<Object> {
    return this._http.post(this._url + '/kpidata', this.currentFilters);
  }

  setCurrentFilters(startDate, endDate) {
    if (!startDate) {
      //startDate = moment().subtract(1, 'month').format('YYYY-MM-DD').toString();
      startDate = null;
    }
    if (!endDate) {
      //endDate = moment().format('YYYY-MM-DD').toString();
      endDate = null;
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
