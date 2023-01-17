import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Inbox } from '@model/inbox.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inbox-assignation-dialog',
  templateUrl: './inbox-assignation-dialog.component.html',
  styleUrls: ['./inbox-assignation-dialog.component.scss']
})
export class InboxAssignationDialogComponent implements OnInit {

  public inbox: Inbox;
  public assignationForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<InboxAssignationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _fb: FormBuilder) {
    this.inbox = data.inbox;
  }

  ngOnInit(): void {
    this.assignationForm = this._fb.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]]
    });
  }

  get controls() {
    return this.assignationForm.controls;
  }

  sendEmail(): void {
    window.open(`mailto:${this.controls.email.value}?subject=${encodeURI('CHATBOT - Demande d\'information')}&body=${encodeURI(`
    Bonjour,

    Nous aurions besoin d'informations afin de pouvoir répondre à une question.
    La question ci-dessous nous a été posée, auriez-vous sa réponse ?

    ${this.inbox.question}

    Cordialement.
    `)}`);
    this.dialogRef.close();
  }

}
