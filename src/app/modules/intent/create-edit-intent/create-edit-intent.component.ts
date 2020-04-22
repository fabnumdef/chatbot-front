import { Component, OnInit } from '@angular/core';
import { Intent } from '@model/intent.model';

@Component({
  selector: 'app-create-edit-intent',
  templateUrl: './create-edit-intent.component.html',
  styleUrls: ['./create-edit-intent.component.scss']
})
export class CreateEditIntentComponent implements OnInit {

  intent: Intent;

  constructor() {
  }

  ngOnInit(): void {
    this.intent = new Intent();
  }

}
