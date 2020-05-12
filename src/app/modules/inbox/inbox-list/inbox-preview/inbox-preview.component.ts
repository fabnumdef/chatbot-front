import { Component, Input, OnInit } from '@angular/core';
import { Inbox } from '@model/inbox.model';

@Component({
  selector: 'app-inbox-preview',
  templateUrl: './inbox-preview.component.html',
  styleUrls: ['./inbox-preview.component.scss']
})
export class InboxPreviewComponent implements OnInit {

  @Input() inbox: Inbox;

  constructor() { }

  ngOnInit(): void {
    // TODO: TMP
    // @ts-ignore
    this.inbox.response = JSON.parse(this.inbox.response);
  }

}
