import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Inbox } from '../models/inbox.model';

@Injectable({
  providedIn: 'root'
})
export class InboxService extends ApiService<Inbox> {

  constructor(private _httpClient: HttpClient) {
    super(_httpClient, '/inbox');
  }
}
