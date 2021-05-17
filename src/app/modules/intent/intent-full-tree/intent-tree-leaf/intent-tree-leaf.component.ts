import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intent } from '@model/intent.model';
import { Utils } from '@core/utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditIntentDialogComponent } from '../create-edit-intent-dialog/create-edit-intent-dialog.component';
import { IntentFinderDialogComponent } from '../intent-finder-dialog/intent-finder-dialog.component';
import { ResponseType } from '@enum/*';
import { ResponseService } from '@core/services/response.service';
import { ToastrService } from 'ngx-toastr';

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

  createIntent(): void {
    const dialogRef = this._dialog.open(CreateEditIntentDialogComponent, {
      data: {
        intent: new Intent()
      },
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this._addChoice(result);
    });
  }

  findIntent(): void {
    const dialogRef = this._dialog.open(IntentFinderDialogComponent, {
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
    const quickReplyResponse = this.intent.responses.find(r => r.responseType === ResponseType.quick_reply);
    quickReplyResponse.response = `${quickReplyResponse.response};${intent.mainQuestion}<${intent.id}>`;
    this._responseService.update(quickReplyResponse).subscribe(r => {
      this._toastr.success('Connaissance sauvegardée');
    });
    this.intent.responses = [...this.intent.responses];
    this.intent.nextIntents.push(intent);
  }

}
