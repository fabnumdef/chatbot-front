import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InboxService } from '@core/services/inbox.service';
import { IntentService } from '@core/services/intent.service';
import { MediaService } from '@core/services/media.service';

@Component({
  selector: 'app-select-pagination-elements',
  templateUrl: './select-pagination-elements.component.html',
  styleUrls: ['./select-pagination-elements.component.scss']
})
export class SelectPaginationElementsComponent implements OnInit {

  @Output() itemsPerPageChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _inboxService: InboxService,
              private _intentService: IntentService,
              private _mediaService: MediaService) {
  }

  ngOnInit(): void {
  }

  selectItemsPerPage(elements: number) {
    this._inboxService.setItemPerPage(elements);
    this._intentService.setItemPerPage(elements);
    this._mediaService.setItemPerPage(elements);
    this.itemsPerPageChanged.emit(true);
  }

}
