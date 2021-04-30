import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Intent } from '@model/intent.model';
import { Utils } from '@core/utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditIntentDialogComponent } from '../create-edit-intent-dialog/create-edit-intent-dialog.component';

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
  @Output() leafSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() highlightLeafs: EventEmitter<string> = new EventEmitter<string>();
  selected = false;
  highlighted = false;
  showResponses = false;
  id = Utils.uuid();

  constructor(private _dialog: MatDialog) {
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
    this._dialog.open(CreateEditIntentDialogComponent, {
      data: {
        intent: this.intent
      },
      maxHeight: '80vh'
    });
  }

}
