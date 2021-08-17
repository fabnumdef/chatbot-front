import { Component, OnInit } from '@angular/core';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { takeUntil } from 'rxjs/operators';
import { StatsService } from '@core/services/stats.service';

@Component({
  selector: 'app-faq-stats-kpi',
  templateUrl: './faq-stats-kpi.component.html',
  styleUrls: ['./faq-stats-kpi.component.scss']
})
export class FaqStatsKpiComponent extends DestroyObservable implements OnInit {

  visitors = null;
  avgQuestionsPerUser = null;

  constructor(private _statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    // If you want to add time filter
    this._statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(
        (value) => {
          this.getData();
        }
      );
  }

  getData() {
    this._statsService.getFaqKPIData().subscribe(
      (value) => {
        // console.log(value);
        this.visitors = value['uniqueVisitorsNumber'].visitors;
        this.avgQuestionsPerUser = Math.round(value['avgQuestionPerVisitor'].averagequestions * 100) / 100;
      }
    );
  }

}
