import { Component, Input, OnInit } from '@angular/core';
import { Response } from '@model/response.model';
import { ResponseType } from '@enum/*';

@Component({
  selector: 'app-intent-preview-responses',
  templateUrl: './intent-preview-response.component.html',
  styleUrls: ['./intent-preview-response.component.scss']
})
export class IntentPreviewResponseComponent implements OnInit {

  @Input() response: Response;

  responseType = ResponseType;
  quickReplies = [];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.response.response);
    switch (this.response.responseType) {
      case ResponseType.quick_reply:
        this._getQuickReplies();
        break;
    }
  }

  private _getQuickReplies() {
    this.response.response.split(';').forEach(v => {
      this.quickReplies.push(v.substring(0, v.indexOf('<')).trim());
    });
  }

}
