import { Component, OnInit } from '@angular/core';
import { IntentService } from '@core/services/intent.service';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Intent } from '@model/intent.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs/operators';
import { PaginationHelper } from '@model/pagination-helper.model';
import { detailInOutAnimation } from '../../shared/components/chatbot-list-item/chatbot-list-item.animation';
import { IntentStatus, IntentStatus_Fr } from '@enum/*';
import { ConfigService } from '@core/services/config.service';
import { ToastrService } from 'ngx-toastr';
import { IntentTreeDialogComponent } from '../intent-tree-modal/intent-tree-dialog.component';

@Component({
  selector: 'app-intent-list',
  templateUrl: './intent-list.component.html',
  styleUrls: ['./intent-list.component.scss'],
  animations: [
    detailInOutAnimation
  ]
})
export class IntentListComponent implements OnInit {

  intents$: BehaviorSubject<Intent[]>;
  pagination: PaginationHelper;
  loading$: Observable<boolean>;
  intentSelected: string;
  intentTree: string;
  intentStatus = IntentStatus;
  intentStatusFr = IntentStatus_Fr;
  multipleSelection: string[] = [];

  constructor(public intentService: IntentService,
              public configService: ConfigService,
              private _toastr: ToastrService,
              private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loading$ = this.intentService.loading$;
    this.intents$ = this.intentService.entities$;
    this.pagination = this.intentService.pagination;

    this.intents$.subscribe(intents => {
      this.multipleSelection = [];
      this.intentSelected = null;
      if (intents && intents.length === 1 && this.pagination.currentPage <= 1) {
        this.intentSelected = intents[0].id;
      }
    });
  }

  selectIntent(intentId: string, showEdit: boolean) {
    if (showEdit) {
      this.intentTree = null;
      this.intentSelected = (this.intentSelected === intentId) ? null : intentId;
    } else {
      this.intentSelected = null;
      this.intentTree = (this.intentTree === intentId) ? null : intentId;
    }
  }

  archiveIntent(intent: Intent) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Êtes-vous sûr de vouloir archiver la connaissance
<b>${intent.id}${intent.mainQuestion ? ` - "${intent.mainQuestion}"` : ''}</b> ?`
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(r => !!r))
      .subscribe(async () => {
        await this.intentService.delete(intent).subscribe(() => {
          this._toastr.success(`La connaissance a été supprimée.`);
          this.configService.getConfig().subscribe();
          this._reloadIntent();
        });
      });
  }

  isIntentInError(intent: Intent) {
    return intent.knowledges?.length < 2;
  }

  selectAll() {
    if (this.multipleSelection.length < this.intents$.getValue().length) {
      this.multipleSelection = this.intents$.getValue().map(i => i.id);
    } else {
      this.multipleSelection = [];
    }
  }

  deleteAll() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Êtes-vous sûr de vouloir supprimer <b>${this.multipleSelection.length}</b> connaissances ?
<br/>Cette action est irréversible.`
      },
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(filter(r => !!r))
      .subscribe(() => {
        const tasks$ = [];
        this.multipleSelection.forEach(intentId => {
          // @ts-ignore
          tasks$.push(this.intentService.delete({id: intentId}));
        });
        forkJoin(tasks$).subscribe((results) => {
          this._toastr.success(`${results.length} connaissance(s) ont été supprimées.`);
          this.multipleSelection.forEach(intentId => {
            this._removeIntentFromSelection(intentId);
          });
          this.multipleSelection = [];
          this._reloadIntent();
        });
      });
  }

  updateMultipleSelection(checked, intentId) {
    if (checked) {
      this.multipleSelection.push(intentId);
    } else {
      this._removeIntentFromSelection(intentId);
    }
  }

  intentHasBadge(intent): boolean {
    return intent.hidden || intent.expiresAt || this.isIntentInError(intent) || intent.status && intent.status !== IntentStatus.active;
  }

  openIntentTreeDialog(intentId: string) {
    this._dialog.open(IntentTreeDialogComponent, {
      width: '80%',
      autoFocus: false,
      data: {
        intentId: intentId
      }
    });
  }

  private _reloadIntent() {
    if (this.intents$.value.length < 1) {
      this.intentService.reload();
    }
  }

  private _removeIntentFromSelection(intentId) {
    const index = this.multipleSelection.indexOf(intentId);
    if (index > -1) {
      this.multipleSelection.splice(index, 1);
    }
  }

}
