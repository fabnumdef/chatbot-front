import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatFeedbackModalComponent } from './chat-feedback-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatFeedbackModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ChatFeedbackModalComponent
  ]
})
export class ChatFeedbackModalModule { }
