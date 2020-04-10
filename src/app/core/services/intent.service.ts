import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Intent } from '../models/intent.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class IntentService extends ApiService<Intent> {

  constructor(private _httpClient: HttpClient) {
    super(_httpClient, '/intent');
  }
}
