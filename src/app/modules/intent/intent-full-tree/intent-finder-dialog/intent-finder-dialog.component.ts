import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IntentService } from '@core/services/intent.service';
import { Intent } from '@model/intent.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-intent-finder-dialog',
  templateUrl: './intent-finder-dialog.component.html',
  styleUrls: ['./intent-finder-dialog.component.scss']
})
export class IntentFinderDialogComponent implements OnInit {

  private _allIntents: Intent[];

  public filteredIntents: Intent[];
  public intentSelected: Intent;

  constructor(public dialogRef: MatDialogRef<IntentFinderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _intentService: IntentService) {
  }

  ngOnInit(): void {
    this._intentService.fullEntities$.pipe(filter(e => e.length > 0)).subscribe(intents => {
      this._allIntents = intents;
    });
  }

  onIntentFilterChange($event) {
    if (!this._allIntents) {
      return;
    }
    // get the search keyword
    const query: string = $event.query;
    const categories: string[] = $event.categories;
    let keywords;
    if (!query && (!categories || categories.length < 1)) {
      this.filteredIntents = this._allIntents.slice();
      return;
    } else {
      // remove accent & special chars
      keywords = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().split(' ');
    }
    // filter the intents
    this.filteredIntents = this._allIntents.filter(intent => {
      if (categories && categories.length > 0) {
        if (!categories.includes(intent.category)) {
          return false;
        }
      }
      let find = true;
      for (const k of keywords) {
        find = (`${intent.category ? `${intent.category} - ` : ''}${intent.mainQuestion ? intent.mainQuestion : intent.id}`)
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .toLowerCase().indexOf(k) > -1;
        if (!find) {
          break;
        }
      }
      return find;
    });
  }

  selectIntent() {
    this.dialogRef.close(this.intentSelected);
  }

}
