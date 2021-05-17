import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Response } from '@model/response.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseService extends ApiService<Response> {
  constructor(private _httpClient: HttpClient) {
    super(_httpClient, '/response');
  }
}
