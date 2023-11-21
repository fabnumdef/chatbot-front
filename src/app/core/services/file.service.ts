import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { FileTemplateCheckResume } from '@model/file-template-check-resume.model';
import { ImportFile } from '@model/import-file.model';
import { FileHistoric } from '@model/file-historic.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private _url: string;

  protected _loading$ = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {
    this._url = `${environment.api_endpoint}/file`;
  }

  checkFile(file: File): Observable<FileTemplateCheckResume> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = {
      headers,
      reportProgress: true,
    };

    this._loading$.next(true);
    return this._http.post<FileTemplateCheckResume>(`${this._url}/check`, formData, options).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  upload(importFile: ImportFile): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', importFile.file, importFile.file.name);
    formData.append('deleteIntents', importFile.deleteIntents.toString());
    formData.append('oldURL', importFile.oldURL);
    formData.append('newURL', importFile.newURL);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = {
      headers,
      reportProgress: true,
    };

    this._loading$.next(true);
    return this._http.post<any>(`${this._url}/import`, formData, options).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  export(): Observable<any> {
    this._loading$.next(true);
    // @ts-ignore
    return this._http.get<any>(`${this._url}/export`, {responseType: 'blob'}).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  getHistoric(): Observable<FileHistoric[]> {
    this._loading$.next(true);
    return this._http.get<FileHistoric[]>(`${this._url}/historic`).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  /** **********************
   ******** GETTER ********
   *********************** */

  get loading$(): BehaviorSubject<boolean> {
    return this._loading$;
  }
}
