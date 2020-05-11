import { Component, OnInit } from '@angular/core';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InboxService } from '@core/services/inbox.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IntentService } from '@core/services/intent.service';
import { RefDataService } from '@core/services/ref-data.service';

@Component({
  selector: 'app-inbox-filter',
  templateUrl: './inbox-filter.component.html',
  styleUrls: ['./inbox-filter.component.scss']
})
export class InboxFilterComponent extends DestroyObservable implements OnInit {

  inboxFilters: FormGroup;
  categories$: BehaviorSubject<string[]>;


  constructor(private _fb: FormBuilder,
              private _inboxService: InboxService,
              private _refDataService: RefDataService) {
    super();
  }

  ngOnInit(): void {
    this._refDataService.loadCategories().then();
    this.categories$ = this._refDataService.categories$;
    this.inboxFilters = this._fb.group({
      query: [this._inboxService.currentSearch],
      categories: [this._inboxService.currentFilters?.categories ? this._inboxService.currentFilters.categories : []],
    });
    this.inboxFilters.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        this._inboxService.currentSearch = value.query;
        this._inboxService.load().subscribe();
      });
    this._inboxService.load().subscribe();
  }

  get controls() {
    return this.inboxFilters.controls;
  }

}
