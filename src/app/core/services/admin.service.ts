import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _url = `${environment.api_endpoint}/admin`;

  private _loading$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  public resetData() {
    this._http.post(`${this._url}/reset-data`, null).subscribe();
  }
}
