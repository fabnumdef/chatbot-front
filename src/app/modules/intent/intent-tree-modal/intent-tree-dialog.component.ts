import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Intent } from '@model/intent.model';
import { IntentService } from '@core/services/intent.service';

@Component({
  selector: 'app-intent-tree-modal',
  templateUrl: './intent-tree-dialog.component.html',
  styleUrls: ['./intent-tree-dialog.component.scss']
})
export class IntentTreeDialogComponent implements OnInit {

  public intentId: string;
  public intent: Intent;

  constructor(public dialogRef: MatDialogRef<IntentTreeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public intentService: IntentService) {
    this.intentId = data.intentId;
  }

  ngOnInit(): void {
    if (!this.intentId) {
      return;
    }
    this.loadIntent(this.intentId);
  }

  loadIntent(intentId: string) {
    if (!intentId) {
      return;
    }
    this.intentId = intentId;
    this.intentService.loadOne(this.intentId).subscribe(intent => {
      this.intent = intent;
    });
  }

}
