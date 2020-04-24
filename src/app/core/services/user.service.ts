import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';
import { User } from '@model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User> {
  constructor(private _httpClient: HttpClient) {
    super(_httpClient, '/user', 'email');
  }
}
