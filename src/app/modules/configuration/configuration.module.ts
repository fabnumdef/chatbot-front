import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationLayoutComponent } from './configuration-layout/configuration-layout.component';
import { ConfigurationRoutingModule } from './configuration.routing';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ChatbotAccessComponent } from './chatbot-access/chatbot-access.component';
import { ChatbotConfigComponent } from './chatbot-config/chatbot-config.component';
import { ChatbotUsersComponent } from './chatbot-users/chatbot-users.component';
import { UserFormComponent } from './chatbot-users/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { ChatbotPreviewComponent } from './chatbot-config/chatbot-preview/chatbot-preview.component';
import { ChatbotEmbeddedPreviewComponent } from './chatbot-config/chatbot-embedded-preview/chatbot-embedded-preview.component';

@NgModule({
  declarations: [
    ConfigurationLayoutComponent,
    ChatbotAccessComponent,
    ChatbotConfigComponent,
    ChatbotUsersComponent,
    UserFormComponent,
    ChatbotPreviewComponent,
    ChatbotEmbeddedPreviewComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    MaterialModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [
    {provide: Window, useValue: window},
  ]
})
export class ConfigurationModule { }
