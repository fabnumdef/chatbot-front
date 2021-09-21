import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Inbox } from '@model/inbox.model';
import { InboxService } from '@core/services/inbox.service';
import { PaginationHelper } from '@model/pagination-helper.model';
import * as moment from 'moment';
import { InboxStatus, InboxStatus_Fr, UserRole_Fr } from '@enum/inbox-status.enum';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@core/services/user.service';
import { User } from '@model/user.model';
import { detailInOutAnimation } from '../../shared/components/chatbot-list-item/chatbot-list-item.animation';
import { ConfigService } from '@core/services/config.service';
import { MatDialog } from '@angular/material/dialog';
import { InboxAssignationDialogComponent } from './inbox-assignation-dialog/inbox-assignation-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs/operators';
import * as humanizeDuration from 'humanize-duration';

@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.scss'],
  animations: [
    detailInOutAnimation
  ]
})
export class InboxListComponent implements OnInit {

  inboxes$: BehaviorSubject<Inbox[]>;
  loading$: Observable<boolean>;
  processing$: Observable<boolean>;
  users$: Observable<User[]>;
  pagination: PaginationHelper;
  inboxStatus_Fr = InboxStatus_Fr;
  inboxIntent: number;
  inboxPreview: number;
  multipleSelection: number[] = [];
  userRole_fr = UserRole_Fr;

  constructor(public inboxService: InboxService,
              private _toastr: ToastrService,
              private _configService: ConfigService,
              private _userService: UserService,
              private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loading$ = this.inboxService.loading$;
    this.processing$ = this.inboxService.processing$;
    this.inboxes$ = this.inboxService.entities$;
    this.users$ = this._userService.cleanEntities$;
    this.pagination = this.inboxService.pagination;

    this.inboxes$.subscribe(() => {
      this.multipleSelection = [];
    });
  }

  getDiffDate(inbox: Inbox) {
    return humanizeDuration(moment().diff(inbox.timestamp * 1000), { language: 'fr', largest: 1 });
  }

  getBadgeClass(status: InboxStatus) {
    switch (status) {
      case InboxStatus.pending:
        return 'badge-staked-warning';
      case InboxStatus.to_verify:
        return 'badge-staked-primary';
      case InboxStatus.relevant:
        return 'badge-staked-success';
      case InboxStatus.confirmed:
      case InboxStatus.archived:
        return 'badge-staked-black';
      case InboxStatus.off_topic:
      case InboxStatus.wrong:
        return 'badge-staked-error';
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
      this._toastr.success(`La requête a été archivée.`);
      this._removeInboxFromSelection(inbox.id);
      this._reloadInbox();
    });
  }

  validateInbox(inbox: Inbox) {
    this.inboxService.validate(inbox).subscribe(() => {
      this._toastr.success(`La requête a été validée et archivée.`);
      this._removeInboxFromSelection(inbox.id);
      this._reloadInbox();
    });
  }

  assignationChange(user: User, inbox: Inbox) {
    if (user === undefined) {
      return;
    }
    this.inboxService.assign(inbox, user).subscribe(() => {
      this._toastr.success(`La requête a été assignée.`);
    });
  }

  assignationExtern(inbox: Inbox) {
    this.inboxService.assign(inbox, null).subscribe();
    this._dialog.open(InboxAssignationDialogComponent, {
      data: {
        inbox: inbox
      }
    });
  }

  compareByEmails(user1: User, user2: User) {
    return user1?.email === user2?.email;
  }

  selectAll() {
    if (this.multipleSelection.length < this.inboxes$.getValue().length) {
      this.multipleSelection = this.inboxes$.getValue().map(i => i.id);
    } else {
      this.multipleSelection = [];
    }
  }

  deleteAll() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Êtes-vous sûr de vouloir archiver <b>${this.multipleSelection.length}</b> requêtes ?
<br/>Cette action est irréversible.`
      },
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(filter(r => !!r))
      .subscribe(() => {
        const tasks$ = [];
        this.multipleSelection.forEach(inboxId => {
          // @ts-ignore
          tasks$.push(this.inboxService.delete({id: inboxId}));
        });
        forkJoin(tasks$).subscribe((results) => {
          this._toastr.success(`${results.length} requête(s) ont été archivées.`);
          this.multipleSelection.forEach(inboxId => {
            this._removeInboxFromSelection(inboxId);
          });
          this.multipleSelection = [];
          this._reloadInbox();
        });
      });
  }

  updateMultipleSelection(checked, inboxId) {
    if (checked) {
      this.multipleSelection.push(inboxId);
    } else {
      this._removeInboxFromSelection(inboxId);
    }
  }

  private _reloadInbox() {
    if (this.inboxes$.value.length < 1) {
      this.inboxService.reload();
    }
  }

  private _removeInboxFromSelection(inboxId) {
    const index = this.multipleSelection.indexOf(inboxId);
    if (index > -1) {
      this.multipleSelection.splice(index, 1);
    }
  }
}
