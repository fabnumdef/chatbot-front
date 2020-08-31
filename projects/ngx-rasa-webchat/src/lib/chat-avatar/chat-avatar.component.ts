import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-rasa-chat-avatar',
  template: `
    <div class="avatar"
         [ngClass]="{'avatar-header': header, 'avatar-side-menu': sideMenu}"
         [ngStyle]="{'background-image' : 'url(' + image + ')'}"
         aria-label="Avatar du chatbot">
    </div>
  `,
  styles: [`
    .avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      float: left;
      margin-right: 10px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .avatar.avatar-header {
      height: 50px;
      width: 50px;
    }

    .avatar.avatar-side-menu {
      height: 65px;
      width: 65px;
      float: none;
    }
  `]
})
export class ChatAvatarComponent {
  @Input() public image: string;
  @Input() public header = false;
  @Input() public sideMenu = false;
}
