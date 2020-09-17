import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from './app.routing';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HIGHLIGHT_OPTIONS, HighlightOptions } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        fullLibraryLoader: () => import('highlight.js'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
