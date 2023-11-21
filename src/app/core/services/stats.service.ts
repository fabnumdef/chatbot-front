import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { InboxStatus } from '@enum/*';
import { environment } from '../../../environments/environment';

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
    return this._http.post(`${this._url  }/line_data`, this.currentFilters);
  }

  getBestQuestionsData(): Observable<Object> {
    return this._http.post(`${this._url  }/best_data`, this.currentFilters);
  }

  getBestCategoriesData(): Observable<Object> {
    return this._http.post(`${this._url  }/best_categories`, this.currentFilters);
  }

  getWorstQuestionsData(): Observable<Object> {
    return this._http.post(`${this._url  }/worst_data`, this.currentFilters);
  }

  getKPIData(): Observable<Object> {
    return this._http.post(`${this._url  }/kpi_data`, this.currentFilters);
  }

  getFaqMostQuestionsData(): Observable<Object> {
    return this._http.post(`${this._url  }/faq_most_questions`, this.currentFilters);
  }

  getFaqMostCategoriesData(): Observable<Object> {
    return this._http.post(`${this._url  }/faq_most_categories`, this.currentFilters);
  }

  getFaqKPIData(): Observable<Object> {
    return this._http.post(`${this._url  }/faq_kpi_data`, this.currentFilters);
  }

  getFeedbackMostQuestionsData(inboxStatus: InboxStatus): Observable<Object> {
    return this._http.post(`${this._url  }/feedback_${inboxStatus}_questions`, this.currentFilters);
  }

  getFeedbackMostCategoriesData(inboxStatus: InboxStatus): Observable<Object> {
    return this._http.post(`${this._url  }/feedback_${inboxStatus}_categories`, this.currentFilters);
  }

  getFeedbackKPIData(): Observable<Object> {
    return this._http.post(`${this._url  }/feedback_kpi_data`, this.currentFilters);
  }

  setCurrentFilters(startDate, endDate) {
    startDate = startDate || null;
    endDate = endDate || null;
    this.currentFilters = {
      startDate,
      endDate
    };
  }

  getCurrentFilters() {
    return this.currentFilters;
  }

  resetFilters() {
    this.currentFilters = null;
  }

}
