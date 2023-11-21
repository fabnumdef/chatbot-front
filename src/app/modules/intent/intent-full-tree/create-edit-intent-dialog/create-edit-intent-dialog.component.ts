import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { IntentService } from '@core/services/intent.service';
import { Intent } from '@model/intent.model';

@Component({
  selector: 'app-create-edit-intent-dialog',
  templateUrl: './create-edit-intent-dialog.component.html',
  styleUrls: ['./create-edit-intent-dialog.component.scss']
})
export class CreateEditIntentDialogComponent implements OnInit {

  private _intentId: string;

  public intent: Intent;

  constructor(public dialogRef: MatDialogRef<CreateEditIntentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _intentService: IntentService) {
    this._intentId = data.intent.id;
  }

  ngOnInit(): void {
    if (!this._intentId) {
      this.intent = this.data.intent;
      return;
    }
    this._intentService.loadOne(this._intentId).subscribe(intent => {
      this.intent = intent;
    });
  }

}
