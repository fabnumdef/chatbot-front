import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MessageType } from '../core/enums/message-type.enum';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('chatboxfirefox') chatboxfirefox: ElementRef;
  @Input() public botName = 'Bot';
  @Input() public botSubtitle = '';
  @Input() public botDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  @Input() public botHelp = null;
  @Input() public botHelpBtn = null;
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
  @Input() public showRebootBtn = false;
  @Input() public delayBetweenMessages = 2000;

  public messageType = MessageType;
  public showTyping = false;
  public isMobileSize = false;
  public showFaq = false;

  constructor() {
  }

  ngOnInit() {
    window.onresize = (e) => {
      this.checkNavSize();
    };
  }

  public checkNavSize() {
    this.isMobileSize = window.innerWidth <= 767;
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
