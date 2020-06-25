import { NgModule } from '@angular/core';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { CommonModule } from '@angular/common';
import { NgxRasaWebchatService } from './ngx-rasa-webchat.service';
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatConfigComponent } from './chat-config/chat-config.component';
import { ChatSideMenuComponent } from './chat-side-menu/chat-side-menu.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChatWidgetComponent, ChatAvatarComponent, ChatInputComponent, ChatConfigComponent, ChatSideMenuComponent],
  imports: [CommonModule, FormsModule],
  exports: [ChatWidgetComponent, ChatConfigComponent],
  providers: [NgxRasaWebchatService],
  entryComponents: [ChatWidgetComponent, ChatConfigComponent],
})
export class NgxRasaWebchatModule {
}
