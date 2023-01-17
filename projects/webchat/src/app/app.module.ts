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
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChatMaintenanceModeComponent } from './chat-maintenance-mode/chat-maintenance-mode.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { FaqDetailComponent } from './faq-detail/faq-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    ChatWidgetComponent,
    ChatInputComponent,
    ChatSideMenuComponent,
    ChatFeedbackModalComponent,
    ChatHelpModalComponent,
    ChatAvatarComponent,
    ChatHeaderComponent,
    ChatMaintenanceModeComponent,
    FaqListComponent,
    ChatMessagesComponent,
    FaqDetailComponent,
    ChatMessageComponent
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
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDividerModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {provide: Window, useValue: window},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
