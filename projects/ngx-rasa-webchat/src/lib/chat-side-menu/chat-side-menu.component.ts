import { Component, Input, OnInit } from '@angular/core';
import { ChatHelpModalService } from '../chat-help-modal/chat-help-modal.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-rasa-chat-side-menu',
  templateUrl: './chat-side-menu.component.html',
  styleUrls: ['./chat-side-menu.component.css']
})
export class ChatSideMenuComponent implements OnInit {
  @Input() public botName: string;
  @Input() public botSubtitle: string;
  @Input() public botAvatar: string;
  @Input() public companyLogo: string;
  @Input() public botDescription: string;
  @Input() public botHelp: string;
  @Input() public botColor: string;

  constructor(private _modalService: ChatHelpModalService) {
  }

  ngOnInit(): void {
  }

  showHelpModal() {
    this._modalService.open();
  }

}
