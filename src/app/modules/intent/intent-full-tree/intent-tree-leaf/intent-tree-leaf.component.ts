import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intent } from '@model/intent.model';
import { Utils } from '@core/utils/utils';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CreateEditIntentDialogComponent } from '../create-edit-intent-dialog/create-edit-intent-dialog.component';
import { IntentFinderDialogComponent } from '../intent-finder-dialog/intent-finder-dialog.component';
import { ResponseType } from '@enum/*';
import { ResponseService } from '@core/services/response.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from '@model/response.model';
import { IntentService } from '@core/services/intent.service';

@Component({
  selector: 'app-intent-tree-leaf',
  templateUrl: './intent-tree-leaf.component.html',
  styleUrls: ['./intent-tree-leaf.component.scss']
})
export class IntentTreeLeafComponent implements OnInit {

  @Input() set onLeafSelected(value: string) {
    this.highlighted = false;
    this.showResponses = false;
    if (value !== this.id) {
      this.selected = false;
    }
  }

  @Input() set onHighlightLeafs(value: string) {
    if (value === this.intent.id) {
      this.highlighted = true;
      console.log('HIGHLIGHTED');
    }
  }

  @Input() intent: Intent;
  @Input() isRoot: boolean;
  @Output() leafSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() highlightLeafs: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteLeaf: EventEmitter<string> = new EventEmitter<string>();
  selected = false;
  highlighted = false;
  showResponses = false;
  id = Utils.uuid();

  constructor(private _dialog: MatDialog,
              private _responseService: ResponseService,
              private _intentService: IntentService,
              private _toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  selectLeaf(): void {
    this.selected = !this.selected;
    if (this.selected) {
      this.leafSelected.emit(this.id);
    } else {
      this.showResponses = false;
    }
  }

  showHighlightLeafs(): void {
    this.highlightLeafs.emit(this.intent.id);
  }

  editIntent(): void {
    const dialogRef = this._dialog.open(CreateEditIntentDialogComponent, {
      data: {
        intent: this.intent
      },
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.intent = result;
    });
  }

  createFindIntent(isNew = false): void {
    if (!this._checkBeforeAddingChoice(this.intent)) {
      this._toastr.warning('Aucune réponse de type texte ou réponse à choix trouvée.');
      this.editIntent();
      return;
    }
    const dialogRef = isNew ? this._dialog.open(CreateEditIntentDialogComponent, {
      data: {
        intent: new Intent()
      },
      maxHeight: '80vh'
    }) : this._dialog.open(IntentFinderDialogComponent, {
      width: '80vw',
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this._addChoice(result);
    });
  }

  deleteIntent(): void {
    this.deleteLeaf.emit(this.intent.id);
  }

  private _addChoice(intent: Intent) {
    let quickReplyResponse = this.intent.responses.find(r => r.responseType === ResponseType.quick_reply);
    if (!quickReplyResponse) {
      quickReplyResponse = this._addQuickReply(this.intent);
    }
    quickReplyResponse.response = quickReplyResponse.response ? `${quickReplyResponse.response};${intent.mainQuestion}<${intent.id}>`
      : `${intent.mainQuestion}<${intent.id}>`;

    this._intentService.update(this._formatIntent(this.intent), this.intent.id).subscribe(r => {
      this._toastr.success('Connaissance sauvegardée');
      this.intent.responses = [...this.intent.responses];
      this.intent.nextIntents.push(intent);
    });
  }

  private _addQuickReply(intent: Intent): Response {
    const qr = new Response(intent);
    qr.responseType = ResponseType.quick_reply;
    const index = intent.responses.findIndex((r, idx) => {
      return r.responseType === ResponseType.text &&
        (!intent.responses[idx + 1] || (intent.responses[idx + 1].responseType === ResponseType.text));
    });

    intent.responses.splice(index + 1, 0, qr);
    return intent.responses[index + 1];
  }

  private _checkBeforeAddingChoice(intent: Intent): boolean {
    return intent.responses.findIndex((r, idx) => {
      return r.responseType === ResponseType.quick_reply || (r.responseType === ResponseType.text &&
        (!intent.responses[idx + 1] || (intent.responses[idx + 1].responseType === ResponseType.text)));
    }) >= 0;
  }

  private _formatIntent(intent: Intent): Intent {
    const intentToReturn = Object.assign({}, intent);
    delete intentToReturn.createdAt;
    return intentToReturn;
  }

}
