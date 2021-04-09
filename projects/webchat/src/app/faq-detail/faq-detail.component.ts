import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intent } from '@model/intent.model';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.scss']
})
export class FaqDetailComponent implements OnInit {
  private _intents: Intent[];
  get intents(): Intent[] {
    return this._intents;
  }

  @Input() set intents(intents: Intent[]) {
    this.categories = [...new Set(intents.map(item => item.category))];
    this._intents = intents;
  }
  @Output() public back = new EventEmitter<boolean>();

  public categories: string[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getIntentsByCategory(category: string): Intent[] {
    return this._intents.filter(i => i.category === category);
  }

}
