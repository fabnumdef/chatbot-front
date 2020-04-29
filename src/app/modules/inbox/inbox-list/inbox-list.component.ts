import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Inbox } from '@model/inbox.model';
import { InboxService } from '@core/services/inbox.service';

@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.scss']
})
export class InboxListComponent implements OnInit {

  inboxes$: Observable<Inbox[]>;
  loading$: Observable<boolean>;
  processing$: Observable<boolean>;

  constructor(private _inboxService: InboxService) { }

  ngOnInit(): void {
    this.loading$ = this._inboxService.loading$;
    this.processing$ = this._inboxService.processing$;
    this.inboxes$ = this._inboxService.entities$;
  }

}
