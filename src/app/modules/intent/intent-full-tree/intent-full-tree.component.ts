import { Component, OnInit } from '@angular/core';
import { IntentService } from '@core/services/intent.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Intent } from '@model/intent.model';

@Component({
  selector: 'app-intent-full-tree',
  templateUrl: './intent-full-tree.component.html',
  styleUrls: ['./intent-full-tree.component.scss']
})
export class IntentFullTreeComponent implements OnInit {

  // intents$: BehaviorSubject<Intent[]>;
  notSingleIntents: Intent[] = [];
  loading$: Observable<boolean>;
  dragScrollDisabled = true;
  fullScreen = false;
  onLeafSelected: string;
  onHighlightLeafs: string;

  constructor(private _intentService: IntentService) {
  }

  ngOnInit(): void {
    this.loading$ = this._intentService.loading$;
    this._intentService.entities$.subscribe(intents => {
      this.notSingleIntents = intents.filter(i => i.nextIntents && i.nextIntents.length > 0);
    });
  }

  public showFullScreen() {
    this.fullScreen = !this.fullScreen;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }
}
