import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-help-modal',
  templateUrl: './chat-help-modal.component.html',
  styleUrls: ['./chat-help-modal.component.scss']
})
export class ChatHelpModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
