import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RasaService {

  private _url = `${environment.api_endpoint}/rasa`;

  constructor(private _http: HttpClient) { }

  train(): Observable<any> {
    return this._http.post<any>(`${this._url}/train`, {});
  }
}
