import { Component, OnInit } from '@angular/core';
import { IntentService } from '@core/services/intent.service';
import { Observable } from 'rxjs';
import { Intent } from '@model/intent.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-intent-list',
  templateUrl: './intent-list.component.html',
  styleUrls: ['./intent-list.component.scss']
})
export class IntentListComponent implements OnInit {

  intents$: Observable<Intent[]>;
  loading$: Observable<boolean>;
  intentSelected: string = null;

  constructor(private _intentService: IntentService,
              private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loading$ = this._intentService.loading$;
    this.intents$ = this._intentService.entities$;
  }

  selectIntent(intentId: string) {
    this.intentSelected = (this.intentSelected === intentId) ? null : intentId;
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
      .subscribe(() => {
        this._intentService.delete(intent).subscribe();
      });

  }

  isIntentInError(intent: Intent) {
    return intent.knowledges?.length < 1;
  }

}
