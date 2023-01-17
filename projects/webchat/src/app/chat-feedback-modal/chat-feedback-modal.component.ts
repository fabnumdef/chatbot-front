import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { WebchatService } from '../core/services/webchat.service';

@Component({
  selector: 'app-chat-feedback-modal',
  templateUrl: './chat-feedback-modal.component.html',
  styleUrls: ['./chat-feedback-modal.component.scss']
})
export class ChatFeedbackModalComponent implements OnInit {

  public feedbackFormControl = this._fb.control(null, Validators.required);

  constructor(public dialogRef: MatDialogRef<ChatFeedbackModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _fb: FormBuilder,
              private _webchatService: WebchatService) { }

  ngOnInit(): void {
  }

  sendFeedback(): void {
    this.dialogRef.close(this.feedbackFormControl.value);
  }

}
