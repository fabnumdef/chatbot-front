import { Component, HostListener, OnInit } from '@angular/core';
import { StatsService } from '@core/services/stats.service';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-faq-stats-most-questions',
  templateUrl: './faq-stats-most-questions.component.html',
  styleUrls: ['./faq-stats-most-questions.component.scss']
})
export class FaqStatsMostQuestionsComponent extends DestroyObservable implements OnInit {

  results: any[];

  dataUrl: string;

  constructor(private statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    this.statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(() => {
          this.getGraph();
        }
      );
  }

  getGraph() {
    this.statsService.getFaqMostQuestionsData().subscribe(
      (value: any) => {
        this.results = value.mostAskedQuestions.map(elem => ({
            value: [parseInt(elem.count, 10)],
            name: elem.question
          }));
        setTimeout(() => {
          this.setGraphMargin();
        });
      }
    );
  }

  downloadCanvasBest(event) {
    const anchor = event.target;
    const name = `mostFaqQuestionsChart-${  moment(new Date()).format('DDMMYYYYHHmmss')  }.jpg`;

    // get the canvas
    anchor.href = this.dataUrl;
    anchor.download = name;
  }

  async download() {
    // Get the chart
    const node = document.getElementsByClassName('ngx-charts-outer')[0];
    this.dataUrl = await domtoimage.toPng(node);

    const btn: HTMLElement = document.getElementById('downloadMostFaqQuestBtn');
    btn.click();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setGraphMargin();
  }

  private setGraphMargin() {
    const legendNode = document.querySelectorAll('.faq-stats-most-questions .chart-legend')[0];
    const graphNode = <HTMLElement> document.querySelectorAll('.faq-stats-most-questions .chart-container')[0];
    if (!graphNode) {
      return;
    }
    graphNode.style.marginBottom = `${legendNode.clientHeight  }px`;
  }

}
