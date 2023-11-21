import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { InboxStatus } from '@enum/*';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-feedbacks-stats-most-categories',
  templateUrl: './feedbacks-stats-most-categories.component.html',
  styleUrls: ['./feedbacks-stats-most-categories.component.scss']
})
export class FeedbacksStatsMostCategoriesComponent extends DestroyObservable implements OnInit {

  @Input() status: InboxStatus;

  @Input() index: number;

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
    this.statsService.getFeedbackMostCategoriesData(this.status).subscribe(
      (value: any) => {
        this.results = value.mostAskedCategories.map(elem => ({
            value: [parseInt(elem.count, 10)],
            name: elem.category
          }));
        setTimeout(() => {
          this.setGraphMargin();
        });
      }
    );
  }

  downloadCanvasBest(event) {
    const anchor = event.target;
    const name = `mostFeedbacksCategoriesChart-${  moment(new Date()).format('DDMMYYYYHHmmss')  }.jpg`;

    // get the canvas
    anchor.href = this.dataUrl;
    anchor.download = name;
  }

  async download() {
    // Get the chart
    const node = document.getElementsByClassName('ngx-charts-outer')[this.index * 2 + 1];
    this.dataUrl = await domtoimage.toPng(node);

    const btn: HTMLElement = document.getElementById('downloadMostFeedbacksCatBtn');
    btn.click();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setGraphMargin();
  }

  private setGraphMargin() {
    const legendNode = document.querySelectorAll('.feedbacks-stats-most-categories .chart-legend')[0];
    const graphNode = <HTMLElement> document.querySelectorAll('.feedbacks-stats-most-categories .chart-container')[0];
    if (!graphNode) {
      return;
    }
    graphNode.style.marginBottom = `${legendNode.clientHeight  }px`;
  }

}
