import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intent } from '@model/intent.model';

@Component({
  selector: 'app-intent-tree',
  templateUrl: './intent-tree.component.html',
  styleUrls: ['./intent-tree.component.scss']
})
export class IntentTreeComponent implements OnInit {

  @Input() intent: Intent;
  // @Output() close: EventEmitter<Intent> = new EventEmitter<Intent>();

  constructor() { }

  ngOnInit(): void {
  }

}
