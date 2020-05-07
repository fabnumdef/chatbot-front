import { Component, Input, OnInit } from '@angular/core';
import { Intent } from '@model/intent.model';
import { IntentService } from '@core/services/intent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-intents',
  templateUrl: './media-intents.component.html',
  styleUrls: ['./media-intents.component.scss']
})
export class MediaIntentsComponent implements OnInit {

  @Input() intents: Intent[];

  constructor(private _intentService: IntentService,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  goToIntent(intent: Intent): void {
    this._intentService.resetFilters();
    this._intentService.currentSearch = intent.id;
    this._router.navigateByUrl('connaissances');
  }

}
