import { Component, OnInit } from '@angular/core';
import { InboxStatus } from '@enum/*';

@Component({
    selector: 'app-stats-list',
    templateUrl: './stats-list.component.html',
    styleUrls: ['./stats-list.component.scss']
  })
export class StatsListComponent implements OnInit {

  statView = 'chatbot';

  inboxStatus = InboxStatus;

  constructor() {
    }

  ngOnInit(): void {
    }
}
