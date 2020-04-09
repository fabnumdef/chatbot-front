import { Component, OnInit } from '@angular/core';
import { IntentService } from '../../../../core/services/intent.service';
import { Observable } from 'rxjs';
import { Intent } from '../../../../core/models/intent.model';

@Component({
  selector: 'app-intent-list',
  templateUrl: './intent-list.component.html',
  styleUrls: ['./intent-list.component.scss']
})
export class IntentListComponent implements OnInit {

  intents$: Observable<Intent[]>;

  constructor(private _intentService: IntentService) {
  }

  ngOnInit(): void {
    this.intents$ = this._intentService.entities$;
    this.loadIntents();
  }

  /**
   * PRIVATE FUNCTIONS
   */

  private loadIntents() {
    this._intentService.load().subscribe();
  }

}
