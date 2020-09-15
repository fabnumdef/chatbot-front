import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private _url;

  constructor(private _http: HttpClient) { }

  sendFeedback(feedback: Feedback): Observable<any> {
    return this._http.post(`${this._url}/api/public/feedback`, feedback);
  }

  set url(url) {
    this._url = url;
  }
}
