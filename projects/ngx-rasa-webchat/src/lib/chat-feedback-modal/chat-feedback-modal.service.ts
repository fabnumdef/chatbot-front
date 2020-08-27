import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from './feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatFeedbackModalService {
  private _modal: any = null;
  private _url;

  constructor(private _http: HttpClient) {
  }

  add(modal: any) {
    this._modal = modal;
  }

  remove() {
    this._modal = null;
  }

  open(data?: any) {
    this._modal.open(data);
  }

  close() {
    this._modal.close();
  }

  sendFeedback(feedback: Feedback): Observable<any> {
    return this._http.post(`${this._url}/api/public/feedback`, feedback);
  }

  set url(url) {
    this._url = url;
  }
}
