import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { Media } from '@model/media.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends ApiService<Media> {

  constructor(private _httpClient: HttpClient) {
    super(_httpClient, '/media');
  }

  public createMedia(file: File): Observable<Media> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = {
      headers: headers,
      reportProgress: true,
    };

    this._loading$.next(true);
    return this._httpClient.post<Media>(this._url, formData, options).pipe(
      tap(entity => {
        const auxArray = [...this._entities$.value, entity];
        this._entities$.next(auxArray);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }
}
