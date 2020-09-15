import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-avatar',
  templateUrl: './chat-avatar.component.html',
  styleUrls: ['./chat-avatar.component.scss']
})
export class ChatAvatarComponent {
  @Input() public image: string;
  @Input() public header = false;
  @Input() public sideMenu = false;
}
