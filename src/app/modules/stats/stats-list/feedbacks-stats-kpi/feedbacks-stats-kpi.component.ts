import { Component, OnInit } from '@angular/core';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-feedbacks-stats-kpi',
  templateUrl: './feedbacks-stats-kpi.component.html',
  styleUrls: ['./feedbacks-stats-kpi.component.scss']
})
export class FeedbacksStatsKpiComponent extends DestroyObservable implements OnInit {

  relevantQuestions = null;
  avgRelevantQuestions = null;
  wrongQuestions = null;
  avgWrongQuestions = null;
  offtopicQuestions = null;
  avgOfftopicQuestions = null;

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
    this._statsService.getFeedbackKPIData().subscribe(
      (value) => {
        // console.log(value);
        this.relevantQuestions = value['relevantQuestions'].countFeedback;
        this.avgRelevantQuestions =  Math.round(value['relevantQuestionsPct'].ratioFeedback * 100) / 100;
        this.wrongQuestions = value['wrongQuestions'].countFeedback;
        this.avgWrongQuestions =  Math.round(value['wrongQuestionsPct'].ratioFeedback * 100) / 100;
        this.offtopicQuestions = value['offtopicQuestions'].countFeedback;
        this.avgOfftopicQuestions =  Math.round(value['offtopicQuestionsPct'].ratioFeedback * 100) / 100;
      }
    );
  }

}
