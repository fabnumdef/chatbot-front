import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Intent } from '@model/intent.model';
import { WebchatService } from './webchat.service';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private _url: string;
  private _categories$ = new BehaviorSubject<string[]>(null);
  protected _loading$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient,
              private _webchatService: WebchatService) {
    this._url = `https://dev.chatbot.fabnum.fr/api/public`;
    this.connectToFaq();
  }

  loadCategories(): Observable<string[]> {
    this._loading$.next(true);
    return this._http.get<string[]>(`${this._url}/categories`).pipe(
      tap(categories => {
        this._categories$.next(categories);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  loadCategory(category: string): Observable<Intent[]> {
    const senderId = this._webchatService.getSessionId();
    this._loading$.next(true);
    return this._http.get<Intent[]>(`${this._url}/category/${category}`, {params: {senderId}}).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  clickIntent(intentId: string) {
    const senderId = this._webchatService.getSessionId();
    this._http.post(`${this._url}/faq/${intentId}`, {senderId}).subscribe();
  }

  connectToFaq() {
    const senderId = this._webchatService.getSessionId();
    this._http.post(`${this._url}/faq`, {senderId}).subscribe();
  }

  get categories() {
    return this._categories$.getValue();
  }
}
