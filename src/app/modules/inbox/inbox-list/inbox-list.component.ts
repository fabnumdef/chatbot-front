import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Inbox } from '@model/inbox.model';
import { InboxService } from '@core/services/inbox.service';
import { PaginationHelper } from '@model/pagination-helper.model';
import * as moment from 'moment';
import { InboxStatus, InboxStatus_Fr } from '@enum/inbox-status.enum';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@core/services/user.service';
import { User } from '@model/user.model';
import { detailInOutAnimation } from '../../shared/components/chatbot-list-item/chatbot-list-item.animation';

@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.scss'],
  animations: [
    detailInOutAnimation
  ]
})
export class InboxListComponent implements OnInit {

  inboxes$: Observable<Inbox[]>;
  loading$: Observable<boolean>;
  processing$: Observable<boolean>;
  users$: Observable<User[]>;
  pagination: PaginationHelper;
  inboxStatus_Fr = InboxStatus_Fr;
  inboxIntent: number;
  inboxPreview: number;

  constructor(public inboxService: InboxService,
              private _toastr: ToastrService,
              private _userService: UserService) { }

  ngOnInit(): void {
    this.loading$ = this.inboxService.loading$;
    this.processing$ = this.inboxService.processing$;
    this.inboxes$ = this.inboxService.entities$;
    this.users$ = this._userService.entities$;
    this.pagination = this.inboxService.pagination;
  }

  getDiffDate(inbox: Inbox) {
    return moment.duration(moment().diff(inbox.timestamp * 1000)).humanize();
  }

  getBadgeClass(status: InboxStatus) {
    switch (status) {
      case InboxStatus.pending:
        return 'badge-staked-warning';
    }
  }

  selectInbox(inboxId: number, intent: boolean) {
    if (intent) {
      this.inboxPreview = null;
      this.inboxIntent = (this.inboxIntent === inboxId) ? null : inboxId;
    } else {
      this.inboxIntent = null;
      this.inboxPreview = (this.inboxPreview === inboxId) ? null : inboxId;
    }
  }

  archiveInbox(inbox: Inbox) {
    this.inboxService.delete(inbox).subscribe(() => {
      this._toastr.success(`La discussion a été archivée.`);
    });
  }

  validateInbox(inbox: Inbox) {
    this.inboxService.validate(inbox).subscribe(() => {
      this._toastr.success(`La discussion a été validée et archivée.`);
    });
  }

}
