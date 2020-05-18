import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { Media } from '@model/media.model';
import { ApiPaginationService } from '@core/services/api-pagination.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MediaService extends ApiPaginationService<Media> {

  constructor(private _http: HttpClient, private _r: Router) {
    super(_http, '/media', _r);
  }

  public createMedia(files: File[]): Observable<Media[]> {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i]['name']);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = {
      headers: headers,
      reportProgress: true,
    };

    this._loading$.next(true);
    return this._http.post<Media[]>(this._url, formData, options).pipe(
      tap(entities => {
        const auxArray = [...this._entities$.value, ...entities];
        this._entities$.next(auxArray);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  public replace(mediaId: number, file: File): Observable<Media> {
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
    return this._http.put<Media>(`${this._url}/${mediaId}`, formData, options).pipe(
      tap(entity => {
        this.updateEntityArray(entity);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  public export(): Observable<any> {
    this._processing$.next(true);
    return this._http.get(`${this._url}/export`, {responseType: 'blob' as 'json'}).pipe(
      tap((response: any) => {
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.setAttribute('download', 'MEDIATHEQUE.zip');
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }),
      finalize(() => {
        this._processing$.next(false);
      })
    );
  }
}
