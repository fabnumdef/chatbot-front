import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatSideMenuComponent } from './chat-side-menu/chat-side-menu.component';
import { ChatFeedbackModalComponent } from './chat-feedback-modal/chat-feedback-modal.component';
import { ChatHelpModalComponent } from './chat-help-modal/chat-help-modal.component';
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ChatWidgetComponent,
    ChatInputComponent,
    ChatSideMenuComponent,
    ChatFeedbackModalComponent,
    ChatHelpModalComponent,
    ChatAvatarComponent,
    ChatHeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRouting,
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatRippleModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {provide: Window, useValue: window},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
