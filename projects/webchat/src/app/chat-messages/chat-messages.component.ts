import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MessageType } from '../core/enums/message-type.enum';
import { WebchatService } from '../core/services/webchat.service';
import { Feedback, FeedbackStatus } from '../core/models/feedback.model';
import { ChatFeedbackModalComponent } from '../chat-feedback-modal/chat-feedback-modal.component';
import { FeedbackService } from '../core/services/feedback.service';
import { MatDialog } from '@angular/material/dialog';
import { interval, of, Subject } from 'rxjs';
import { concatMap, delayWhen, filter, tap } from 'rxjs/operators';
import { fadeIn, fadeInOut } from '../core/animation';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  animations: [fadeInOut, fadeIn]
})
export class ChatMessagesComponent implements OnInit, OnDestroy {
  @ViewChild('chatboxfirefox') chatboxfirefox: ElementRef;

  @Input() showTyping: boolean;
  @Input() botColor: string;
  @Input() userColor: string;
  @Input() botName: string;
  @Input() botAvatar: string;
  @Input() userAvatar: string;
  @Input() dismissQuickReplies: boolean;
  @Input() showFeedback: boolean;
  @Input() feedbackPayload: string;
  @Input() blockTypeText: boolean;
  @Input() showIntentSearch: boolean;
  @Input() inputPlaceholder: string;
  @Input() isMobileSize: boolean;
  @Input() storage: string;
  @Input() socketUrl: string;
  @Input() socketPath: string;
  @Input() initPayload: string;
  @Input() delayBetweenMessages: number;
  @Input() isTree: boolean;
  @Input() showFaq: boolean;

  @Output() checkNavSize = new EventEmitter();

  public messages = [];
  public messageType = MessageType;
  public hoverFeedbackWrongIdx = null;
  public hoverFeedbackOkIdx = null;
  public focus = new Subject();

  private _notificationSound = new Audio('assets/sounds/notification.ogg');
  private _domainRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?', 'i'); // fragment locator

  constructor(private _chatService: WebchatService,
              private _feedbackService: FeedbackService,
              private _dialog: MatDialog) {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this._focusMessage();
    }
  }

  ngOnInit(): void {
    this._chatService.setStorage(this.storage);
    this.messages = this._chatService.getConversation();
    this._chatService.connect(this.socketUrl, this.socketPath, this.initPayload);
    this._feedbackService.url = this.socketUrl;

    setTimeout(() => {
      this._scrollToBottom();
      this._focusMessage();
    }, 0);

    let delayTmp = this.delayBetweenMessages ? this.delayBetweenMessages : 2000;
    this._chatService
      .getMessages()
      .pipe(
        filter(m => !!m),
        concatMap(m => of(m).pipe(
          delayWhen((message: any) => {
            delayTmp = !!message.delay ? message.delay : this.delayBetweenMessages;
            return interval(delayTmp);
          }),
          tap((message: any) => {
            // console.log(message);
            if (message.text && (!message.quick_replies || message.quick_replies.length < 1)) {
              this.addMessage(message.text, MessageType.text, message.from ? message.from : 'received', null, null, message.delay);
            } else if (message.text && message.quick_replies && message.quick_replies.length > 0
              && this._isPayloadQuickReply(message.quick_replies[0].payload)) {
              this.addMessage(message.text, MessageType.quick_reply, message.from ? message.from : 'received',
                message.quick_replies, null, message.delay);
              setTimeout(() => {
                this._focusQuickReplies();
              }, 0);
            } else if (message.text && message.quick_replies && message.quick_replies.length > 0
              && !this._isPayloadQuickReply(message.quick_replies[0].payload)) {
              this.addMessage(message.text, MessageType.button, message.from ? message.from : 'received',
                message.quick_replies, null, message.delay);
              setTimeout(() => {
                this._focusQuickReplies();
              }, 0);
            } else if (message.attachment) {
              this.addMessage(message.attachment?.payload?.src, MessageType.image, message.from ? message.from : 'received',
                null, null, message.delay);
            }
            this.showTyping = false;
            if (delayTmp > 0) {
              this._notificationSound.play();
            }
          })
        ))
      )
      .subscribe();

    this.checkNavSize.emit();

    this._chatService.setBlockText(this.blockTypeText);
    this._chatService
      .getBlockText()
      .pipe(tap((blockText: boolean) => {
        this.blockTypeText = blockText;
      }))
      .subscribe();
  }

  ngOnDestroy() {
    this._chatService.resetMessages();
  }

  public isFirstMessage(previousMessage, from): boolean {
    if (!previousMessage) {
      return true;
    }
    return previousMessage.from !== from;
  }

  public isLastMessage(nextMessage, from): boolean {
    if (!nextMessage) {
      return true;
    }
    return nextMessage.from !== from;
  }

  public canShowFeedback(nextMessage, previousMessage, from): boolean {
    if (!this.showFeedback) {
      return false;
    }
    if (!previousMessage || from === 'sent') {
      return false;
    }
    if (!nextMessage) {
      return true;
    }
    return nextMessage.from !== from;
  }

  public openModal(idx: number) {
    const data: Feedback = {
      userQuestion: this._findPreviousUserMessage(idx),
      botResponse: this.messages[idx].text,
      timestamp: this.messages[idx].date / 1000,
      senderId: this._chatService.getSessionId(),
      status: null
    };
    this._dialog.open(ChatFeedbackModalComponent, {
      width: '500px',
      data: Object.assign(data, {
        feedbackPayload: this.feedbackPayload,
        primaryColor: this.botColor
      }),
      autoFocus: false
    });
  }

  public sendFeedback(idx: number) {
    const feedback = {
      userQuestion: this._findPreviousUserMessage(idx),
      botResponse: this.messages[idx].text,
      timestamp: this.messages[idx].date / 1000,
      senderId: this._chatService.getSessionId(),
      status: FeedbackStatus.relevant
    };
    this._feedbackService.sendFeedback(feedback).subscribe(() => {
      this._chatService.sendMessage(this.feedbackPayload);
      this.showTyping = true;
    });
  }

  public sendMessage({message, type, payload}) {
    if (message.trim() === '') {
      return;
    }
    this.addMessage(message, type, 'sent', null, payload);
    this._chatService.sendMessage(payload ? payload : message);
    this.showTyping = true;
  }

  public addMessage(text: string,
                    type: MessageType,
                    from: 'received' | 'sent',
                    quick_replies: [] = null,
                    payload = null,
                    delayTmp = 2000) {
    const message = {
      text,
      type,
      from,
      quick_replies,
      payload,
      date: new Date().getTime(),
    };
    this.messages.unshift(message);
    this._chatService.storeConversation(this.messages);
    if (delayTmp > 1) {
      this._scrollToBottom();
    }
  }

  private _focusMessage() {
    this.focus.next(true);
  }

  private _scrollToBottom() {
    if (this.chatboxfirefox !== undefined) {
      setTimeout(() => {
        this.chatboxfirefox.nativeElement.scrollTop = this.chatboxfirefox.nativeElement.scrollHeight;
      });
    }
  }

  private _findPreviousUserMessage(idx): string {
    for (let i = idx; i < this.messages.length; i++) {
      if (this.messages[i].from === 'sent') {
        return this.messages[i].payload ? this.messages[i].payload : this.messages[i].text;
      }
    }
  }

  private _focusQuickReplies() {
    const textBeforeQr = document.querySelectorAll('.chat-message-text-qr, .chat-message-text-button').item(0);
    if (textBeforeQr) {
      // @ts-ignore
      textBeforeQr.focus();
    }
  }

  private _isPayloadQuickReply(payload: string): boolean {
    return !this._domainRegex.test(payload);
  }

}
