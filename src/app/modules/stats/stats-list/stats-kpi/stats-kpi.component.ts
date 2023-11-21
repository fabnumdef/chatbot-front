import { DestroyObservable } from '@core/utils/destroy-observable';
import { Component, OnInit } from '@angular/core';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stats-kpi',
  templateUrl: './stats-kpi.component.html',
  styleUrls: ['./stats-kpi.component.scss']
})
export class StatsKpiComponent extends DestroyObservable implements OnInit {

  visitors = null;

  ratioResponseOk = null;

  ratioResponseSure = null;

  avgQuestionsPerUser = null;

  avgResponseTime = null;

  constructor(private statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    // If you want to add time filter
    this.statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(
      (value) => {
        this.getData(value);
      }
    );
  }

  getData(dates) {
    this.statsService.getKPIData().subscribe(
      (value: any) => {
        // console.log(value);
        this.visitors = value.uniqueVisitorsNumber.visitors;
        this.ratioResponseOk = value.ratioChatbotResponseOk.ratioresponseok;
        this.ratioResponseSure = value.ratioChatbotResponseSure.ratioresponseok;
        this.avgQuestionsPerUser = Math.round(value.avgQuestionPerVisitor.averagequestions * 100) / 100;
        this.avgResponseTime = `${Math.round(value.avgChatbotResponseTime.averageresponse) / 1000  } seconde`;
        if ((value.avgChatbotResponseTime.averageresponse / 1000) > 1 ) {
          this.avgResponseTime += 's';
        }
      }
    );
  }

}
