import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { StatsService } from '@core/services/stats.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-stats-filter',
  templateUrl: './stats-filter.component.html',
  styleUrls: ['./stats-filter.component.scss']
})
export class StatsFilterComponent extends DestroyObservable implements OnInit, OnDestroy {

  statsFilters: FormGroup;

  constructor(private _fb: FormBuilder,
              private _statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    this.statsFilters = this._fb.group({
      startDate: [
        // this._statsService.currentFilters?.startDate ? moment(this._statsService.currentFilters.startDate, 'YYYY-MM-DD').toDate() : null
        null
      ],
      endDate: [
        // this._statsService.currentFilters?.endDate ? moment(this._statsService.currentFilters.endDate, 'YYYY-MM-DD').toDate() : null
        null
      ]
    });

    this.statsFilters.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        value.startDate = value.startDate ? moment(value.startDate).format('yyyy-MM-DD') : null;
        value.endDate = value.endDate ? moment(value.endDate).format('yyyy-MM-DD') : null;
        this._statsService._currentFilters$.next(value);
      });
}

  ngOnDestroy() {
    this._statsService.resetFilters();
  }

}
