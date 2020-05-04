import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { IntentService } from '@core/services/intent.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RefDataService } from '@core/services/ref-data.service';
import { BehaviorSubject } from 'rxjs';
import { FilterHelper } from '@model/filter-helper.model';

@Component({
  selector: 'app-intent-filter',
  templateUrl: './intent-filter.component.html',
  styleUrls: ['./intent-filter.component.scss'],
})
export class IntentFilterComponent extends DestroyObservable implements OnInit {

  intentFilters: FormGroup;
  categories$: BehaviorSubject<string[]>;

  constructor(private _fb: FormBuilder,
              private _intentService: IntentService,
              private _refDataService: RefDataService) {
    super();
  }

  ngOnInit(): void {
    this._refDataService.loadCategories().then();
    this.categories$ = this._refDataService.categories$;
    this.intentFilters = this._fb.group({
      query: [this._intentService.currentSearch],
      categories: [[]],
      expires: [false],
      expiresAt: [null]
    });
    this.intentFilters.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        this._intentService.currentSearch = value.query;
        delete value.query;
        value.expiresAt = value.expiresAt ? value.expiresAt.toLocaleDateString() : null;
        this._intentService.currentFilters = value;
        this._intentService.load().subscribe();
      });
    this._intentService.load().subscribe();
  }

  get controls() {
    return this.intentFilters.controls;
  }
}
