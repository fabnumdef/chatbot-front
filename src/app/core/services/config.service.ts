import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '@model/config.model';
import { finalize, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _url: string;

  protected _loading$ = new BehaviorSubject<boolean>(false);

  public config$ = new BehaviorSubject<Config>(null);

  private _configInterval;

  constructor(private _http: HttpClient,
              private _toastr: ToastrService,
              private _auth: AuthService) {
    this._url = `${environment.api_endpoint}/config`;
    this.getConfig().subscribe(() => {
    }, () => {
      this.config$.next(new Config());
    });
    this.getContinuousConfig();
  }

  getConfig(): Observable<Config> {
    this._loading$.next(true);
    return this._http.get<Config>(this._url).pipe(
      tap(config => {
        this.config$.next(config);
      }),
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  saveConfig(partialConfig: any) {
    const formData: FormData = new FormData();
    if (partialConfig.icon) {
      formData.append('icon', partialConfig.icon, partialConfig.icon.name);
    }
    if (partialConfig.embeddedIcon) {
      formData.append('embeddedIcon', partialConfig.embeddedIcon, partialConfig.embeddedIcon.name);
    }
    ['storage', 'showIntentSearch', 'showFaq', 'showFallbackSuggestions', 'isTree'].forEach(attribute => {
      if (partialConfig[attribute] !== undefined) {
        formData.append(attribute, partialConfig[attribute].toString());
      }
    });
    ['name', 'function', 'primaryColor', 'secondaryColor', 'problematic', 'audience',
      'description', 'help', 'helpBtn', 'chatBtn', 'faqBtn', 'delayBetweenMessages'].forEach(attribute => {
      if (partialConfig[attribute]) {
        formData.append(attribute, partialConfig[attribute]);
      }
    });

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = {
      headers,
      reportProgress: true,
    };

    this._loading$.next(true);
    return this._http.put<Config>(this._url, formData, options).pipe(
      finalize(() => {
        this._loading$.next(false);
      })
    );
  }

  getContinuousConfig(fast = false) {
    if (this._configInterval) {
      clearInterval(this._configInterval);
    }
    this._configInterval = setInterval(() => {
      if (!this._auth.isAuthenticated()) {
        return;
      }
      this.getConfig().subscribe(config => {
        if (config.trainingRasa && !fast) {
          clearInterval(this._configInterval);
          this.getContinuousConfig(true);
        } else if (!config.trainingRasa && fast) {
          clearInterval(this._configInterval);
          this.getContinuousConfig();
          this._toastr.success('La mise à jour du chatbot est terminée.');
        }
      });
    }, fast ? 30000 : 60000);
  }
}
