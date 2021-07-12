import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-avatar',
  templateUrl: './chat-avatar.component.html',
  styleUrls: ['./chat-avatar.component.scss']
})
export class ChatAvatarComponent {
  _image: string;
  get image(): string {
    return this._image;
  }
  @Input() set image(value: string) {
    this._image = encodeURI(value);
  }
  @Input() public header = false;
  @Input() public sideMenu = false;
}
