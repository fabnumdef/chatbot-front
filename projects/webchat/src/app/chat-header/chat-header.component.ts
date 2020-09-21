import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {
  @Input() public botName: string;
  @Input() public botSubtitle: string;
  @Input() public botAvatar: string;
  @Input() public botColor: string;
  @Input() public isMobileSize: boolean;
  @Input() public drawer: any;

  constructor() { }

  ngOnInit(): void {
  }

}
