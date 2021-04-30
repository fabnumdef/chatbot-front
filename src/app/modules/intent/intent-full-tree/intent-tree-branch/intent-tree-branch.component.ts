import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intent } from '@model/intent.model';

@Component({
  selector: 'app-intent-tree-branch',
  templateUrl: './intent-tree-branch.component.html',
  styleUrls: ['./intent-tree-branch.component.scss']
})
export class IntentTreeBranchComponent implements OnInit {

  @Input() onLeafSelected: string;
  @Input() onHighlightLeafs: string;
  @Input() intent: Intent;
  @Output() leafSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() highlightLeafs: EventEmitter<string> = new EventEmitter<string>();

  public intentBranches: Intent[][] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  private _getBranchLevel(intent: Intent): Intent[] {
    return intent.nextIntents;
  }

}
