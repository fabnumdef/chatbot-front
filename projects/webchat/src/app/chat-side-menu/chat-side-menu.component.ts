import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatHelpModalComponent } from '../chat-help-modal/chat-help-modal.component';

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
  @Input() public botHelp: string;
  @Input() public botColor: string;

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showHelpModal() {
    this._dialog.open(ChatHelpModalComponent, {
      data: {
        primaryColor: this.botColor,
        botHelp: this.botHelp
      }
    });
  }

}
