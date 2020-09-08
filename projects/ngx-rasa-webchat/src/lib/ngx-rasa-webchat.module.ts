import { Injector, NgModule } from '@angular/core';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { CommonModule } from '@angular/common';
import { NgxRasaWebchatService } from './ngx-rasa-webchat.service';
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatConfigComponent } from './chat-config/chat-config.component';
import { ChatSideMenuComponent } from './chat-side-menu/chat-side-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatFeedbackModalModule } from './chat-feedback-modal/chat-feedback-modal.module';
import { ChatHelpModalModule } from './chat-help-modal/chat-help-modal.module';
import { createCustomElement } from '@angular/elements';


@NgModule({
  declarations: [ChatWidgetComponent, ChatAvatarComponent, ChatInputComponent, ChatConfigComponent, ChatSideMenuComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, ChatFeedbackModalModule, ChatHelpModalModule],
  exports: [ChatWidgetComponent, ChatConfigComponent],
  providers: [NgxRasaWebchatService],
  entryComponents: [ChatWidgetComponent, ChatConfigComponent],
})
export class NgxRasaWebchatModule {
  constructor(readonly injector: Injector) {
    const el = createCustomElement(ChatWidgetComponent, { injector: this.injector });
    customElements.define('ngx-rasa-chat-widget', el);
  }

  ngDoBootstrap() {}
}
