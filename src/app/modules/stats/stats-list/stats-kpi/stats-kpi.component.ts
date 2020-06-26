import { DestroyObservable } from '@core/utils/destroy-observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stats-kpi',
  templateUrl: './stats-kpi.component.html',
  styleUrls: ['./stats-kpi.component.scss']
})
export class StatsKpiComponent extends DestroyObservable implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  visitors = 57;
  avgQuestionsPerUser = 4;
  avgResponseTime = 'inconnu';

  constructor(public _statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    // If you want to add time filter
    this._statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(
      (value) => {
        this.getData(value);
      }
    );
  }

  getData(dates) {
    this._statsService.getKPIData().subscribe(
      (value) => {
        this.visitors = value['uniqueVisitorsNumber'].visitors;
        this.avgQuestionsPerUser = Math.round(value['avgQuestionPerVisitor'].averagequestions * 100) / 100;
        this.avgResponseTime = Math.round(value['avgChatbotResponseTime'].averageresponse) / 1000 + ' seconde';
        if ((value['avgChatbotResponseTime'].averageresponse / 1000) > 1 ) {
          this.avgResponseTime = this.avgResponseTime + 's';
        }
      }
    );
  }

}
