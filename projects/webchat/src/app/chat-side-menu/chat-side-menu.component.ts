import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ChatHelpModalComponent } from '../chat-help-modal/chat-help-modal.component';
import { WebchatService } from '../core/services/webchat.service';

@Component({
  selector: 'app-chat-side-menu',
  templateUrl: './chat-side-menu.component.html',
  styleUrls: ['./chat-side-menu.component.scss']
})
export class ChatSideMenuComponent implements OnInit {
  @Input() public botName: string;
  @Input() public botSubtitle: string;
  @Input() public botAvatar: string;
  @Input() public companyLogo: string;
  @Input() public botDescription: string;
  @Input() public botHelpBtn: string;
  @Input() public botHelp: string;
  @Input() public botColor: string;
  @Input() public isMobileSize: boolean;
  @Input() public initPayload: string;
  @Input() public showRebootBtn: boolean;

  constructor(private _dialog: MatDialog,
              public webchatService: WebchatService) {
  }

  ngOnInit(): void {
  }

  showHelpModal() {
    this._dialog.open(ChatHelpModalComponent, {
      width: '500px',
      data: {
        botHelpBtn: this.botHelpBtn,
        botHelp: this.botHelp
      },
      autoFocus: false
    });
  }

  rebootConversation() {
    this.webchatService.sendMessage('/restart');
  }

  fullConversation() {
    this.webchatService.sendMessage('/restart');
    this.webchatService.sendMessage('/send_full_tree');
  }

}
