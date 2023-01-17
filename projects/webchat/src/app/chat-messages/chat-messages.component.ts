import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MessageType } from '../core/enums/message-type.enum';
import { WebchatService } from '../core/services/webchat.service';
import { Feedback, FeedbackStatus } from '../core/models/feedback.model';
import { ChatFeedbackModalComponent } from '../chat-feedback-modal/chat-feedback-modal.component';
import { FeedbackService } from '../core/services/feedback.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
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

  private _messageLength = 0;
  private _isLastMessage = true;
  private _feedbackSend = false;

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
        tap(() => {
          this._messageLength++;
        }),
        concatMap(m => of(m).pipe(
          delayWhen((message: any) => {
            delayTmp = !!message.delay ? message.delay : this.delayBetweenMessages;
            return interval(delayTmp);
          }),
          tap((message: any) => {
            this._isLastMessage = false;
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
            if (delayTmp > 0) {
              this._notificationSound.play();
            }
          })
        )),
        concatMap((m, index) => {
          if ((index + 1) >= this._messageLength) {
            this.showTyping = false;
            this._isLastMessage = true;
          }
          return of(m);
        })
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

  // Show only for last message
  public canShowFeedback(nextMessage, previousMessage, from): boolean {
    if (this._feedbackSend || !this.showFeedback || !this._isLastMessage) {
      return false;
    }
    if (!previousMessage || from === 'sent') {
      return false;
    }
    return !nextMessage;
  }

  public openModal(idx: number) {
    const dialogRef = this._dialog.open(ChatFeedbackModalComponent, {
      width: '500px',
      data: {
        primaryColor: this.botColor
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.sendFeedback(idx, result);
    });
  }

  public sendFeedback(idx: number, status = FeedbackStatus.relevant) {
    const feedback = {
      userQuestion: this._findPreviousUserMessage(idx),
      botResponse: this.messages[idx].text,
      timestamp: this.messages[idx].date / 1000,
      senderId: this._chatService.getSessionId(),
      status: status
    };
    this._feedbackService.sendFeedback(feedback).subscribe(() => {
      this._chatService.sendMessage(this.feedbackPayload);
      this.showTyping = true;
      this._feedbackSend = true;
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
    if (from === 'sent') {
      this._feedbackSend = false;
    }
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
