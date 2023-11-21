import { DestroyObservable } from '@core/utils/destroy-observable';
import { StatsService } from '@core/services/stats.service';
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stats-worst-questions',
  templateUrl: './stats-worst-questions.component.html',
  styleUrls: ['./stats-worst-questions.component.scss']
})
export class StatsWorstQuestionsComponent extends DestroyObservable implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  worstQuestions: Array<string> = [];

  constructor(public statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    this.statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(
      (value) => {
        this.statsService.setCurrentFilters(value?.startDate, value?.endDate);
        this.getData(value);
      }
    );
  }

  getData(dates) {
    this.statsService.getWorstQuestionsData().subscribe(
      (value: any) => {
        this.worstQuestions = [];
        value.lessAskedQuestions.forEach(elem => {
          this.worstQuestions.push(elem.question);
        });
      }
    );
  }

}
