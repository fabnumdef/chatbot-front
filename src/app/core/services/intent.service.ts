import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Intent } from '@model/intent.model';
import { ApiPaginationService } from '@core/services/api-pagination.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntentService extends ApiPaginationService<Intent> {

  constructor(private _http: HttpClient,
              private _r: Router) {
    super(_http, '/intent', _r);
    this.loadAll().subscribe();
  }

  checkId(id: string): Observable<boolean> {
    return this._http.get<any>(`${this._url}/check/${id}`);
  }
}
