import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { fadeIn, fadeInOut } from '../core/animation';
import { of, Subject } from 'rxjs';
import { concatMap, delay, filter, tap } from 'rxjs/operators';
import { WebchatService } from '../core/services/webchat.service';
import { MessageType } from '../core/enums/message-type.enum';
import { Feedback, FeedbackStatus } from '../core/models/feedback.model';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackService } from '../core/services/feedback.service';
import { ChatFeedbackModalComponent } from '../chat-feedback-modal/chat-feedback-modal.component';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
  animations: [fadeInOut, fadeIn]
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('chatboxfirefox') chatboxfirefox: ElementRef;
  @Input() public botName = 'Bot';
  @Input() public botSubtitle = '';
  @Input() public botDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  @Input() public botHelp = null;
  @Input() public botAvatar = `https://cdn.dribbble.com/users/275794/screenshots/3128598/gbot_800.png`;
  @Input() public companyLogo = `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Logo_Minist%C3%A8re_des_Arm%C3%A9es_%282020%29.svg/520px-Logo_Minist%C3%A8re_des_Arm%C3%A9es_%282020%29.svg.png`;
  @Input() public userAvatar = null;
  @Input() public socketUrl = 'http://localhost:5500';
  @Input() public socketPath = '/socket-chatbot/';
  @Input() public initPayload = '/phrase_presentation';
  @Input() public feedbackPayload = '/phrase_feedback';
  @Input() public inputPlaceholder = 'Posez votre question ...';
  @Input() public botColor = '#6E91F0';
  @Input() public userColor = '#EBECEF';
  @Input() public storage = 'session';
  @Input() public showIntentSearch = true;
  @Input() public dismissQuickReplies = false;
  @Input() public blockTypeText = false;
  @Input() public showFeedback = true;

  public messageType = MessageType;
  public notificationSound = new Audio('assets/sounds/notification.ogg');
  public hoverFeedbackWrongIdx = null;
  public hoverFeedbackOkIdx = null;
  public showTyping = false;
  public isMobileSize = false;
  private _domainRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  constructor(public chatService: WebchatService,
              private _dialog: MatDialog,
              private _feedbackService: FeedbackService) {
  }

  public focus = new Subject();

  public operator;

  public client;

  public messages = [];

  public addMessage(text: string, type: MessageType, from: 'received' | 'sent', quick_replies: [] = null, payload = null) {
    const message = {
      text,
      type,
      from,
      quick_replies,
      payload,
      date: new Date().getTime(),
    };
    this.messages.unshift(message);
    this.chatService.storeConversation(this.messages);
    this.scrollToBottom();
  }

  public scrollToBottom() {
    if (this.chatboxfirefox !== undefined) {
      setTimeout(() => {
        this.chatboxfirefox.nativeElement.scrollTop = this.chatboxfirefox.nativeElement.scrollHeight;
      });
    }
  }

  public focusMessage() {
    this.focus.next(true);
  }

  ngOnInit() {
    this.chatService.setStorage(this.storage);
    this.messages = this.chatService.getConversation();
    this.chatService.connect(this.socketUrl, this.socketPath, this.initPayload);
    this._feedbackService.url = this.socketUrl;

    setTimeout(() => {
      this.scrollToBottom();
      this.focusMessage();
    }, 0);

    this.client = {
      name: 'Guest User',
      status: 'online',
      avatar: this.userAvatar,
    };

    this.operator = {
      name: this.botName,
      status: 'online',
      avatar: this.botAvatar,
    };

    this.chatService
      .getMessages()
      .pipe(
        filter(m => !!m),
        concatMap(m => of(m).pipe(
          delay(2000),
          tap((message: any) => {
            // console.log(message);
            if (message.text && (!message.quick_replies || message.quick_replies.length < 1)) {
              this.addMessage(message.text, MessageType.text, 'received');
            } else if (message.text && message.quick_replies && message.quick_replies.length > 0
              && this._isPayloadQuickReply(message.quick_replies[0].payload)) {
              this.addMessage(message.text, MessageType.quick_reply, 'received', message.quick_replies);
              setTimeout(() => {
                this._focusQuickReplies();
              }, 0);
            } else if (message.text && message.quick_replies && message.quick_replies.length > 0
              && !this._isPayloadQuickReply(message.quick_replies[0].payload)) {
              this.addMessage(message.text, MessageType.button, 'received', message.quick_replies);
              setTimeout(() => {
                this._focusQuickReplies();
              }, 0);
            } else if (message.attachment) {
              this.addMessage(message.attachment?.payload?.src, MessageType.image, 'received');
            }
            this.showTyping = false;
            this.notificationSound.play();
          })
        ))
      )
      .subscribe();

    this._checkNavSize();
    window.onresize = (e) => {
      this._checkNavSize();
    };
  }

  public sendMessage({message, type, payload}) {
    if (message.trim() === '') {
      return;
    }
    this.addMessage(message, type, 'sent', null, payload);
    this.chatService.sendMessage(payload ? payload : message);
    this.showTyping = true;
  }

  public quickReplyClick(payload: string, title: string, message: any = null) {
    if (!!this._domainRegex.test(payload)) {
      window.open(payload, '_blank');
    } else {
      message.clicked = true;
      this.addMessage(title, MessageType.text, 'sent');
      this.chatService.sendMessage(`${payload.charAt(0) === '/' ? '' : '/'}${payload}`);
    }
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
    // console.log(nextMessage);
    // console.log(previousMessage);
    // console.log(from);
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
      senderId: this.chatService.getSessionId(),
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
      senderId: this.chatService.getSessionId(),
      status: FeedbackStatus.relevant
    };
    this._feedbackService.sendFeedback(feedback).subscribe(() => {
      this.chatService.sendMessage(this.feedbackPayload);
      this.showTyping = true;
    });
  }

  public urlify(text) {
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=;]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=;]*)/gi;
    return text.replace(urlRegex, (url) => {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage();
    }
  }

  private _focusQuickReplies() {
    const textBeforeQr = document.querySelectorAll('.chat-message-text-qr, .chat-message-text-button').item(0);
    if (textBeforeQr) {
      // @ts-ignore
      textBeforeQr.focus();
    }
  }

  private _findPreviousUserMessage(idx): string {
    for (let i = idx; i < this.messages.length; i++) {
      if (this.messages[i].from === 'sent') {
        return this.messages[i].payload ? this.messages[i].payload : this.messages[i].text;
      }
    }
  }

  private _checkNavSize() {
    this.isMobileSize = window.innerWidth <= 767;
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  private _isPayloadQuickReply(payload: string): boolean {
    return !this._domainRegex.test(payload);
  }
}
