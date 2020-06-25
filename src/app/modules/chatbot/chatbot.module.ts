import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { ChatbotRoutingModule } from './chatbot.routing';
import { NgxRasaWebchatModule } from 'ngx-rasa-webchat';

@NgModule({
  declarations: [
    ChatbotComponent
  ],
  imports: [
    CommonModule,
    ChatbotRoutingModule,
    NgxRasaWebchatModule
  ],
  providers: [
    {provide: Window, useValue: window},
  ],
})
export class ChatbotModule { }
