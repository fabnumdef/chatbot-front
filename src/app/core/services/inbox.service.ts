import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inbox } from '@model/inbox.model';
import { ApiPaginationService } from '@core/services/api-pagination.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InboxService extends ApiPaginationService<Inbox> {

  constructor(private _http: HttpClient, private _r: Router) {
    super(_http, '/inbox', _r);
  }
}
