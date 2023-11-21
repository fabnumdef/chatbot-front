import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intent } from '@model/intent.model';

@Component({
  selector: 'app-intent-tree',
  templateUrl: './intent-tree.component.html',
  styleUrls: ['./intent-tree.component.scss']
})
export class IntentTreeComponent implements OnInit {

  @Input() intent: Intent;

  @Output() intentChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public selectIntent(intent: Intent) {
    this.intentChanged.emit(intent.id);
  }

}
