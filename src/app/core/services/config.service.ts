import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '@model/config.model';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _url: string;
  protected _loading$ = new BehaviorSubject<boolean>(false);
  public config$ = new BehaviorSubject<Config>(null);

  constructor(private _http: HttpClient) {
    this._url = `${environment.api_endpoint}/config`;
    this.getConfig().subscribe(config => {
      this.config$.next(config);
    }, () => {
      this.config$.next(new Config());
    });
  }

  getConfig(): Observable<Config> {
    this._loading$.next(true);
    return this._http.get<Config>(this._url).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  saveConfig(partialConfig: any) {
    console.log('SAVE CONFIG', partialConfig);
    const formData: FormData = new FormData();
    if (partialConfig.icon) {
      formData.append('icon', partialConfig.icon, partialConfig.icon.name);
    }
    if (partialConfig.name) {
      formData.append('name', partialConfig.name);
    }
    if (partialConfig.function) {
      formData.append('function', partialConfig.function);
    }
    if (partialConfig.primaryColor) {
      formData.append('primaryColor', partialConfig.primaryColor);
    }
    if (partialConfig.secondaryColor) {
      formData.append('secondaryColor', partialConfig.secondaryColor);
    }
    if (partialConfig.problematic) {
      formData.append('problematic', partialConfig.problematic);
    }
    if (partialConfig.audience) {
      formData.append('audience', partialConfig.audience);
    }
    if (partialConfig.solution) {
      formData.append('solution', partialConfig.solution);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = {
      headers: headers,
      reportProgress: true,
    };

    this._loading$.next(true);
    return this._http.put<Config>(this._url, formData, options).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }
}
