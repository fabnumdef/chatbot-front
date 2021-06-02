import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intent } from '@model/intent.model';
import { ResponseType } from '@enum/*';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.scss']
})
export class FaqDetailComponent implements OnInit {
  @Input() public botColor: string;
  private _intents: Intent[];
  get intents(): Intent[] {
    return this._intents;
  }

  @Input() set intents(intents: Intent[]) {
    this.categories = [...new Set(intents.map(item => item.category))];
    this._intents = this._formatResponses(intents);
  }

  @Output() public back = new EventEmitter<boolean>();
  @Output() public switchToChat = new EventEmitter<boolean>();

  public categories: string[];

  constructor() {
  }

  ngOnInit(): void {
  }

  getIntentsByCategory(category: string): Intent[] {
    return this._intents.filter(i => i.category === category);
  }

  private _formatResponses(intents: Intent[]): Intent[] {
    intents.forEach(i => {
      i.responses.map((r: any) => {
        r.text = r.response;
        r.type = r.responseType;
        if (r.responseType === ResponseType.quick_reply || r.responseType === ResponseType.button) {
          r.text = null;
          const qrs = r.response.split(';');
          r.quick_replies = [];
          qrs.forEach(qr => {
            r.quick_replies.push({
              title: qr.substring(0, qr.indexOf('<')).trim(),
              payload: qr.substring(qr.indexOf('<') + 1, qr.indexOf('>')).trim()
            });
          });
        }
        return r;
      });
    });
    return intents;
  }
}
