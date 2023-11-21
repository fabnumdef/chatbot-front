import { Component, Input, OnInit } from '@angular/core';
import { Response } from '@model/response.model';
import { ResponseType } from '@enum/*';

@Component({
  selector: 'app-intent-preview-responses',
  templateUrl: './intent-preview-response.component.html',
  styleUrls: ['./intent-preview-response.component.scss']
})
export class IntentPreviewResponseComponent implements OnInit {

  private _response: Response;

  get response(): Response {
    return this._response;
  }

  @Input() set response(r: Response) {
    this._response = r;
    this._sortResponse();
  }

  responseType = ResponseType;

  quickReplies = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  private _sortResponse() {
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
