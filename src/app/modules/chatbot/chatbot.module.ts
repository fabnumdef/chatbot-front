import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './chatbot.component';
import { ChatbotRoutingModule } from './chatbot.routing';

@NgModule({
  declarations: [
    ChatbotComponent
  ],
  imports: [
    CommonModule,
    ChatbotRoutingModule
  ],
  providers: [
    {provide: Window, useValue: window},
  ],
})
export class ChatbotModule { }
