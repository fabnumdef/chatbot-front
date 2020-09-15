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

@NgModule({
  declarations: [
    AppComponent,
    ChatWidgetComponent,
    ChatInputComponent,
    ChatSideMenuComponent,
    ChatFeedbackModalComponent,
    ChatHelpModalComponent,
    ChatAvatarComponent
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
    MatSelectModule
  ],
  providers: [
    {provide: Window, useValue: window},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
