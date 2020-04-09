import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotListItemComponent } from './components/chatbot-list-item/chatbot-list-item.component';



@NgModule({
  declarations: [
    ChatbotListItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChatbotListItemComponent
  ]
})
export class SharedModule { }
