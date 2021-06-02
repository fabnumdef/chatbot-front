import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageType } from '../core/enums/message-type.enum';
import { WebchatService } from '../core/services/webchat.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: any;
  @Input() botColor: string;
  @Input() userColor: string;
  @Input() dismissQuickReplies: boolean;
  @Output() showTyping = new EventEmitter<boolean>();
  @Output() addMessage = new EventEmitter<any>();

  public messageType = MessageType;

  private _domainRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?', 'i'); // fragment locator

  constructor(private _chatService: WebchatService,
              private _sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  public async quickReplyClick(payload: string, title: string, message: any = null) {
    if (!payload) {
      return;
    }
    if (!!this._domainRegex.test(payload)) {
      window.open(payload, '_blank');
    } else {
      message.clicked = true;
      this.addMessage.emit({text: title, type: MessageType.text, from: 'sent'});
      await setTimeout(() => {
        this._chatService.sendMessage(`${payload.charAt(0) === '/' ? '' : '/'}${payload}`);
        this.showTyping.emit(true);
      }, 0);
    }
  }

  public urlify(text) {
    if (!text) {
      return;
    }
    const urlRegex = /[^href="]https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=;]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=;]*)/gi;
    return text.replace(urlRegex, (url) => {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
  }

  public sanitize(url: string) {
    return this._sanitizer.bypassSecurityTrustHtml(url);
  }

}
