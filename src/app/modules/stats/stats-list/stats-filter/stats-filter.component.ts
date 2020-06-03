import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { StatsService } from '@core/services/stats.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stats-filter',
  templateUrl: './stats-filter.component.html',
  styleUrls: ['./stats-filter.component.scss']
})
export class StatsFilterComponent extends DestroyObservable implements OnInit {

  statsFilters: FormGroup;

  constructor(/*private _fb: FormBuilder,
              private _statsService: StatsService*/) {
    super();
  }

  ngOnInit(): void {
    /*this.statsFilters = this._fb.group({
      startDate: [this._statsService.currentFilters?.startDate ? moment(this._statsService.currentFilters.startDate, 'DD/MM/yyyy') : null],
      endDate: [this._statsService.currentFilters?.endDate ? moment(this._statsService.currentFilters.endDate, 'DD/MM/yyyy') : null]
    });
    this.statsFilters.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged())
      .subscribe(value => {
        value.startDate = value.startDate ? value.startDate.format('DD/MM/yyyy') : null;
        value.endDate = value.endDate ? value.endDate.format('DD/MM/yyyy') : null;
        this._statsService.currentFilters = value;
        this._statsService.load().subscribe();
      });
    this._statsService.load().subscribe();*/
  }

}
