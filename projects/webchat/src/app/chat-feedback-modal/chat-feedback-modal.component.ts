import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../core/services/feedback.service';
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
              private _feedbackService: FeedbackService,
              private _webchatService: WebchatService) { }

  ngOnInit(): void {
  }

  sendFeedback(): void {
    const feedback = {
      userQuestion: this.data?.userQuestion,
      botResponse: this.data?.botResponse,
      timestamp: this.data?.timestamp,
      status: this.feedbackFormControl.value,
      senderId: this.data?.senderId
    };
    this._feedbackService.sendFeedback(feedback).subscribe(() => {
      this._webchatService.sendMessage(this.data.feedbackPayload);
    });
    this.dialogRef.close();
  }

}
