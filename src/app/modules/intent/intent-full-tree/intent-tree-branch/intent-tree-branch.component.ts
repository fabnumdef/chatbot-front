import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intent } from '@model/intent.model';
import { ResponseType } from '@enum/*';
import { ToastrService } from 'ngx-toastr';
import { ResponseService } from '@core/services/response.service';

@Component({
  selector: 'app-intent-tree-branch',
  templateUrl: './intent-tree-branch.component.html',
  styleUrls: ['./intent-tree-branch.component.scss']
})
export class IntentTreeBranchComponent implements OnInit {

  @Input() onLeafSelected: string;
  @Input() onHighlightLeafs: string;
  @Input() intent: Intent;
  @Input() isRoot: boolean;
  @Output() leafSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() highlightLeafs: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteLeaf: EventEmitter<string> = new EventEmitter<string>();

  public intentBranches: Intent[][] = [];

  constructor(private _responseService: ResponseService,
              private _toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  deleteIntentResponse(intentId: string) {
    const responseIdx = this.intent.responses.findIndex(r => {
      return r.responseType === ResponseType.quick_reply && r.response.includes(`<${intentId}>`);
    });
    let responses = this.intent.responses[responseIdx].response.split(';');
    responses = responses.filter(r => !r.includes(`<${intentId}>`));
    this.intent.responses[responseIdx].response = responses.join(';');
    this._responseService.update(this.intent.responses[responseIdx]).subscribe(r => {
      this._toastr.success('Connaissance sauvegardée');
    });
    this.intent.nextIntents = this.intent.nextIntents.filter(i => i.id !== intentId);
  }
}
