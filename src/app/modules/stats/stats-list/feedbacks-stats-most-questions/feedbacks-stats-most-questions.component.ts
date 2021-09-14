import { Component, HostListener, Input, OnInit } from '@angular/core';
import { InboxStatus } from '@enum/*';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-feedbacks-stats-most-questions',
  templateUrl: './feedbacks-stats-most-questions.component.html',
  styleUrls: ['./feedbacks-stats-most-questions.component.scss']
})
export class FeedbacksStatsMostQuestionsComponent extends DestroyObservable implements OnInit {

  @Input() status: InboxStatus;
  @Input() index: number;

  results: any[];
  dataUrl: string;

  constructor(private _statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    this._statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(() => {
          this.getGraph();
        }
      );
  }

  getGraph() {
    this._statsService.getFeedbackMostQuestionsData(this.status).subscribe(
      (value) => {
        this.results = value['mostAskedQuestions'].map(elem => {
          return {
            value: [parseInt(elem['count'], 10)],
            name: elem['question']
          };
        });
        setTimeout(() => {
          this._setGraphMargin();
        });
      }
    );
  }

  downloadCanvasBest(event) {
    const anchor = event.target;
    const name = 'mostFeedbacksQuestionsChart-' + moment(new Date()).format('DDMMYYYYHHmmss') + '.jpg';

    // get the canvas
    anchor.href = this.dataUrl;
    anchor.download = name;
  }

  async download() {
    // Get the chart
    const node = document.getElementsByClassName('ngx-charts-outer')[this.index * 2];
    this.dataUrl = await domtoimage.toPng(node);

    const btn: HTMLElement = document.getElementById('downloadMostFeedbacksQuestBtn');
    btn.click();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._setGraphMargin();
  }

  private _setGraphMargin() {
    const legendNode = document.querySelectorAll('.feedbacks-stats-most-questions .chart-legend')[0];
    const graphNode = <HTMLElement> document.querySelectorAll('.feedbacks-stats-most-questions .chart-container')[0];
    if (!graphNode) {
      return;
    }
    graphNode.style.marginBottom = legendNode.clientHeight + 'px';
  }

}
