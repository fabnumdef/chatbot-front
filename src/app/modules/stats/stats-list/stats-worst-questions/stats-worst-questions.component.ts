import { StatsService } from '@core/services/stats.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stats-worst-questions',
  templateUrl: './stats-worst-questions.component.html',
  styleUrls: ['./stats-worst-questions.component.scss']
})
export class StatsWorstQuestionsComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  worstQuestions: Array<string> = [];

  constructor(public _statsService: StatsService) {
  }

  ngOnInit(): void {
    this.getData(null);
    this._statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(
      (value) => {
        this._statsService.setCurrentFilters(value?.startDate, value?.endDate);
        this.getData(value);
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getData(dates) {
    this._statsService.getWorstQuestionsData().subscribe(
      (value) => {
        this.worstQuestions = [];
        value['lessAskedQuestions'].forEach(elem => {
          this.worstQuestions.push(elem['question']);
        });
      }
    );
  }

}
